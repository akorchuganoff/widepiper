import { useEffect, useState } from "react";
import { Address, fromNano, OpenedContract, toNano} from "ton-core";
import { internal } from "ton"

import { TONCheckBook } from "../../wrappers/TONCheckBook";
import {Bet, BetData} from "../../wrappers/Bet";
import {AccountManager, ApplyBetMessage, Withdraw, Deploy, CreateNewBlock} from  "../../wrappers/AccountManager";

import { useAsyncInitialize } from "./useAsyncInitialize";
import { getConfig } from "./getConfig";
import { useTonClient } from "./useTonClient";
import { useTonConnect } from "./useTonConnect";
import { useAdminWallet } from "./adminWalletTransactionProcessing";


const sleep = (time: number) => new Promise((resolve) => setTimeout(resolve, time))


const {client} = useTonClient()
const {accountManagerAddress} = getConfig()
const {admin_sender, admin_wallet, send_text_message } = useAdminWallet()

const accountManagerContract = useAsyncInitialize(async()=>{
    if(!client) return;
    const contract = AccountManager.fromAddress(Address.parse(accountManagerAddress))
    return client.open(contract) as OpenedContract<AccountManager>
}, [client])

function medianBigInt(arr: bigint[]): bigint | null {
    if (arr.length === 0) return null;
    
    const sortedArr = arr.slice().sort((a, b) => (a > b ? 1 : a < b ? -1 : 0));
    const midIndex = Math.floor(sortedArr.length / 2);
    if (sortedArr.length % 2 !== 0) {return sortedArr[midIndex];}
    return (sortedArr[midIndex - 1] + sortedArr[midIndex]) / BigInt(2);
}



