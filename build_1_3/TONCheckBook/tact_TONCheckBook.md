# TACT Compilation Report
Contract: TONCheckBook
BOC Size: 1133 bytes

# Types
Total Types: 21

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

## CreateNewBlock
TLB: `create_new_block#fcf92756 course:coins = CreateNewBlock`
Signature: `CreateNewBlock{course:coins}`

## Win
TLB: `win#0a6b1739  = Win`
Signature: `Win{}`

## Lose
TLB: `lose#33aa6bd5  = Lose`
Signature: `Lose{}`

## ApplyBetMessage
TLB: `apply_bet_message#7fb9a5d3 owner:address rounds_count:uint16 delta_r:coins bet_ammount:coins prev_bet_seqno:uint256 prev_bet_odd_flag:bool = ApplyBetMessage`
Signature: `ApplyBetMessage{owner:address,rounds_count:uint16,delta_r:coins,bet_ammount:coins,prev_bet_seqno:uint256,prev_bet_odd_flag:bool}`

## BetData
TLB: `_ accountManager:address owner:address seqno:uint256 odd_flag:bool rounds_count:uint16 delta_r:coins bet_amount:coins = BetData`
Signature: `BetData{accountManager:address,owner:address,seqno:uint256,odd_flag:bool,rounds_count:uint16,delta_r:coins,bet_amount:coins}`

## SetBetInfo
TLB: `set_bet_info#3828f5c3 owner_ton_wallet:address rounds_count:uint16 delta_r:coins = SetBetInfo`
Signature: `SetBetInfo{owner_ton_wallet:address,rounds_count:uint16,delta_r:coins}`

## GetBetInfo
TLB: `get_bet_info#91a1d1e2  = GetBetInfo`
Signature: `GetBetInfo{}`

## ProcessBetInfo
TLB: `process_bet_info#4802fa2b accountManager:address owner:address seqno:uint256 odd_flag:bool rounds_count:uint16 delta_r:coins bet_amount:coins = ProcessBetInfo`
Signature: `ProcessBetInfo{accountManager:address,owner:address,seqno:uint256,odd_flag:bool,rounds_count:uint16,delta_r:coins,bet_amount:coins}`

## InternalBetWinMessage
TLB: `internal_bet_win_message#dea72f71 amount:coins owner_ton_wallet:address = InternalBetWinMessage`
Signature: `InternalBetWinMessage{amount:coins,owner_ton_wallet:address}`

## PayBet
TLB: `pay_bet#72d947fa bet_address:address amount:coins = PayBet`
Signature: `PayBet{bet_address:address,amount:coins}`

## Balance
TLB: `balance#00ec6b43 balance:coins = Balance`
Signature: `Balance{balance:coins}`

## InitMinter
TLB: `init_minter#ecc922ca content:Maybe ^cell = InitMinter`
Signature: `InitMinter{content:Maybe ^cell}`

## Withdraw
TLB: `withdraw#0ba69751 amount:coins = Withdraw`
Signature: `Withdraw{amount:coins}`

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
15518: Amount is too small
26438: Only account manager
43388: Can not make a bet