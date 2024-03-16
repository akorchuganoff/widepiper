import { useEffect, useState } from "react";
import { Address, fromNano, OpenedContract, toNano } from "ton-core";
import { useTonClient } from "./useTonClient";
import { useTonConnect } from "./useTonConnect";

const sleep = (time: number) => new Promise((resolve) => setTimeout(resolve, time))

export function getTonWalletInfo():{
    wallet_address: string|null|undefined,
    ton_balance: string|null|undefined
} {
    const {client} = useTonClient()
    const {wallet_address, sender} = useTonConnect()
    const [ton_balance, setBalance] = useState<string | null>()

    useEffect(()=>{
        async function getBalance() {
            if(!client || !wallet_address) return 
            setBalance(null)
            const ton_balance = await client.getBalance(Address.parse(wallet_address));

            setBalance(fromNano(ton_balance))
            await sleep(100000)
            getBalance()
        }

        getBalance()

    }, [client, wallet_address])

    return {
        wallet_address: wallet_address?.toString(),
        ton_balance: ton_balance
    }
}