export async function create_new_block() {
    let ton_course = 0
    let bnb_course = 0

    await fetch("https://tonapi.io/v2/rates?tokens=ton&currencies=usd", {
        method: "GET"
    }).then(response => response.json()).then(async course => {
        ton_course = course["rates"]["TON"]["prices"]["USD"]
    })

    await fetch("https://api.binance.com/api/v3/ticker/price?symbol=BNBUSDT", {
        method: "GET"
    }).then(response => response.json()).then(async course => {
        bnb_course = course["price"]
    })

    console.log("Current BNB / TON course: ", ton_course / bnb_course)
    console.log('Creating')
    
    let course = BigInt(Math.floor(ton_course / bnb_course * 1e12))
    console.log("Current course: ", course)

    const abs = (n:bigint) => (n < 0n) ? -n : n;

    if (!accountManagerContract) return;

    let bet_amount = await accountManagerContract?.getMaxBetIdInApplyedBlock()
    let old_course = await accountManagerContract.getOldBlockCourse()
    let new_course = await accountManagerContract.getNewBlockCourse()

    // Make decision about bets
    console.log("Old course: ", new_course, " New course: ", course,  " delta: ", course - new_course )

    if (new_course == 0n) {
        new_course = 1n
    } 
    let oracul_delta: Number = (Number(course / new_course) - 1)*1000

    let deltas = [];

    for (let i = 1n; i < bet_amount+1n; i++){
        let bet_address = await accountManagerContract.getBetAddressBySeqnoInApplyedBlock(i)
        let current_bet = client?.open(await Bet.fromAddress(bet_address!))
        let bet_data = await current_bet?.getBetData()
        let delta: Number = Number((bet_data!).delta_r)

        let mistake = abs(BigInt(Number(oracul_delta) - Number(delta)));

        deltas.push(mistake);
    }

    let messages = [];

    let median_value = medianBigInt(deltas)
    if (median_value){
        console.log("Median mistake: ", fromNano(median_value!))
        for (let i = 1n; i < bet_amount+1n; i++){
            let bet_address = await accountManagerContract.getBetAddressBySeqnoInApplyedBlock(i)
            let current_bet = client?.open(await Bet.fromAddress(bet_address!))
            let bet_data = current_bet?.getBetData()
            let delta = (await bet_data!).delta_r

            let mistake = abs(BigInt(Number(oracul_delta) - Number(delta)));

            if (mistake <= median_value!){
                let cur_message = [internal({
                    to: bet_address,
                    value: toNano("0.05"),
                    body: "Win",
                    bounce: false
                })]
                messages.push(cur_message)
                console.log("Bet Win: ", bet_address.toString(), " Mistake: ", fromNano(mistake))
            } else {
                let cur_message = [internal({
                    to: bet_address,
                    value: toNano("0.05"),
                    body: "Lose",
                    bounce: false
                })]
                messages.push(cur_message)
                console.log("Bet Loose: ", bet_address.toString(), " Mistake: ", fromNano(mistake))
            }
        }

    } else {
        console.log("Median mistake: none. No bets in prev block")
    }

    let messages_flag = await send_text_message(messages)
    if (!messages_flag){
        console.log("Transaction error")
        return
    }

    // Create New Block
    console.log("Transactions confirmed")
    console.log("Creating new block")

    let seqno_flag = false
    while (!seqno_flag) {
        let wallet_contract = client?.open(admin_wallet!);
        const seqno = await wallet_contract!.getSeqno();
        try{
            console.log("Current wallet seqno: ", seqno)
            const NewBlockResult = accountManagerContract?.send(
                admin_sender!, 
                {
                value: toNano("0.1")
                },
                {
                    $$type: "CreateNewBlock",
                    course: course
                });
            await sleep(20000);
            
            console.log("New block Applyed", NewBlockResult);
        } catch (error) {
            console.log("Error occured: ", (error as Error).message);
            continue
        }
        
        try{
            let currentSeqno = seqno;
            while (currentSeqno == seqno) {
                console.log("waiting for transaction to confirm...");
                await sleep(1500);
                currentSeqno = await wallet_contract!.getSeqno();
            }
            console.log("New block confirmed!");
            seqno_flag = true;
        } catch (error) {
            console.log("Error occured: ", (error as Error).message);
        }
    }

    // Update db
    await fetch("http://81.31.245.206:5000/create_block", {
        method: "POST"
    })
    await sleep(20000)

    // Apply Auto bets
    await fetch("http://81.31.245.206:5000/users", {
            method: "GET",
        }).then(response => response.json()).then(async users =>{
            for (const user of users) {
                let checkBook = client?.open(await TONCheckBook.fromAddress(await accountManagerContract.getTonCheckBookAddress(Address.parse(user["wallet_address"])))) as OpenedContract<TONCheckBook>
                let seqno_new_block_bet = await accountManagerContract?.getMaxBetIdInCurrentBlock()
                
                while (seqno_new_block_bet === undefined){
                    seqno_new_block_bet = await accountManagerContract?.getMaxBetIdInCurrentBlock()
                    await sleep(200)
                }
                
                let odd_flag_new_block_bet = await accountManagerContract?.getCurrentBlockOddFlag()
                
                while (odd_flag_new_block_bet === undefined){
                    odd_flag_new_block_bet = await accountManagerContract?.getCurrentBlockOddFlag()
                    await sleep(200)
                }

                let checkBook_balance = await checkBook.getBalance()

                while (checkBook_balance === undefined){
                    checkBook_balance = await checkBook.getBalance()
                    await sleep(200)
                }

                let is_negative_flag = false
                if (user["old_delta_r"] < 0) {
                    is_negative_flag = true
                    user["old_delta_r"] = user["old_delta_r"] * -1
                }

                console.log("Balance: ", checkBook_balance, " Delta: ", user["old_delta_r"])
                let bet_amount = BigInt(Math.floor(Number(checkBook_balance) * Number(user["old_delta_r"])))
                console.log("Bet Amount: ", bet_amount, " In nano: ", fromNano(bet_amount))
                console.log("Seqno: ", seqno_new_block_bet + 1n, "Odd flag: ", odd_flag_new_block_bet)


                let message_bet: ApplyBetMessage = {
                    $$type: "ApplyBetMessage",
                    account_manager: accountManagerContract!.address,
                    owner: Address.parse(user["wallet_address"]),
                    bet_amount: BigInt(bet_amount),
                    delta_r: toNano(user["old_delta_r"] * 1000), // TODO: Минимальный шаг - тысячная процента
                    seqno: seqno_new_block_bet + 1n,
                    odd_flag: odd_flag_new_block_bet,
                    is_negative: is_negative_flag
                }

                let seqno_flag = false
                console.log("Applying new bet")
                while (!seqno_flag) {
                    let wallet_contract = client?.open(admin_wallet!)
                    const cur_seqno = await wallet_contract!.getSeqno();

                    try{
                        console.log("Current wallet seqno: ", cur_seqno)
                        let trans = await checkBook.send(
                            admin_sender!, {
                            value: toNano("0.5")
                        }, message_bet)
                        console.log("Current transactions: ", trans)
                        console.log("Bet applyed")
                    } catch (error) {
                        console.log("Error occured: ", (error as Error).message);
                        continue
                    }
                    
                    try{
                        let currentSeqno = cur_seqno;
                        while (currentSeqno == cur_seqno) {
                            console.log("waiting for transaction to confirm...");
                            await sleep(1500);
                            currentSeqno = await wallet_contract!.getSeqno();
                        }
                        console.log("Bet confirmed!");
                        seqno_flag = true
                    } catch (error) {
                        console.log("Error occured: ", (error as Error).message);
                    }
                }

                console.log("Delta R       : ", user["old_delta_r"])
                console.log("ID            : ", user["id"])
                console.log("Wallet Address: ", user["wallet_address"])
                console.log("Round amount  : ", user["round_amount"])
                console.log("Is negative   : ", is_negative_flag)
            }
        })

    // Decision from DB
    let url = new URL("http://81.31.245.206:5000/make_decision")
    url.searchParams.append("course_delta", Number(new_course - old_course).toString())
    await fetch(url.toString(), {
        method: "GET",
    }).then(response => response.json()).then(async users => {
        console.log(users["win_users"])
        console.log(users["lose_users"])
    })
}