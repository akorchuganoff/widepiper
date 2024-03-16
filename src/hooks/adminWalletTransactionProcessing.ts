import { useEffect, useState } from "react";
import { KeyPair, mnemonicToWalletKey } from "ton-crypto"
import { TonClient, WalletContractV4, internal } from "ton";
import { useTonClient } from "./useTonClient";
import { Address, fromNano, MessageRelaxed, OpenedContract, toNano } from "ton-core";
import { useAsyncInitialize } from "./useAsyncInitialize";

const sleep = (time: number) => new Promise((resolve) => setTimeout(resolve, time))

export function useAdminWallet() {
    const {client} = useTonClient()

    const mnemonic = "fantasy song lab false catalog crater lift romance mistake glass galaxy alcohol inform olive ensure exercise mushroom crop behave rescue nasty brass vintage scrub";

    const key = useAsyncInitialize(async()=>{

        const applyedKey = await mnemonicToWalletKey(mnemonic.split(" "))

        return applyedKey

    }, [])


    const wallet = useAsyncInitialize(async()=>{
        if (!key) return undefined
        return WalletContractV4.create({ publicKey: key!.publicKey, workchain: 0 });
    }, [key])


    return {
        admin_wallet_address: wallet?.address.toString(),
        send_text_message: async(all_messages: (MessageRelaxed[])[]) : Promise<Boolean> => {
            if (!client || !wallet) return false;
            const walletContract = client!.open(wallet);

            for (const cur_mesage of all_messages) {
                let flag = false
                while (!flag) {
                    try{
                        const seqno = await walletContract.getSeqno();
                        console.log("Current wallet seqno: ", seqno)
                        console.log(cur_mesage)
                        await walletContract.sendTransfer({
                            secretKey: key!.secretKey,
                            seqno: seqno,
                            messages: cur_mesage
                        });
                        let currentSeqno = seqno;
                        while (currentSeqno == seqno) {
                            console.log("waiting for transaction to confirm...");
                            await sleep(1500);
                            currentSeqno = await walletContract.getSeqno();
                        }
                        console.log("transaction confirmed!");
                        flag = true
                    } catch (error) {
                        console.log("Error occured: ", (error as Error).message);
                    }
                }
              }
            return true;
        } 
    }
}