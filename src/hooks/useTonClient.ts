import { getHttpEndpoint } from "@orbs-network/ton-access";
import { useState } from "react";
import { TonClient, TonClient4} from "ton";
import { useAsyncInitialize } from "./useAsyncInitialize";
import { useTonConnect } from "./useTonConnect";
import { CHAIN } from "@tonconnect/protocol";

export function useTonClient() {
  const { network } = useTonConnect();

  return {
    client: useAsyncInitialize(async () => {
      if (!network) return;
      
      if (network === CHAIN.MAINNET) {
        return new TonClient({
          endpoint: "https://toncenter.com/api/v2/jsonRPC", 
          apiKey: "8b34eceab243e8f842bf551310e04fc5ee58f229602bf4746b3e32896403ab11"
        });
      }
      
      return new TonClient({
        endpoint: "https://testnet.toncenter.com/api/v2/jsonRPC", 
        apiKey: "662a97b7e71403b02ef7ec492bbd79c3b3bb8df47e8721678f1df3ab03360a1c"
      });

      // return new TonClient({
      //   endpoint: await getHttpEndpoint({
      //     network: network === CHAIN.MAINNET ? "mainnet" : "testnet",
      //   }),
      // });
    }, [network]),
  };
}
