# TACT Compilation Report
Contract: TONCheckBook
BOC Size: 1473 bytes

# Types
Total Types: 30

## StateInit
TLB: `_ code:^cell data:^cell = StateInit`
Signature: `StateInit{code:^cell,data:^cell}`

## Context
TLB: `_ bounced:bool sender:address value:int257 raw:^slice = Context`
Signature: `Context{bounced:bool,sender:address,value:int257,raw:^slice}`

## SendParameters
TLB: `_ bounce:bool to:address value:int257 mode:int257 body:Maybe ^cell code:Maybe ^cell data:Maybe ^cell = SendParameters`
Signature: `SendParameters{bounce:bool,to:address,value:int257,mode:int257,body:Maybe ^cell,code:Maybe ^cell,data:Maybe ^cell}`

## Deploy
TLB: `deploy#946a98b6 queryId:uint64 = Deploy`
Signature: `Deploy{queryId:uint64}`

## DeployOk
TLB: `deploy_ok#aff90f57 queryId:uint64 = DeployOk`
Signature: `DeployOk{queryId:uint64}`

## FactoryDeploy
TLB: `factory_deploy#6d0ff13b queryId:uint64 cashback:address = FactoryDeploy`
Signature: `FactoryDeploy{queryId:uint64,cashback:address}`

## ChangeOwner
TLB: `change_owner#819dbe99 queryId:uint64 newOwner:address = ChangeOwner`
Signature: `ChangeOwner{queryId:uint64,newOwner:address}`

## ChangeOwnerOk
TLB: `change_owner_ok#327b2b4a queryId:uint64 newOwner:address = ChangeOwnerOk`
Signature: `ChangeOwnerOk{queryId:uint64,newOwner:address}`

## Mint
TLB: `mint#5a909f07 amount:int257 to:address = Mint`
Signature: `Mint{amount:int257,to:address}`

## CreateNewBlock
TLB: `create_new_block#fcf92756 course:coins = CreateNewBlock`
Signature: `CreateNewBlock{course:coins}`

## ApplyBetMessage
TLB: `apply_bet_message#fdf96f4e account_manager:address owner:address bet_amount:coins delta_r:coins seqno:uint256 odd_flag:bool is_negative:bool = ApplyBetMessage`
Signature: `ApplyBetMessage{account_manager:address,owner:address,bet_amount:coins,delta_r:coins,seqno:uint256,odd_flag:bool,is_negative:bool}`

## BetData
TLB: `_ accountManager:address owner:address checkbook:address seqno:uint256 odd_flag:bool delta_r:coins bet_amount:coins is_negative:bool = BetData`
Signature: `BetData{accountManager:address,owner:address,checkbook:address,seqno:uint256,odd_flag:bool,delta_r:coins,bet_amount:coins,is_negative:bool}`

## SetBetInfo
TLB: `set_bet_info#ff12dab2 owner:address ton_check_book:address delta_r:coins balance:coins is_negative:bool = SetBetInfo`
Signature: `SetBetInfo{owner:address,ton_check_book:address,delta_r:coins,balance:coins,is_negative:bool}`

## GetBetInfo
TLB: `get_bet_info#91a1d1e2  = GetBetInfo`
Signature: `GetBetInfo{}`

## ProcessBetInfo
TLB: `process_bet_info#489cac3e accountManager:address owner:address seqno:uint256 odd_flag:bool delta_r:coins bet_amount:coins is_negative:bool = ProcessBetInfo`
Signature: `ProcessBetInfo{accountManager:address,owner:address,seqno:uint256,odd_flag:bool,delta_r:coins,bet_amount:coins,is_negative:bool}`

## InternalBetWinMessage
TLB: `internal_bet_win_message#dea72f71 amount:coins owner_ton_wallet:address = InternalBetWinMessage`
Signature: `InternalBetWinMessage{amount:coins,owner_ton_wallet:address}`

## Balance
TLB: `balance#00ec6b43 balance:coins = Balance`
Signature: `Balance{balance:coins}`

## InitMinter
TLB: `init_minter#ecc922ca content:Maybe ^cell = InitMinter`
Signature: `InitMinter{content:Maybe ^cell}`

