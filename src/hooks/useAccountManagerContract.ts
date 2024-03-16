import { useEffect, useState } from "react";
import { Address, fromNano, OpenedContract, toNano} from "ton-core";
import { internal } from "ton"

import {Mint, SampleJetton} from "../../wrappers/SampleJetton";
import { TONCheckBook } from "../../wrappers/TONCheckBook";
import {Bet, BetData} from "../../wrappers/Bet";
import {AccountManager, ApplyBetMessage, Withdraw, Deploy, CreateNewBlock} from  "../../wrappers/AccountManager";
import {JettonDefaultWallet} from "../../wrappers/JettonDefaultWallet";

import { useAsyncInitialize } from "./useAsyncInitialize";
import { getConfig } from "./getConfig";
import { useTonClient } from "./useTonClient";
import { useTonConnect } from "./useTonConnect";
import { useAdminWallet } from "./adminWalletTransactionProcessing";

import { getTonWalletInfo } from "./getTonWalletInfo";

import {
    Card,
    FlexBoxCol,
    FlexBoxRow,
    Button,
    Ellipsis,
} from "../components/styled/styled";
import { send } from "vite";
// import internal from "stream";

const sleep = (time: number) => new Promise((resolve) => setTimeout(resolve, time))

export function useAccountManagerContract() {
    const {client} = useTonClient()
    const {wallet_address, sender} = useTonConnect()
    const { accountManagerAddress, minterAddress} = getConfig()
    const { admin_wallet_address, send_text_message } = useAdminWallet()
    const [jettonBalance, setBalance] = useState<string | null>()
    const [tonCheckBookBalance, setCheckBookBalance] = useState<string | null>()
    const [new_bets, updateNewBets] = useState<BetData[] | null>()
    const [old_bets, updateOldBets] = useState<BetData[] | null>()

    const accountManagerContract = useAsyncInitialize(async()=>{
        if(!client || !wallet_address) return;

        const contract = AccountManager.fromAddress(Address.parse(accountManagerAddress))

        return client.open(contract) as OpenedContract<AccountManager>

    }, [client, wallet_address])

    const jettonContract = useAsyncInitialize(async()=>{
        if(!client || !wallet_address) return;

        const contract = SampleJetton.fromAddress(Address.parse(minterAddress))

        return client.open(contract) as OpenedContract<SampleJetton>
    }, [client, wallet_address])

    const jettonWalletContract = useAsyncInitialize(async()=>{
        if(!jettonContract || !client) return;

        const jettonWalletAddress = await jettonContract.getGetWalletAddress(
            Address.parse(Address.parse(wallet_address!).toString())
        )

        return client.open(JettonDefaultWallet.fromAddress(jettonWalletAddress))
    }, [jettonContract, client])

    const TonCheckBookContract = useAsyncInitialize(async()=> {
        if(!client || !accountManagerContract || !wallet_address) return;

        const checkBookAddress = await accountManagerContract.getTonCheckBookAddress(Address.parse(wallet_address!))
        // console.log(checkBookAddress.toString())
        
        let contract_result = client.open(await TONCheckBook.fromInit(Address.parse(accountManagerAddress), Address.parse(wallet_address))) as OpenedContract<TONCheckBook>
        // console.log(contract_result.address.toString())

        return contract_result

    }, [client, accountManagerContract, wallet_address])

    useEffect(()=>{
        async function getBalance() {
            if(!jettonWalletContract) return 
            setBalance(null)
            const jettonWalletData = await jettonWalletContract.getGetWalletData()
            const jettonBalance = jettonWalletData.balance
            setBalance(fromNano(jettonBalance))
            await sleep(100000)
            getBalance()
        }

        getBalance()

    }, [jettonWalletContract])

    useEffect(()=>{
        async function getCheckBookBalance() {
            if(!client || !TonCheckBookContract) return;

            setCheckBookBalance(null)
            const checkBookBalance = await TonCheckBookContract.getBalance()
            setCheckBookBalance(fromNano(checkBookBalance))
            await sleep(100000)
            getCheckBookBalance()
        }

        getCheckBookBalance()

    }, [TonCheckBookContract])

    useEffect(()=>{
        async function get_all_new_bets() {

            let bet_addresses: BetData[] = [];
    
            let bet_count = await accountManagerContract?.getMaxBetIdInCurrentBlock();
    
            for (let i=1n; i<=bet_count!; i++){
                let bet_address = await accountManagerContract?.getBetAddressBySeqnoInCurrentBlock(i);
                if (bet_address){
                    let bet = client?.open(await Bet.fromAddress(bet_address));
                    let bet_data = await bet?.getBetData();
                    if (bet_data !== undefined){
                        bet_addresses.push(bet_data)
                    }
                }
                await sleep(300)
            }
            if ((bet_count !== undefined) || bet_addresses.length == bet_count){
                console.log(bet_addresses);
                updateNewBets(bet_addresses);
            }
            console.log("New Bets update")
            await sleep(100000)
            get_all_new_bets()
        }

        get_all_new_bets()

    }, [accountManagerContract])

    useEffect(()=>{
        async function get_all_old_bets() {
            console.log("Old bets Updating")

            let bet_addresses: BetData[] = [];
    
            let bet_count = await accountManagerContract?.getMaxBetIdInApplyedBlock();
    
            for (let i=1n; i<=bet_count!; i++){
                let bet_address = await accountManagerContract?.getBetAddressBySeqnoInApplyedBlock(i);
                if (bet_address){
                    let bet = client?.open(await Bet.fromAddress(bet_address));
                    let bet_data = await bet?.getBetData();
                    if (bet_data !== undefined){
                        bet_addresses.push(bet_data)
                    }
                }
                await sleep(500);
            }
            if ((bet_count !== undefined) || bet_addresses.length == bet_count){
                console.log(bet_addresses);
                updateOldBets(bet_addresses);
            }
            console.log("Old Bets update")
            await sleep(100000)
            get_all_old_bets()
        }

        get_all_old_bets()

    }, [accountManagerContract])

    function medianBigInt(arr: bigint[]): bigint | null {
        if (arr.length === 0) return null;
      
        const sortedArr = arr.slice().sort((a, b) => (a > b ? 1 : a < b ? -1 : 0));
      
        const midIndex = Math.floor(sortedArr.length / 2);
      
        if (sortedArr.length % 2 !== 0) {
          return sortedArr[midIndex];
        }
      
        return (sortedArr[midIndex - 1] + sortedArr[midIndex]) / BigInt(2);
      }


    return {
        AccountManagerAddress: accountManagerContract?.address.toString(),
        minterAddress: jettonContract?.address.toString(),
        jettonWalletAddress: jettonWalletContract?.address.toString(),
        jettonBalance: jettonBalance,
        TONCheckBookAddress: TonCheckBookContract?.address.toString(),
        TONCheckBookBalance: tonCheckBookBalance,
        new_bets: new_bets,
        old_bets: old_bets,
        admin_wallet_address: admin_wallet_address, 
        mint: () => {
            const message: Mint = {
                $$type: "Mint",
                amount: 150n,
                to: Address.parse(sender.address!.toString())
            }

            accountManagerContract?.send(sender, {
                value: toNano("0.2")
            }, message)
        }, 
        create_bet: async (amount: string, delta_r: string) => {
            console.log("Creating New Bet")
            if (!wallet_address) {
                console.log("No valid sender")
                return};
            if (!accountManagerContract) {
                console.log("No valid acc manager")
                return
            }

            let seqno = await accountManagerContract?.getMaxBetIdInCurrentBlock()
            let flag = await accountManagerContract?.getCurrentBlockOddFlag()
            if (seqno ==undefined || flag == undefined) {
                console.log("Can not get flag or seqno")
                console.log("Flag: ", flag)
                console.log("Seqno: ", seqno)
                return}
            console.log(sender.address);
            const message: ApplyBetMessage = {
                $$type: "ApplyBetMessage",
                account_manager: accountManagerContract!.address,
                owner: Address.parse(wallet_address!.toString()),
                bet_amount: toNano(amount),
                delta_r: toNano(delta_r),
                seqno: seqno + 1n,
                odd_flag: flag
            }
            console.log("Make bet with seqno: ", seqno, "And flag: ", flag)

            TonCheckBookContract?.send(sender, {
                value: toNano("3")
            }, message)
        },

        deploy: () => {
            if (!TonCheckBookContract) {
                console.log("No TonCheckBookContract");
                return;
            }
            TonCheckBookContract?.send(
                sender,
                {
                    value: toNano("0.1"),
                }, {
                    $$type: "Deploy",
                    queryId: 0n,
                }

            )

            sender.send({
                to: TonCheckBookContract!.address,
                value: toNano("0.1"),
                init: {
                    code: TonCheckBookContract.init?.code,
                    data: TonCheckBookContract.init?.data
                    }
                }
            )
        },

        deploy_check_book: (
        ) => {
            // if(!TonCheckBookContract) return 
            const message: Deploy = {
                $$type: "Deploy",
                queryId: 0n,
            }

            TonCheckBookContract?.send(
                sender,
                {
                    value: toNano("0.1"),
                    bounce: true
                },
                message,
                 
            )

            //  client?.isContractDeployed(TonCheckBookContract.address)
        },

        deposit_check_book: (deposit: string) => {
            TonCheckBookContract?.send(
                sender, 
                {
                value: toNano(deposit)
                },
                 null)
        },

        withdraw_check_book: (
            ) => {
                const message: Withdraw = {
                    $$type: "Withdraw", 
                    amount: toNano("0.2")
                }

                TonCheckBookContract?.send(
                    sender, 
                    {
                    value: toNano("0.1")
                    },
                     message)
            },

        create_new_block: async(stringcourse: string) => {
            console.log('Creating')
            let course = BigInt(stringcourse)
            console.log("Current course: ", course)

            const abs = (n:bigint) => (n < 0n) ? -n : n;

            if (!accountManagerContract) return;

            let bet_amount = await accountManagerContract?.getMaxBetIdInApplyedBlock()
            let old_course = await accountManagerContract.getOldBlockCourse()
            let new_course = await accountManagerContract.getNewBlockCourse()

            console.log("Old course: ", old_course, " New course: ", new_course, " delta: ", new_course - old_course )

            let oracul_delta = new_course - old_course;

            let deltas = [];

            for (let i = 1n; i < bet_amount+1n; i++){
                let bet_address = await accountManagerContract.getBetAddressBySeqnoInApplyedBlock(i)
                let current_bet = client?.open(await Bet.fromAddress(bet_address!))
                let bet_data = current_bet?.getBetData()
                let delta = (await bet_data!).delta_r

                let mistake = abs(oracul_delta - delta);

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

                    let mistake = abs(oracul_delta - delta);

                    if (mistake <= median_value!){
                        let cur_message = [internal({
                            to: bet_address,
                            value: toNano("0.05"),
                            body: "Win",
                            bounce: false
                        })]
                        messages.push(cur_message)
                        // send_text_message(bet_address, "Win")
                        console.log("Bet Win: ", bet_address.toString(), " Mistake: ", fromNano(mistake))
                    } else {
                        let cur_message = [internal({
                            to: bet_address,
                            value: toNano("0.05"),
                            body: "Lose",
                            bounce: false
                        })]
                        messages.push(cur_message)
                        // send_text_message(bet_address, "Lose")
                        console.log("Bet Loose: ", bet_address.toString(), " Mistake: ", fromNano(mistake))
                    }
                }

            } else {
                console.log("Median mistake: none. No bets in prev block")
            }

            // const body:CreateNewBlock = {
            //     $$type: "CreateNewBlock",
            //     course: course
            //     }

            // let cur_mesage = [internal({
            //     to: accountManagerContract.address,
            //     value: toNano("0.05"),
            //     body: body,
            //     bounce: false
            // })]

            // messages.push(cur_mesage);

            let flag = await send_text_message(messages)
            if (!flag){
                console.log("Transaction error")
                return
            }

            console.log("Transactions confirmed")
            console.log("Creating new block")

            accountManagerContract?.send(
                sender, 
                {
                value: toNano("0.1")
                },
                {
                    $$type: "CreateNewBlock",
                    course: course
                })
        },

        win_bet: async(bet_address: string) => {
            let bet = client?.open(await Bet.fromAddress(Address.parse(bet_address)));
            bet?.send(
                sender,
                {
                    value: toNano("0.1")
                },
                "Win"
            )
        },

        lose_bet: async(bet_address: string) => {
            let bet = client?.open(await Bet.fromAddress(Address.parse(bet_address)));
            bet?.send(
                sender,
                {
                    value: toNano("0.1")
                },
                "Lose"
            )
        }

    }
}
