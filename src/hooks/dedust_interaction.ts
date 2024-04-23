import { Address, TonClient4, WalletContractV3R2, toNano, Sender} from "@ton/ton";
import { mnemonicToPrivateKey } from "@ton/crypto";
import {
    Asset,
    Factory,
    JettonRoot,
    MAINNET_FACTORY_ADDR,
    Pool,
    PoolType,
    VaultNative,
  } from "@dedust/sdk";
import { toNamespacedPath } from "path";

export async function send_liquidity_to_pool(liquidity_amount: string) {

  const mnemonic: string[] = [];

  const WPT_ADDR = Address.parse("");

  const tonClient = new TonClient4({
    endpoint: "https://mainnet-v4.tonhubapi.com",
  });

  const factory = tonClient.open(
    Factory.createFromAddress(MAINNET_FACTORY_ADDR),
  );

  const keys = await mnemonicToPrivateKey(mnemonic);
  const wallet = tonClient.open(
    WalletContractV3R2.create({
      workchain: 0,
      publicKey: keys.publicKey,
    }),
  );

  const sender = wallet.sender(keys.secretKey);

  // Create vault
  await factory.sendCreateVault(sender, {
    asset: Asset.jetton(WPT_ADDR),
  });

  const wpt_token = tonClient.open(JettonRoot.createFromAddress(WPT_ADDR));

  const pool = tonClient.open(
    Pool.createFromAddress(
      await factory.getPoolAddress({
        poolType: PoolType.VOLATILE,
        assets: [Asset.native(), Asset.jetton(wpt_token.address)],
      }),
    ),
  );

  const nativeVault = tonClient.open(
    VaultNative.createFromAddress(
      await factory.getVaultAddress(Asset.native()),
    ),
  );

  const lastBlock = await tonClient.getLastBlock();
  const poolState = await tonClient.getAccountLite(
    lastBlock.last.seqno,
    pool.address,
  );

  if (poolState.account.state.type !== "active") {
    throw new Error("Pool is not exist.");
  }

  const vaultState = await tonClient.getAccountLite(
    lastBlock.last.seqno,
    nativeVault.address,
  );

  if (vaultState.account.state.type !== "active") {
    throw new Error("Native Vault is not exist.");
  }

  const amountIn = toNano(liquidity_amount); // 1 TON

  const { amountOut: expectedAmountOut } = await pool.getEstimatedSwapOut({
    assetIn: Asset.native(),
    amountIn,
  });

  // Slippage handling (1%)
  const minAmountOut = (expectedAmountOut * 99n) / 100n; // expectedAmountOut - 1%

  await nativeVault.sendSwap(
    sender,
    {
      poolAddress: pool.address,
      amount: amountIn,
      limit: minAmountOut,
      gasAmount: toNano("0.25"),
    },
  );
}