## Withdraw
TLB: `withdraw#0ba69751 amount:coins = Withdraw`
Signature: `Withdraw{amount:coins}`

## IncrementCurrentBlockCount
TLB: `increment_current_block_count#12ec415a seqno:uint256 odd_flag:bool = IncrementCurrentBlockCount`
Signature: `IncrementCurrentBlockCount{seqno:uint256,odd_flag:bool}`

## ProcessOldBlock
TLB: `process_old_block#bd7ce6d4 median_delta_r:coins course:coins = ProcessOldBlock`
Signature: `ProcessOldBlock{median_delta_r:coins,course:coins}`

## TokenTransfer
TLB: `token_transfer#0f8a7ea5 queryId:uint64 amount:coins destination:address responseDestination:Maybe address customPayload:Maybe ^cell forwardTonAmount:coins forwardPayload:remainder<slice> = TokenTransfer`
Signature: `TokenTransfer{queryId:uint64,amount:coins,destination:address,responseDestination:Maybe address,customPayload:Maybe ^cell,forwardTonAmount:coins,forwardPayload:remainder<slice>}`

## TokenTransferInternal
TLB: `token_transfer_internal#178d4519 queryId:uint64 amount:coins from:address responseAddress:Maybe address forwardTonAmount:coins forwardPayload:remainder<slice> = TokenTransferInternal`
Signature: `TokenTransferInternal{queryId:uint64,amount:coins,from:address,responseAddress:Maybe address,forwardTonAmount:coins,forwardPayload:remainder<slice>}`

## TokenNotification
TLB: `token_notification#7362d09c queryId:uint64 amount:coins from:address forwardPayload:remainder<slice> = TokenNotification`
Signature: `TokenNotification{queryId:uint64,amount:coins,from:address,forwardPayload:remainder<slice>}`

## TokenBurn
TLB: `token_burn#595f07bc queryId:uint64 amount:coins owner:address responseAddress:Maybe address = TokenBurn`
Signature: `TokenBurn{queryId:uint64,amount:coins,owner:address,responseAddress:Maybe address}`

## TokenBurnNotification
TLB: `token_burn_notification#7bdd97de queryId:uint64 amount:coins owner:address responseAddress:Maybe address = TokenBurnNotification`
Signature: `TokenBurnNotification{queryId:uint64,amount:coins,owner:address,responseAddress:Maybe address}`

## TokenExcesses
TLB: `token_excesses#d53276db queryId:uint64 = TokenExcesses`
Signature: `TokenExcesses{queryId:uint64}`

## TokenUpdateContent
TLB: `token_update_content#0c087a9e content:Maybe ^cell = TokenUpdateContent`
Signature: `TokenUpdateContent{content:Maybe ^cell}`

## JettonData
TLB: `_ totalSupply:int257 mintable:bool owner:address content:Maybe ^cell = JettonData`
Signature: `JettonData{totalSupply:int257,mintable:bool,owner:address,content:Maybe ^cell}`

## JettonWalletData
TLB: `_ balance:int257 owner:address master:address = JettonWalletData`
Signature: `JettonWalletData{balance:int257,owner:address,master:address}`

# Get Methods
Total Get Methods: 2

## Balance

## owner

# Error Codes
2: Stack undeflow
3: Stack overflow
4: Integer overflow
5: Integer out of expected range
6: Invalid opcode
7: Type check error
8: Cell overflow
9: Cell underflow
10: Dictionary error
13: Out of gas error
32: Method ID not found
34: Action is invalid or not supported
37: Not enough TON
38: Not enough extra-currencies
128: Null reference exception
129: Invalid serialization prefix
130: Invalid incoming message
131: Constraints error
132: Access denied
133: Contract stopped
134: Invalid argument
135: Code of a contract was not found
136: Invalid address
137: Masterchain support is not enabled for this contract
4429: Invalid sender
13650: Invalid bounced message
15518: Amount is too small
16059: Invalid value
17990: Only bet can increment
19255: Only current block
37845: Invalid ID
48121: Only Account Manager
61019: Invalid Balance
62972: Invalid balance