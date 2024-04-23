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
import { trace } from "console";
// import internal from "stream";

const sleep = (time: number) => new Promise((resolve) => setTimeout(resolve, time))

export function useAccountManagerContract() {
    const {client} = useTonClient()
    const {wallet_address, sender} = useTonConnect()
    const { accountManagerAddress, minterAddress} = getConfig()
    const {admin_sender, admin_wallet_address, admin_wallet, send_text_message } = useAdminWallet()
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

        console.log('Cur_wallet_addr: ', wallet_address)
        console.log('Cur_wallet_addr 2: ', Address.parse(wallet_address!).toString())
        
        const jettonWalletAddress = await jettonContract.getGetWalletAddress(
            Address.parse(Address.parse(wallet_address!).toString())
        )

        return client.open(JettonDefaultWallet.fromAddress(jettonWalletAddress))
    }, [jettonContract, client])

    const TonCheckBookContract = useAsyncInitialize(async()=> {
        if(!client || !accountManagerContract || !wallet_address) {
            console.log(client, accountManagerContract, wallet_address);
            console.log('NOT ABOBA')
            return;
        }
        console.log('ABOBA');
        console.log("Manager: ", Address.parse(accountManagerAddress).toString());
        console.log("Wallet:  ", Address.parse(wallet_address).toString());
        
        let contract_result = client.open(await TONCheckBook.fromInit(Address.parse(Address.parse(accountManagerAddress).toString()), Address.parse(Address.parse(wallet_address!).toString()))) as OpenedContract<TONCheckBook>
        console.log(contract_result.address.toString())
        console.log('ABOBA - 2')

        return contract_result

    }, [client, accountManagerContract, wallet_address])
    console.log(TonCheckBookContract)


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
                receiver: Address.parse(sender.address!.toString())
            }

            accountManagerContract?.send(sender, {
                value: toNano("0.2")
            }, message)
        }, 
        create_bet: async (delta_r: number) => {
            if (!TonCheckBookContract) return;

            let is_negative_flag = false;
            if (delta_r < 0){
                is_negative_flag = true
                delta_r = delta_r * -1;
            }

            let balance = Number(await TonCheckBookContract!.getBalance())
            let bet_amount = BigInt(Math.floor(balance * delta_r))
            console.log("Creating New Bet")
            if (!wallet_address) {
                console.log("No valid sender")
                return};
            if (!accountManagerContract) {
                console.log("No valid acc manager")
                return
            }

            let trans_flag = false
            let seqno = 0n
            let flag = false
            while (!trans_flag){
                try {
                    console.log('try to get seqno and flag')
                    seqno = await accountManagerContract?.getMaxBetIdInCurrentBlock();
                    flag = await accountManagerContract?.getCurrentBlockOddFlag();
                    if (seqno ==undefined || flag == undefined) {
                        console.log("Can not get flag or seqno");
                        console.log("Flag: ", flag);
                        console.log("Seqno: ", seqno);
                    }
                    await sleep(1000);
                    trans_flag=true;
                }
                catch (error: any|undefined){
                    console.error(Error(error).message);
                }
            }


            console.log("Flag: ", flag)
            console.log("Seqno: ", seqno)

            console.log("Sender: ", sender.address, "Bet ammount", bet_amount, " Delta: ", delta_r, " Is negative: ", is_negative_flag);
            const message: ApplyBetMessage = {
                $$type: "ApplyBetMessage",
                account_manager: accountManagerContract!.address,
                owner: Address.parse(wallet_address!.toString()),
                bet_amount: bet_amount,
                delta_r: toNano(BigInt(delta_r*1000)), // TODO: Минимальный шаг - тысячная процента
                seqno: seqno + 1n,
                odd_flag: flag,
                is_negative: is_negative_flag
            }
            console.log("Make bet with seqno: ", seqno + 1n, "And flag: ", flag)
            trans_flag = false;
            while (!trans_flag){
                try {
                    console.log("Applying bet");
                    console.log(message);
                    console.log(admin_sender?.address);


                    let trans = TonCheckBookContract?.send(admin_sender!, {
                        value: toNano("0.2")
                    }, message)

                    await sleep(2000);

                    console.log('Transaction Applyed', trans);
                    trans_flag = true;
                } catch (error: any|undefined){
                    console.error(Error(error).message);
                }
            }
            
            let user_delta = delta_r
            if (is_negative_flag) {
                user_delta *= -1
            }

            // const response = await fetch("http://81.31.245.206:5000/user", {
            //     method: "POST",
            //     headers: {
            //         'Content-Type': 'application/json' // Убедитесь, что используете этот заголовок
            //     },
            //     body: JSON.stringify({
            //         "wallet_address": wallet_address!.toString(),
            //         "round_amount": 1,
            //         "delta_r": user_delta
            //     })
            // });

        },

        deploy: () => {
            console.log("deploying")
            if (!TonCheckBookContract) {
                console.log("No TonCheckBookContract");
                return;
            }
            let result_flag = false
            while (!result_flag) {
                try {
                    TonCheckBookContract?.send(
                    admin_sender!,
                    {
                        value: toNano("0.1"),
                    }, {
                        $$type: "Deploy",
                        queryId: 0n,
                    }
                    )
                    result_flag = true
                } catch (error: any|undefined) {
                    console.error(Error(error).message)
                }
            }
            result_flag = false
            while (!result_flag) {
                try {
                    admin_sender!.send({
                        to: TonCheckBookContract!.address,
                        value: toNano("0.1"),
                        init: {
                            code: TonCheckBookContract.init?.code,
                            data: TonCheckBookContract.init?.data
                            }
                        }
                    )
                    result_flag = true
                } catch (error: any|undefined) {
                    console.error(Error(error).message)
                }
            }
            
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

        create_new_block: async() => {
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
            // let course = BigInt(stringcourse)
            
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
                    let delta = Number((await bet_data!).delta_r);

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
                let wallet_contract = client?.open(admin_wallet!)
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
                        })
                    sleep(20000)
                    
                    console.log("New block Applyed", NewBlockResult)
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
                    seqno_flag = true
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
                                    value: toNano("0.2")
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
