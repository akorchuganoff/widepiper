import { 
    Cell,
    Slice, 
    Address, 
    Builder, 
    beginCell, 
    ComputeError, 
    TupleItem, 
    TupleReader, 
    Dictionary, 
    contractAddress, 
    ContractProvider, 
    Sender, 
    Contract, 
    ContractABI, 
    ABIType,
    ABIGetter,
    ABIReceiver,
    TupleBuilder,
    DictionaryValue
} from 'ton-core';

export type StateInit = {
    $$type: 'StateInit';
    code: Cell;
    data: Cell;
}

export function storeStateInit(src: StateInit) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeRef(src.code);
        b_0.storeRef(src.data);
    };
}

export function loadStateInit(slice: Slice) {
    let sc_0 = slice;
    let _code = sc_0.loadRef();
    let _data = sc_0.loadRef();
    return { $$type: 'StateInit' as const, code: _code, data: _data };
}

function loadTupleStateInit(source: TupleReader) {
    let _code = source.readCell();
    let _data = source.readCell();
    return { $$type: 'StateInit' as const, code: _code, data: _data };
}

function storeTupleStateInit(source: StateInit) {
    let builder = new TupleBuilder();
    builder.writeCell(source.code);
    builder.writeCell(source.data);
    return builder.build();
}

function dictValueParserStateInit(): DictionaryValue<StateInit> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeStateInit(src)).endCell());
        },
        parse: (src) => {
            return loadStateInit(src.loadRef().beginParse());
        }
    }
}

export type Context = {
    $$type: 'Context';
    bounced: boolean;
    sender: Address;
    value: bigint;
    raw: Cell;
}

export function storeContext(src: Context) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeBit(src.bounced);
        b_0.storeAddress(src.sender);
        b_0.storeInt(src.value, 257);
        b_0.storeRef(src.raw);
    };
}

export function loadContext(slice: Slice) {
    let sc_0 = slice;
    let _bounced = sc_0.loadBit();
    let _sender = sc_0.loadAddress();
    let _value = sc_0.loadIntBig(257);
    let _raw = sc_0.loadRef();
    return { $$type: 'Context' as const, bounced: _bounced, sender: _sender, value: _value, raw: _raw };
}

function loadTupleContext(source: TupleReader) {
    let _bounced = source.readBoolean();
    let _sender = source.readAddress();
    let _value = source.readBigNumber();
    let _raw = source.readCell();
    return { $$type: 'Context' as const, bounced: _bounced, sender: _sender, value: _value, raw: _raw };
}

function storeTupleContext(source: Context) {
    let builder = new TupleBuilder();
    builder.writeBoolean(source.bounced);
    builder.writeAddress(source.sender);
    builder.writeNumber(source.value);
    builder.writeSlice(source.raw);
    return builder.build();
}

function dictValueParserContext(): DictionaryValue<Context> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeContext(src)).endCell());
        },
        parse: (src) => {
            return loadContext(src.loadRef().beginParse());
        }
    }
}

export type SendParameters = {
    $$type: 'SendParameters';
    bounce: boolean;
    to: Address;
    value: bigint;
    mode: bigint;
    body: Cell | null;
    code: Cell | null;
    data: Cell | null;
}

export function storeSendParameters(src: SendParameters) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeBit(src.bounce);
        b_0.storeAddress(src.to);
        b_0.storeInt(src.value, 257);
        b_0.storeInt(src.mode, 257);
        if (src.body !== null && src.body !== undefined) { b_0.storeBit(true).storeRef(src.body); } else { b_0.storeBit(false); }
        if (src.code !== null && src.code !== undefined) { b_0.storeBit(true).storeRef(src.code); } else { b_0.storeBit(false); }
        if (src.data !== null && src.data !== undefined) { b_0.storeBit(true).storeRef(src.data); } else { b_0.storeBit(false); }
    };
}

export function loadSendParameters(slice: Slice) {
    let sc_0 = slice;
    let _bounce = sc_0.loadBit();
    let _to = sc_0.loadAddress();
    let _value = sc_0.loadIntBig(257);
    let _mode = sc_0.loadIntBig(257);
    let _body = sc_0.loadBit() ? sc_0.loadRef() : null;
    let _code = sc_0.loadBit() ? sc_0.loadRef() : null;
    let _data = sc_0.loadBit() ? sc_0.loadRef() : null;
    return { $$type: 'SendParameters' as const, bounce: _bounce, to: _to, value: _value, mode: _mode, body: _body, code: _code, data: _data };
}

function loadTupleSendParameters(source: TupleReader) {
    let _bounce = source.readBoolean();
    let _to = source.readAddress();
    let _value = source.readBigNumber();
    let _mode = source.readBigNumber();
    let _body = source.readCellOpt();
    let _code = source.readCellOpt();
    let _data = source.readCellOpt();
    return { $$type: 'SendParameters' as const, bounce: _bounce, to: _to, value: _value, mode: _mode, body: _body, code: _code, data: _data };
}

function storeTupleSendParameters(source: SendParameters) {
    let builder = new TupleBuilder();
    builder.writeBoolean(source.bounce);
    builder.writeAddress(source.to);
    builder.writeNumber(source.value);
    builder.writeNumber(source.mode);
    builder.writeCell(source.body);
    builder.writeCell(source.code);
    builder.writeCell(source.data);
    return builder.build();
}

function dictValueParserSendParameters(): DictionaryValue<SendParameters> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeSendParameters(src)).endCell());
        },
        parse: (src) => {
            return loadSendParameters(src.loadRef().beginParse());
        }
    }
}

export type Deploy = {
    $$type: 'Deploy';
    queryId: bigint;
}

export function storeDeploy(src: Deploy) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2490013878, 32);
        b_0.storeUint(src.queryId, 64);
    };
}

export function loadDeploy(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2490013878) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    return { $$type: 'Deploy' as const, queryId: _queryId };
}

function loadTupleDeploy(source: TupleReader) {
    let _queryId = source.readBigNumber();
    return { $$type: 'Deploy' as const, queryId: _queryId };
}

function storeTupleDeploy(source: Deploy) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    return builder.build();
}

function dictValueParserDeploy(): DictionaryValue<Deploy> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeDeploy(src)).endCell());
        },
        parse: (src) => {
            return loadDeploy(src.loadRef().beginParse());
        }
    }
}

export type DeployOk = {
    $$type: 'DeployOk';
    queryId: bigint;
}

export function storeDeployOk(src: DeployOk) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2952335191, 32);
        b_0.storeUint(src.queryId, 64);
    };
}

export function loadDeployOk(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2952335191) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    return { $$type: 'DeployOk' as const, queryId: _queryId };
}

function loadTupleDeployOk(source: TupleReader) {
    let _queryId = source.readBigNumber();
    return { $$type: 'DeployOk' as const, queryId: _queryId };
}

function storeTupleDeployOk(source: DeployOk) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    return builder.build();
}

function dictValueParserDeployOk(): DictionaryValue<DeployOk> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeDeployOk(src)).endCell());
        },
        parse: (src) => {
            return loadDeployOk(src.loadRef().beginParse());
        }
    }
}

export type FactoryDeploy = {
    $$type: 'FactoryDeploy';
    queryId: bigint;
    cashback: Address;
}

export function storeFactoryDeploy(src: FactoryDeploy) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1829761339, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeAddress(src.cashback);
    };
}

export function loadFactoryDeploy(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1829761339) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    let _cashback = sc_0.loadAddress();
    return { $$type: 'FactoryDeploy' as const, queryId: _queryId, cashback: _cashback };
}

function loadTupleFactoryDeploy(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _cashback = source.readAddress();
    return { $$type: 'FactoryDeploy' as const, queryId: _queryId, cashback: _cashback };
}

function storeTupleFactoryDeploy(source: FactoryDeploy) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeAddress(source.cashback);
    return builder.build();
}

function dictValueParserFactoryDeploy(): DictionaryValue<FactoryDeploy> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeFactoryDeploy(src)).endCell());
        },
        parse: (src) => {
            return loadFactoryDeploy(src.loadRef().beginParse());
        }
    }
}

export type ChangeOwner = {
    $$type: 'ChangeOwner';
    queryId: bigint;
    newOwner: Address;
}

export function storeChangeOwner(src: ChangeOwner) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2174598809, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeAddress(src.newOwner);
    };
}

export function loadChangeOwner(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2174598809) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    let _newOwner = sc_0.loadAddress();
    return { $$type: 'ChangeOwner' as const, queryId: _queryId, newOwner: _newOwner };
}

function loadTupleChangeOwner(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _newOwner = source.readAddress();
    return { $$type: 'ChangeOwner' as const, queryId: _queryId, newOwner: _newOwner };
}

function storeTupleChangeOwner(source: ChangeOwner) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeAddress(source.newOwner);
    return builder.build();
}

function dictValueParserChangeOwner(): DictionaryValue<ChangeOwner> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeChangeOwner(src)).endCell());
        },
        parse: (src) => {
            return loadChangeOwner(src.loadRef().beginParse());
        }
    }
}

export type ChangeOwnerOk = {
    $$type: 'ChangeOwnerOk';
    queryId: bigint;
    newOwner: Address;
}

export function storeChangeOwnerOk(src: ChangeOwnerOk) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(846932810, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeAddress(src.newOwner);
    };
}

export function loadChangeOwnerOk(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 846932810) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    let _newOwner = sc_0.loadAddress();
    return { $$type: 'ChangeOwnerOk' as const, queryId: _queryId, newOwner: _newOwner };
}

function loadTupleChangeOwnerOk(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _newOwner = source.readAddress();
    return { $$type: 'ChangeOwnerOk' as const, queryId: _queryId, newOwner: _newOwner };
}

function storeTupleChangeOwnerOk(source: ChangeOwnerOk) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeAddress(source.newOwner);
    return builder.build();
}

function dictValueParserChangeOwnerOk(): DictionaryValue<ChangeOwnerOk> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeChangeOwnerOk(src)).endCell());
        },
        parse: (src) => {
            return loadChangeOwnerOk(src.loadRef().beginParse());
        }
    }
}

export type Mint = {
    $$type: 'Mint';
    amount: bigint;
    to: Address;
}

export function storeMint(src: Mint) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1519427335, 32);
        b_0.storeInt(src.amount, 257);
        b_0.storeAddress(src.to);
    };
}

export function loadMint(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1519427335) { throw Error('Invalid prefix'); }
    let _amount = sc_0.loadIntBig(257);
    let _to = sc_0.loadAddress();
    return { $$type: 'Mint' as const, amount: _amount, to: _to };
}

function loadTupleMint(source: TupleReader) {
    let _amount = source.readBigNumber();
    let _to = source.readAddress();
    return { $$type: 'Mint' as const, amount: _amount, to: _to };
}

function storeTupleMint(source: Mint) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.amount);
    builder.writeAddress(source.to);
    return builder.build();
}

function dictValueParserMint(): DictionaryValue<Mint> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeMint(src)).endCell());
        },
        parse: (src) => {
            return loadMint(src.loadRef().beginParse());
        }
    }
}

export type CreateNewBlock = {
    $$type: 'CreateNewBlock';
    course: bigint;
}

export function storeCreateNewBlock(src: CreateNewBlock) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(4244186966, 32);
        b_0.storeCoins(src.course);
    };
}

export function loadCreateNewBlock(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 4244186966) { throw Error('Invalid prefix'); }
    let _course = sc_0.loadCoins();
    return { $$type: 'CreateNewBlock' as const, course: _course };
}

function loadTupleCreateNewBlock(source: TupleReader) {
    let _course = source.readBigNumber();
    return { $$type: 'CreateNewBlock' as const, course: _course };
}

function storeTupleCreateNewBlock(source: CreateNewBlock) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.course);
    return builder.build();
}

function dictValueParserCreateNewBlock(): DictionaryValue<CreateNewBlock> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeCreateNewBlock(src)).endCell());
        },
        parse: (src) => {
            return loadCreateNewBlock(src.loadRef().beginParse());
        }
    }
}

export type ApplyBetMessage = {
    $$type: 'ApplyBetMessage';
    account_manager: Address;
    owner: Address;
    bet_amount: bigint;
    delta_r: bigint;
    seqno: bigint;
    odd_flag: boolean;
    is_negative: boolean;
}

export function storeApplyBetMessage(src: ApplyBetMessage) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(4260982606, 32);
        b_0.storeAddress(src.account_manager);
        b_0.storeAddress(src.owner);
        b_0.storeCoins(src.bet_amount);
        b_0.storeCoins(src.delta_r);
        let b_1 = new Builder();
        b_1.storeUint(src.seqno, 256);
        b_1.storeBit(src.odd_flag);
        b_1.storeBit(src.is_negative);
        b_0.storeRef(b_1.endCell());
    };
}

export function loadApplyBetMessage(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 4260982606) { throw Error('Invalid prefix'); }
    let _account_manager = sc_0.loadAddress();
    let _owner = sc_0.loadAddress();
    let _bet_amount = sc_0.loadCoins();
    let _delta_r = sc_0.loadCoins();
    let sc_1 = sc_0.loadRef().beginParse();
    let _seqno = sc_1.loadUintBig(256);
    let _odd_flag = sc_1.loadBit();
    let _is_negative = sc_1.loadBit();
    return { $$type: 'ApplyBetMessage' as const, account_manager: _account_manager, owner: _owner, bet_amount: _bet_amount, delta_r: _delta_r, seqno: _seqno, odd_flag: _odd_flag, is_negative: _is_negative };
}

function loadTupleApplyBetMessage(source: TupleReader) {
    let _account_manager = source.readAddress();
    let _owner = source.readAddress();
    let _bet_amount = source.readBigNumber();
    let _delta_r = source.readBigNumber();
    let _seqno = source.readBigNumber();
    let _odd_flag = source.readBoolean();
    let _is_negative = source.readBoolean();
    return { $$type: 'ApplyBetMessage' as const, account_manager: _account_manager, owner: _owner, bet_amount: _bet_amount, delta_r: _delta_r, seqno: _seqno, odd_flag: _odd_flag, is_negative: _is_negative };
}

function storeTupleApplyBetMessage(source: ApplyBetMessage) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.account_manager);
    builder.writeAddress(source.owner);
    builder.writeNumber(source.bet_amount);
    builder.writeNumber(source.delta_r);
    builder.writeNumber(source.seqno);
    builder.writeBoolean(source.odd_flag);
    builder.writeBoolean(source.is_negative);
    return builder.build();
}

function dictValueParserApplyBetMessage(): DictionaryValue<ApplyBetMessage> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeApplyBetMessage(src)).endCell());
        },
        parse: (src) => {
            return loadApplyBetMessage(src.loadRef().beginParse());
        }
    }
}

export type BetData = {
    $$type: 'BetData';
    accountManager: Address;
    owner: Address;
    checkbook: Address;
    seqno: bigint;
    odd_flag: boolean;
    delta_r: bigint;
    bet_amount: bigint;
    is_negative: boolean;
}

export function storeBetData(src: BetData) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeAddress(src.accountManager);
        b_0.storeAddress(src.owner);
        b_0.storeAddress(src.checkbook);
        let b_1 = new Builder();
        b_1.storeUint(src.seqno, 256);
        b_1.storeBit(src.odd_flag);
        b_1.storeCoins(src.delta_r);
        b_1.storeCoins(src.bet_amount);
        b_1.storeBit(src.is_negative);
        b_0.storeRef(b_1.endCell());
    };
}

export function loadBetData(slice: Slice) {
    let sc_0 = slice;
    let _accountManager = sc_0.loadAddress();
    let _owner = sc_0.loadAddress();
    let _checkbook = sc_0.loadAddress();
    let sc_1 = sc_0.loadRef().beginParse();
    let _seqno = sc_1.loadUintBig(256);
    let _odd_flag = sc_1.loadBit();
    let _delta_r = sc_1.loadCoins();
    let _bet_amount = sc_1.loadCoins();
    let _is_negative = sc_1.loadBit();
    return { $$type: 'BetData' as const, accountManager: _accountManager, owner: _owner, checkbook: _checkbook, seqno: _seqno, odd_flag: _odd_flag, delta_r: _delta_r, bet_amount: _bet_amount, is_negative: _is_negative };
}

function loadTupleBetData(source: TupleReader) {
    let _accountManager = source.readAddress();
    let _owner = source.readAddress();
    let _checkbook = source.readAddress();
    let _seqno = source.readBigNumber();
    let _odd_flag = source.readBoolean();
    let _delta_r = source.readBigNumber();
    let _bet_amount = source.readBigNumber();
    let _is_negative = source.readBoolean();
    return { $$type: 'BetData' as const, accountManager: _accountManager, owner: _owner, checkbook: _checkbook, seqno: _seqno, odd_flag: _odd_flag, delta_r: _delta_r, bet_amount: _bet_amount, is_negative: _is_negative };
}

function storeTupleBetData(source: BetData) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.accountManager);
    builder.writeAddress(source.owner);
    builder.writeAddress(source.checkbook);
    builder.writeNumber(source.seqno);
    builder.writeBoolean(source.odd_flag);
    builder.writeNumber(source.delta_r);
    builder.writeNumber(source.bet_amount);
    builder.writeBoolean(source.is_negative);
    return builder.build();
}

function dictValueParserBetData(): DictionaryValue<BetData> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeBetData(src)).endCell());
        },
        parse: (src) => {
            return loadBetData(src.loadRef().beginParse());
        }
    }
}

export type SetBetInfo = {
    $$type: 'SetBetInfo';
    owner: Address;
    ton_check_book: Address;
    delta_r: bigint;
    balance: bigint;
    is_negative: boolean;
}

export function storeSetBetInfo(src: SetBetInfo) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(4279425714, 32);
        b_0.storeAddress(src.owner);
        b_0.storeAddress(src.ton_check_book);
        b_0.storeCoins(src.delta_r);
        b_0.storeCoins(src.balance);
        b_0.storeBit(src.is_negative);
    };
}

export function loadSetBetInfo(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 4279425714) { throw Error('Invalid prefix'); }
    let _owner = sc_0.loadAddress();
    let _ton_check_book = sc_0.loadAddress();
    let _delta_r = sc_0.loadCoins();
    let _balance = sc_0.loadCoins();
    let _is_negative = sc_0.loadBit();
    return { $$type: 'SetBetInfo' as const, owner: _owner, ton_check_book: _ton_check_book, delta_r: _delta_r, balance: _balance, is_negative: _is_negative };
}

function loadTupleSetBetInfo(source: TupleReader) {
    let _owner = source.readAddress();
    let _ton_check_book = source.readAddress();
    let _delta_r = source.readBigNumber();
    let _balance = source.readBigNumber();
    let _is_negative = source.readBoolean();
    return { $$type: 'SetBetInfo' as const, owner: _owner, ton_check_book: _ton_check_book, delta_r: _delta_r, balance: _balance, is_negative: _is_negative };
}

function storeTupleSetBetInfo(source: SetBetInfo) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.owner);
    builder.writeAddress(source.ton_check_book);
    builder.writeNumber(source.delta_r);
    builder.writeNumber(source.balance);
    builder.writeBoolean(source.is_negative);
    return builder.build();
}

function dictValueParserSetBetInfo(): DictionaryValue<SetBetInfo> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeSetBetInfo(src)).endCell());
        },
        parse: (src) => {
            return loadSetBetInfo(src.loadRef().beginParse());
        }
    }
}

export type GetBetInfo = {
    $$type: 'GetBetInfo';
}

export function storeGetBetInfo(src: GetBetInfo) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2443301346, 32);
    };
}

export function loadGetBetInfo(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2443301346) { throw Error('Invalid prefix'); }
    return { $$type: 'GetBetInfo' as const };
}

function loadTupleGetBetInfo(source: TupleReader) {
    return { $$type: 'GetBetInfo' as const };
}

function storeTupleGetBetInfo(source: GetBetInfo) {
    let builder = new TupleBuilder();
    return builder.build();
}

function dictValueParserGetBetInfo(): DictionaryValue<GetBetInfo> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeGetBetInfo(src)).endCell());
        },
        parse: (src) => {
            return loadGetBetInfo(src.loadRef().beginParse());
        }
    }
}

export type ProcessBetInfo = {
    $$type: 'ProcessBetInfo';
    accountManager: Address;
    owner: Address;
    seqno: bigint;
    odd_flag: boolean;
    delta_r: bigint;
    bet_amount: bigint;
    is_negative: boolean;
}

export function storeProcessBetInfo(src: ProcessBetInfo) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1218227262, 32);
        b_0.storeAddress(src.accountManager);
        b_0.storeAddress(src.owner);
        b_0.storeUint(src.seqno, 256);
        b_0.storeBit(src.odd_flag);
        b_0.storeCoins(src.delta_r);
        let b_1 = new Builder();
        b_1.storeCoins(src.bet_amount);
        b_1.storeBit(src.is_negative);
        b_0.storeRef(b_1.endCell());
    };
}

export function loadProcessBetInfo(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1218227262) { throw Error('Invalid prefix'); }
    let _accountManager = sc_0.loadAddress();
    let _owner = sc_0.loadAddress();
    let _seqno = sc_0.loadUintBig(256);
    let _odd_flag = sc_0.loadBit();
    let _delta_r = sc_0.loadCoins();
    let sc_1 = sc_0.loadRef().beginParse();
    let _bet_amount = sc_1.loadCoins();
    let _is_negative = sc_1.loadBit();
    return { $$type: 'ProcessBetInfo' as const, accountManager: _accountManager, owner: _owner, seqno: _seqno, odd_flag: _odd_flag, delta_r: _delta_r, bet_amount: _bet_amount, is_negative: _is_negative };
}

function loadTupleProcessBetInfo(source: TupleReader) {
    let _accountManager = source.readAddress();
    let _owner = source.readAddress();
    let _seqno = source.readBigNumber();
    let _odd_flag = source.readBoolean();
    let _delta_r = source.readBigNumber();
    let _bet_amount = source.readBigNumber();
    let _is_negative = source.readBoolean();
    return { $$type: 'ProcessBetInfo' as const, accountManager: _accountManager, owner: _owner, seqno: _seqno, odd_flag: _odd_flag, delta_r: _delta_r, bet_amount: _bet_amount, is_negative: _is_negative };
}

function storeTupleProcessBetInfo(source: ProcessBetInfo) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.accountManager);
    builder.writeAddress(source.owner);
    builder.writeNumber(source.seqno);
    builder.writeBoolean(source.odd_flag);
    builder.writeNumber(source.delta_r);
    builder.writeNumber(source.bet_amount);
    builder.writeBoolean(source.is_negative);
    return builder.build();
}

function dictValueParserProcessBetInfo(): DictionaryValue<ProcessBetInfo> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeProcessBetInfo(src)).endCell());
        },
        parse: (src) => {
            return loadProcessBetInfo(src.loadRef().beginParse());
        }
    }
}

export type InternalBetWinMessage = {
    $$type: 'InternalBetWinMessage';
    amount: bigint;
    owner_ton_wallet: Address;
}

export function storeInternalBetWinMessage(src: InternalBetWinMessage) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(3735498609, 32);
        b_0.storeCoins(src.amount);
        b_0.storeAddress(src.owner_ton_wallet);
    };
}

export function loadInternalBetWinMessage(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 3735498609) { throw Error('Invalid prefix'); }
    let _amount = sc_0.loadCoins();
    let _owner_ton_wallet = sc_0.loadAddress();
    return { $$type: 'InternalBetWinMessage' as const, amount: _amount, owner_ton_wallet: _owner_ton_wallet };
}

function loadTupleInternalBetWinMessage(source: TupleReader) {
    let _amount = source.readBigNumber();
    let _owner_ton_wallet = source.readAddress();
    return { $$type: 'InternalBetWinMessage' as const, amount: _amount, owner_ton_wallet: _owner_ton_wallet };
}

function storeTupleInternalBetWinMessage(source: InternalBetWinMessage) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.amount);
    builder.writeAddress(source.owner_ton_wallet);
    return builder.build();
}

function dictValueParserInternalBetWinMessage(): DictionaryValue<InternalBetWinMessage> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeInternalBetWinMessage(src)).endCell());
        },
        parse: (src) => {
            return loadInternalBetWinMessage(src.loadRef().beginParse());
        }
    }
}

export type Balance = {
    $$type: 'Balance';
    balance: bigint;
}

export function storeBalance(src: Balance) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(15493955, 32);
        b_0.storeCoins(src.balance);
    };
}

export function loadBalance(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 15493955) { throw Error('Invalid prefix'); }
    let _balance = sc_0.loadCoins();
    return { $$type: 'Balance' as const, balance: _balance };
}

function loadTupleBalance(source: TupleReader) {
    let _balance = source.readBigNumber();
    return { $$type: 'Balance' as const, balance: _balance };
}

function storeTupleBalance(source: Balance) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.balance);
    return builder.build();
}

function dictValueParserBalance(): DictionaryValue<Balance> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeBalance(src)).endCell());
        },
        parse: (src) => {
            return loadBalance(src.loadRef().beginParse());
        }
    }
}

export type InitMinter = {
    $$type: 'InitMinter';
    content: Cell | null;
}

export function storeInitMinter(src: InitMinter) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(3972604618, 32);
        if (src.content !== null && src.content !== undefined) { b_0.storeBit(true).storeRef(src.content); } else { b_0.storeBit(false); }
    };
}

export function loadInitMinter(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 3972604618) { throw Error('Invalid prefix'); }
    let _content = sc_0.loadBit() ? sc_0.loadRef() : null;
    return { $$type: 'InitMinter' as const, content: _content };
}

function loadTupleInitMinter(source: TupleReader) {
    let _content = source.readCellOpt();
    return { $$type: 'InitMinter' as const, content: _content };
}

function storeTupleInitMinter(source: InitMinter) {
    let builder = new TupleBuilder();
    builder.writeCell(source.content);
    return builder.build();
}

function dictValueParserInitMinter(): DictionaryValue<InitMinter> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeInitMinter(src)).endCell());
        },
        parse: (src) => {
            return loadInitMinter(src.loadRef().beginParse());
        }
    }
}

export type Withdraw = {
    $$type: 'Withdraw';
    amount: bigint;
}

export function storeWithdraw(src: Withdraw) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(195467089, 32);
        b_0.storeCoins(src.amount);
    };
}

export function loadWithdraw(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 195467089) { throw Error('Invalid prefix'); }
    let _amount = sc_0.loadCoins();
    return { $$type: 'Withdraw' as const, amount: _amount };
}

function loadTupleWithdraw(source: TupleReader) {
    let _amount = source.readBigNumber();
    return { $$type: 'Withdraw' as const, amount: _amount };
}

function storeTupleWithdraw(source: Withdraw) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.amount);
    return builder.build();
}

function dictValueParserWithdraw(): DictionaryValue<Withdraw> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeWithdraw(src)).endCell());
        },
        parse: (src) => {
            return loadWithdraw(src.loadRef().beginParse());
        }
    }
}

export type IncrementCurrentBlockCount = {
    $$type: 'IncrementCurrentBlockCount';
    seqno: bigint;
    odd_flag: boolean;
}

export function storeIncrementCurrentBlockCount(src: IncrementCurrentBlockCount) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(317473114, 32);
        b_0.storeUint(src.seqno, 256);
        b_0.storeBit(src.odd_flag);
    };
}

export function loadIncrementCurrentBlockCount(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 317473114) { throw Error('Invalid prefix'); }
    let _seqno = sc_0.loadUintBig(256);
    let _odd_flag = sc_0.loadBit();
    return { $$type: 'IncrementCurrentBlockCount' as const, seqno: _seqno, odd_flag: _odd_flag };
}

function loadTupleIncrementCurrentBlockCount(source: TupleReader) {
    let _seqno = source.readBigNumber();
    let _odd_flag = source.readBoolean();
    return { $$type: 'IncrementCurrentBlockCount' as const, seqno: _seqno, odd_flag: _odd_flag };
}

function storeTupleIncrementCurrentBlockCount(source: IncrementCurrentBlockCount) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.seqno);
    builder.writeBoolean(source.odd_flag);
    return builder.build();
}

function dictValueParserIncrementCurrentBlockCount(): DictionaryValue<IncrementCurrentBlockCount> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeIncrementCurrentBlockCount(src)).endCell());
        },
        parse: (src) => {
            return loadIncrementCurrentBlockCount(src.loadRef().beginParse());
        }
    }
}

export type ProcessOldBlock = {
    $$type: 'ProcessOldBlock';
    median_delta_r: bigint;
    course: bigint;
}

export function storeProcessOldBlock(src: ProcessOldBlock) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(3179079380, 32);
        b_0.storeCoins(src.median_delta_r);
        b_0.storeCoins(src.course);
    };
}

export function loadProcessOldBlock(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 3179079380) { throw Error('Invalid prefix'); }
    let _median_delta_r = sc_0.loadCoins();
    let _course = sc_0.loadCoins();
    return { $$type: 'ProcessOldBlock' as const, median_delta_r: _median_delta_r, course: _course };
}

function loadTupleProcessOldBlock(source: TupleReader) {
    let _median_delta_r = source.readBigNumber();
    let _course = source.readBigNumber();
    return { $$type: 'ProcessOldBlock' as const, median_delta_r: _median_delta_r, course: _course };
}

function storeTupleProcessOldBlock(source: ProcessOldBlock) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.median_delta_r);
    builder.writeNumber(source.course);
    return builder.build();
}

function dictValueParserProcessOldBlock(): DictionaryValue<ProcessOldBlock> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeProcessOldBlock(src)).endCell());
        },
        parse: (src) => {
            return loadProcessOldBlock(src.loadRef().beginParse());
        }
    }
}

export type TokenTransfer = {
    $$type: 'TokenTransfer';
    queryId: bigint;
    amount: bigint;
    destination: Address;
    responseDestination: Address | null;
    customPayload: Cell | null;
    forwardTonAmount: bigint;
    forwardPayload: Cell;
}

export function storeTokenTransfer(src: TokenTransfer) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(260734629, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeCoins(src.amount);
        b_0.storeAddress(src.destination);
        b_0.storeAddress(src.responseDestination);
        if (src.customPayload !== null && src.customPayload !== undefined) { b_0.storeBit(true).storeRef(src.customPayload); } else { b_0.storeBit(false); }
        b_0.storeCoins(src.forwardTonAmount);
        b_0.storeBuilder(src.forwardPayload.asBuilder());
    };
}

export function loadTokenTransfer(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 260734629) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    let _amount = sc_0.loadCoins();
    let _destination = sc_0.loadAddress();
    let _responseDestination = sc_0.loadMaybeAddress();
    let _customPayload = sc_0.loadBit() ? sc_0.loadRef() : null;
    let _forwardTonAmount = sc_0.loadCoins();
    let _forwardPayload = sc_0.asCell();
    return { $$type: 'TokenTransfer' as const, queryId: _queryId, amount: _amount, destination: _destination, responseDestination: _responseDestination, customPayload: _customPayload, forwardTonAmount: _forwardTonAmount, forwardPayload: _forwardPayload };
}

function loadTupleTokenTransfer(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _amount = source.readBigNumber();
    let _destination = source.readAddress();
    let _responseDestination = source.readAddressOpt();
    let _customPayload = source.readCellOpt();
    let _forwardTonAmount = source.readBigNumber();
    let _forwardPayload = source.readCell();
    return { $$type: 'TokenTransfer' as const, queryId: _queryId, amount: _amount, destination: _destination, responseDestination: _responseDestination, customPayload: _customPayload, forwardTonAmount: _forwardTonAmount, forwardPayload: _forwardPayload };
}

function storeTupleTokenTransfer(source: TokenTransfer) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeNumber(source.amount);
    builder.writeAddress(source.destination);
    builder.writeAddress(source.responseDestination);
    builder.writeCell(source.customPayload);
    builder.writeNumber(source.forwardTonAmount);
    builder.writeSlice(source.forwardPayload);
    return builder.build();
}

function dictValueParserTokenTransfer(): DictionaryValue<TokenTransfer> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeTokenTransfer(src)).endCell());
        },
        parse: (src) => {
            return loadTokenTransfer(src.loadRef().beginParse());
        }
    }
}

export type TokenTransferInternal = {
    $$type: 'TokenTransferInternal';
    queryId: bigint;
    amount: bigint;
    from: Address;
    responseAddress: Address | null;
    forwardTonAmount: bigint;
    forwardPayload: Cell;
}

export function storeTokenTransferInternal(src: TokenTransferInternal) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(395134233, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeCoins(src.amount);
        b_0.storeAddress(src.from);
        b_0.storeAddress(src.responseAddress);
        b_0.storeCoins(src.forwardTonAmount);
        b_0.storeBuilder(src.forwardPayload.asBuilder());
    };
}

export function loadTokenTransferInternal(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 395134233) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    let _amount = sc_0.loadCoins();
    let _from = sc_0.loadAddress();
    let _responseAddress = sc_0.loadMaybeAddress();
    let _forwardTonAmount = sc_0.loadCoins();
    let _forwardPayload = sc_0.asCell();
    return { $$type: 'TokenTransferInternal' as const, queryId: _queryId, amount: _amount, from: _from, responseAddress: _responseAddress, forwardTonAmount: _forwardTonAmount, forwardPayload: _forwardPayload };
}

function loadTupleTokenTransferInternal(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _amount = source.readBigNumber();
    let _from = source.readAddress();
    let _responseAddress = source.readAddressOpt();
    let _forwardTonAmount = source.readBigNumber();
    let _forwardPayload = source.readCell();
    return { $$type: 'TokenTransferInternal' as const, queryId: _queryId, amount: _amount, from: _from, responseAddress: _responseAddress, forwardTonAmount: _forwardTonAmount, forwardPayload: _forwardPayload };
}

function storeTupleTokenTransferInternal(source: TokenTransferInternal) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeNumber(source.amount);
    builder.writeAddress(source.from);
    builder.writeAddress(source.responseAddress);
    builder.writeNumber(source.forwardTonAmount);
    builder.writeSlice(source.forwardPayload);
    return builder.build();
}

function dictValueParserTokenTransferInternal(): DictionaryValue<TokenTransferInternal> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeTokenTransferInternal(src)).endCell());
        },
        parse: (src) => {
            return loadTokenTransferInternal(src.loadRef().beginParse());
        }
    }
}

export type TokenNotification = {
    $$type: 'TokenNotification';
    queryId: bigint;
    amount: bigint;
    from: Address;
    forwardPayload: Cell;
}

export function storeTokenNotification(src: TokenNotification) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1935855772, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeCoins(src.amount);
        b_0.storeAddress(src.from);
        b_0.storeBuilder(src.forwardPayload.asBuilder());
    };
}

export function loadTokenNotification(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1935855772) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    let _amount = sc_0.loadCoins();
    let _from = sc_0.loadAddress();
    let _forwardPayload = sc_0.asCell();
    return { $$type: 'TokenNotification' as const, queryId: _queryId, amount: _amount, from: _from, forwardPayload: _forwardPayload };
}

function loadTupleTokenNotification(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _amount = source.readBigNumber();
    let _from = source.readAddress();
    let _forwardPayload = source.readCell();
    return { $$type: 'TokenNotification' as const, queryId: _queryId, amount: _amount, from: _from, forwardPayload: _forwardPayload };
}

function storeTupleTokenNotification(source: TokenNotification) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeNumber(source.amount);
    builder.writeAddress(source.from);
    builder.writeSlice(source.forwardPayload);
    return builder.build();
}

function dictValueParserTokenNotification(): DictionaryValue<TokenNotification> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeTokenNotification(src)).endCell());
        },
        parse: (src) => {
            return loadTokenNotification(src.loadRef().beginParse());
        }
    }
}

export type TokenBurn = {
    $$type: 'TokenBurn';
    queryId: bigint;
    amount: bigint;
    owner: Address;
    responseAddress: Address | null;
}

export function storeTokenBurn(src: TokenBurn) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1499400124, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeCoins(src.amount);
        b_0.storeAddress(src.owner);
        b_0.storeAddress(src.responseAddress);
    };
}

export function loadTokenBurn(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1499400124) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    let _amount = sc_0.loadCoins();
    let _owner = sc_0.loadAddress();
    let _responseAddress = sc_0.loadMaybeAddress();
    return { $$type: 'TokenBurn' as const, queryId: _queryId, amount: _amount, owner: _owner, responseAddress: _responseAddress };
}

function loadTupleTokenBurn(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _amount = source.readBigNumber();
    let _owner = source.readAddress();
    let _responseAddress = source.readAddressOpt();
    return { $$type: 'TokenBurn' as const, queryId: _queryId, amount: _amount, owner: _owner, responseAddress: _responseAddress };
}

function storeTupleTokenBurn(source: TokenBurn) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeNumber(source.amount);
    builder.writeAddress(source.owner);
    builder.writeAddress(source.responseAddress);
    return builder.build();
}

function dictValueParserTokenBurn(): DictionaryValue<TokenBurn> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeTokenBurn(src)).endCell());
        },
        parse: (src) => {
            return loadTokenBurn(src.loadRef().beginParse());
        }
    }
}

export type TokenBurnNotification = {
    $$type: 'TokenBurnNotification';
    queryId: bigint;
    amount: bigint;
    owner: Address;
    responseAddress: Address | null;
}

export function storeTokenBurnNotification(src: TokenBurnNotification) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2078119902, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeCoins(src.amount);
        b_0.storeAddress(src.owner);
        b_0.storeAddress(src.responseAddress);
    };
}

export function loadTokenBurnNotification(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2078119902) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    let _amount = sc_0.loadCoins();
    let _owner = sc_0.loadAddress();
    let _responseAddress = sc_0.loadMaybeAddress();
    return { $$type: 'TokenBurnNotification' as const, queryId: _queryId, amount: _amount, owner: _owner, responseAddress: _responseAddress };
}

function loadTupleTokenBurnNotification(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _amount = source.readBigNumber();
    let _owner = source.readAddress();
    let _responseAddress = source.readAddressOpt();
    return { $$type: 'TokenBurnNotification' as const, queryId: _queryId, amount: _amount, owner: _owner, responseAddress: _responseAddress };
}

function storeTupleTokenBurnNotification(source: TokenBurnNotification) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeNumber(source.amount);
    builder.writeAddress(source.owner);
    builder.writeAddress(source.responseAddress);
    return builder.build();
}

function dictValueParserTokenBurnNotification(): DictionaryValue<TokenBurnNotification> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeTokenBurnNotification(src)).endCell());
        },
        parse: (src) => {
            return loadTokenBurnNotification(src.loadRef().beginParse());
        }
    }
}

export type TokenExcesses = {
    $$type: 'TokenExcesses';
    queryId: bigint;
}

export function storeTokenExcesses(src: TokenExcesses) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(3576854235, 32);
        b_0.storeUint(src.queryId, 64);
    };
}

export function loadTokenExcesses(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 3576854235) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    return { $$type: 'TokenExcesses' as const, queryId: _queryId };
}

function loadTupleTokenExcesses(source: TupleReader) {
    let _queryId = source.readBigNumber();
    return { $$type: 'TokenExcesses' as const, queryId: _queryId };
}

function storeTupleTokenExcesses(source: TokenExcesses) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    return builder.build();
}

function dictValueParserTokenExcesses(): DictionaryValue<TokenExcesses> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeTokenExcesses(src)).endCell());
        },
        parse: (src) => {
            return loadTokenExcesses(src.loadRef().beginParse());
        }
    }
}

export type TokenUpdateContent = {
    $$type: 'TokenUpdateContent';
    content: Cell | null;
}

export function storeTokenUpdateContent(src: TokenUpdateContent) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(201882270, 32);
        if (src.content !== null && src.content !== undefined) { b_0.storeBit(true).storeRef(src.content); } else { b_0.storeBit(false); }
    };
}

export function loadTokenUpdateContent(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 201882270) { throw Error('Invalid prefix'); }
    let _content = sc_0.loadBit() ? sc_0.loadRef() : null;
    return { $$type: 'TokenUpdateContent' as const, content: _content };
}

function loadTupleTokenUpdateContent(source: TupleReader) {
    let _content = source.readCellOpt();
    return { $$type: 'TokenUpdateContent' as const, content: _content };
}

function storeTupleTokenUpdateContent(source: TokenUpdateContent) {
    let builder = new TupleBuilder();
    builder.writeCell(source.content);
    return builder.build();
}

function dictValueParserTokenUpdateContent(): DictionaryValue<TokenUpdateContent> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeTokenUpdateContent(src)).endCell());
        },
        parse: (src) => {
            return loadTokenUpdateContent(src.loadRef().beginParse());
        }
    }
}

export type JettonData = {
    $$type: 'JettonData';
    totalSupply: bigint;
    mintable: boolean;
    owner: Address;
    content: Cell | null;
}

export function storeJettonData(src: JettonData) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeInt(src.totalSupply, 257);
        b_0.storeBit(src.mintable);
        b_0.storeAddress(src.owner);
        if (src.content !== null && src.content !== undefined) { b_0.storeBit(true).storeRef(src.content); } else { b_0.storeBit(false); }
    };
}

export function loadJettonData(slice: Slice) {
    let sc_0 = slice;
    let _totalSupply = sc_0.loadIntBig(257);
    let _mintable = sc_0.loadBit();
    let _owner = sc_0.loadAddress();
    let _content = sc_0.loadBit() ? sc_0.loadRef() : null;
    return { $$type: 'JettonData' as const, totalSupply: _totalSupply, mintable: _mintable, owner: _owner, content: _content };
}

function loadTupleJettonData(source: TupleReader) {
    let _totalSupply = source.readBigNumber();
    let _mintable = source.readBoolean();
    let _owner = source.readAddress();
    let _content = source.readCellOpt();
    return { $$type: 'JettonData' as const, totalSupply: _totalSupply, mintable: _mintable, owner: _owner, content: _content };
}

function storeTupleJettonData(source: JettonData) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.totalSupply);
    builder.writeBoolean(source.mintable);
    builder.writeAddress(source.owner);
    builder.writeCell(source.content);
    return builder.build();
}

function dictValueParserJettonData(): DictionaryValue<JettonData> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeJettonData(src)).endCell());
        },
        parse: (src) => {
            return loadJettonData(src.loadRef().beginParse());
        }
    }
}

export type JettonWalletData = {
    $$type: 'JettonWalletData';
    balance: bigint;
    owner: Address;
    master: Address;
}

export function storeJettonWalletData(src: JettonWalletData) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeInt(src.balance, 257);
        b_0.storeAddress(src.owner);
        b_0.storeAddress(src.master);
    };
}

export function loadJettonWalletData(slice: Slice) {
    let sc_0 = slice;
    let _balance = sc_0.loadIntBig(257);
    let _owner = sc_0.loadAddress();
    let _master = sc_0.loadAddress();
    return { $$type: 'JettonWalletData' as const, balance: _balance, owner: _owner, master: _master };
}

function loadTupleJettonWalletData(source: TupleReader) {
    let _balance = source.readBigNumber();
    let _owner = source.readAddress();
    let _master = source.readAddress();
    return { $$type: 'JettonWalletData' as const, balance: _balance, owner: _owner, master: _master };
}

function storeTupleJettonWalletData(source: JettonWalletData) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.balance);
    builder.writeAddress(source.owner);
    builder.writeAddress(source.master);
    return builder.build();
}

function dictValueParserJettonWalletData(): DictionaryValue<JettonWalletData> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeJettonWalletData(src)).endCell());
        },
        parse: (src) => {
            return loadJettonWalletData(src.loadRef().beginParse());
        }
    }
}

 type AccountManager_init_args = {
    $$type: 'AccountManager_init_args';
    owner: Address;
}

function initAccountManager_init_args(src: AccountManager_init_args) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeAddress(src.owner);
    };
}

async function AccountManager_init(owner: Address) {
    const __code = Cell.fromBase64('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');
    const __system = Cell.fromBase64('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');
    let builder = beginCell();
    builder.storeRef(__system);
    builder.storeUint(0, 1);
    initAccountManager_init_args({ $$type: 'AccountManager_init_args', owner })(builder);
    const __data = builder.endCell();
    return { code: __code, data: __data };
}

const AccountManager_errors: { [key: number]: { message: string } } = {
    2: { message: `Stack undeflow` },
    3: { message: `Stack overflow` },
    4: { message: `Integer overflow` },
    5: { message: `Integer out of expected range` },
    6: { message: `Invalid opcode` },
    7: { message: `Type check error` },
    8: { message: `Cell overflow` },
    9: { message: `Cell underflow` },
    10: { message: `Dictionary error` },
    13: { message: `Out of gas error` },
    32: { message: `Method ID not found` },
    34: { message: `Action is invalid or not supported` },
    37: { message: `Not enough TON` },
    38: { message: `Not enough extra-currencies` },
    128: { message: `Null reference exception` },
    129: { message: `Invalid serialization prefix` },
    130: { message: `Invalid incoming message` },
    131: { message: `Constraints error` },
    132: { message: `Access denied` },
    133: { message: `Contract stopped` },
    134: { message: `Invalid argument` },
    135: { message: `Code of a contract was not found` },
    136: { message: `Invalid address` },
    137: { message: `Masterchain support is not enabled for this contract` },
    4429: { message: `Invalid sender` },
    13650: { message: `Invalid bounced message` },
    15518: { message: `Amount is too small` },
    16059: { message: `Invalid value` },
    17990: { message: `Only bet can increment` },
    19255: { message: `Only current block` },
    37845: { message: `Invalid ID` },
    48121: { message: `Only Account Manager` },
    61019: { message: `Invalid Balance` },
    62972: { message: `Invalid balance` },
}

const AccountManager_types: ABIType[] = [
    {"name":"StateInit","header":null,"fields":[{"name":"code","type":{"kind":"simple","type":"cell","optional":false}},{"name":"data","type":{"kind":"simple","type":"cell","optional":false}}]},
    {"name":"Context","header":null,"fields":[{"name":"bounced","type":{"kind":"simple","type":"bool","optional":false}},{"name":"sender","type":{"kind":"simple","type":"address","optional":false}},{"name":"value","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"raw","type":{"kind":"simple","type":"slice","optional":false}}]},
    {"name":"SendParameters","header":null,"fields":[{"name":"bounce","type":{"kind":"simple","type":"bool","optional":false}},{"name":"to","type":{"kind":"simple","type":"address","optional":false}},{"name":"value","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"mode","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"body","type":{"kind":"simple","type":"cell","optional":true}},{"name":"code","type":{"kind":"simple","type":"cell","optional":true}},{"name":"data","type":{"kind":"simple","type":"cell","optional":true}}]},
    {"name":"Deploy","header":2490013878,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"DeployOk","header":2952335191,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"FactoryDeploy","header":1829761339,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"cashback","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"ChangeOwner","header":2174598809,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"newOwner","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"ChangeOwnerOk","header":846932810,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"newOwner","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"Mint","header":1519427335,"fields":[{"name":"amount","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"to","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"CreateNewBlock","header":4244186966,"fields":[{"name":"course","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}}]},
    {"name":"ApplyBetMessage","header":4260982606,"fields":[{"name":"account_manager","type":{"kind":"simple","type":"address","optional":false}},{"name":"owner","type":{"kind":"simple","type":"address","optional":false}},{"name":"bet_amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"delta_r","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"seqno","type":{"kind":"simple","type":"uint","optional":false,"format":256}},{"name":"odd_flag","type":{"kind":"simple","type":"bool","optional":false}},{"name":"is_negative","type":{"kind":"simple","type":"bool","optional":false}}]},
    {"name":"BetData","header":null,"fields":[{"name":"accountManager","type":{"kind":"simple","type":"address","optional":false}},{"name":"owner","type":{"kind":"simple","type":"address","optional":false}},{"name":"checkbook","type":{"kind":"simple","type":"address","optional":false}},{"name":"seqno","type":{"kind":"simple","type":"uint","optional":false,"format":256}},{"name":"odd_flag","type":{"kind":"simple","type":"bool","optional":false}},{"name":"delta_r","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"bet_amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"is_negative","type":{"kind":"simple","type":"bool","optional":false}}]},
    {"name":"SetBetInfo","header":4279425714,"fields":[{"name":"owner","type":{"kind":"simple","type":"address","optional":false}},{"name":"ton_check_book","type":{"kind":"simple","type":"address","optional":false}},{"name":"delta_r","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"balance","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"is_negative","type":{"kind":"simple","type":"bool","optional":false}}]},
    {"name":"GetBetInfo","header":2443301346,"fields":[]},
    {"name":"ProcessBetInfo","header":1218227262,"fields":[{"name":"accountManager","type":{"kind":"simple","type":"address","optional":false}},{"name":"owner","type":{"kind":"simple","type":"address","optional":false}},{"name":"seqno","type":{"kind":"simple","type":"uint","optional":false,"format":256}},{"name":"odd_flag","type":{"kind":"simple","type":"bool","optional":false}},{"name":"delta_r","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"bet_amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"is_negative","type":{"kind":"simple","type":"bool","optional":false}}]},
    {"name":"InternalBetWinMessage","header":3735498609,"fields":[{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"owner_ton_wallet","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"Balance","header":15493955,"fields":[{"name":"balance","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}}]},
    {"name":"InitMinter","header":3972604618,"fields":[{"name":"content","type":{"kind":"simple","type":"cell","optional":true}}]},
    {"name":"Withdraw","header":195467089,"fields":[{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}}]},
    {"name":"IncrementCurrentBlockCount","header":317473114,"fields":[{"name":"seqno","type":{"kind":"simple","type":"uint","optional":false,"format":256}},{"name":"odd_flag","type":{"kind":"simple","type":"bool","optional":false}}]},
    {"name":"ProcessOldBlock","header":3179079380,"fields":[{"name":"median_delta_r","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"course","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}}]},
    {"name":"TokenTransfer","header":260734629,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"destination","type":{"kind":"simple","type":"address","optional":false}},{"name":"responseDestination","type":{"kind":"simple","type":"address","optional":true}},{"name":"customPayload","type":{"kind":"simple","type":"cell","optional":true}},{"name":"forwardTonAmount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"forwardPayload","type":{"kind":"simple","type":"slice","optional":false,"format":"remainder"}}]},
    {"name":"TokenTransferInternal","header":395134233,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"from","type":{"kind":"simple","type":"address","optional":false}},{"name":"responseAddress","type":{"kind":"simple","type":"address","optional":true}},{"name":"forwardTonAmount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"forwardPayload","type":{"kind":"simple","type":"slice","optional":false,"format":"remainder"}}]},
    {"name":"TokenNotification","header":1935855772,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"from","type":{"kind":"simple","type":"address","optional":false}},{"name":"forwardPayload","type":{"kind":"simple","type":"slice","optional":false,"format":"remainder"}}]},
    {"name":"TokenBurn","header":1499400124,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"owner","type":{"kind":"simple","type":"address","optional":false}},{"name":"responseAddress","type":{"kind":"simple","type":"address","optional":true}}]},
    {"name":"TokenBurnNotification","header":2078119902,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"owner","type":{"kind":"simple","type":"address","optional":false}},{"name":"responseAddress","type":{"kind":"simple","type":"address","optional":true}}]},
    {"name":"TokenExcesses","header":3576854235,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"TokenUpdateContent","header":201882270,"fields":[{"name":"content","type":{"kind":"simple","type":"cell","optional":true}}]},
    {"name":"JettonData","header":null,"fields":[{"name":"totalSupply","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"mintable","type":{"kind":"simple","type":"bool","optional":false}},{"name":"owner","type":{"kind":"simple","type":"address","optional":false}},{"name":"content","type":{"kind":"simple","type":"cell","optional":true}}]},
    {"name":"JettonWalletData","header":null,"fields":[{"name":"balance","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"owner","type":{"kind":"simple","type":"address","optional":false}},{"name":"master","type":{"kind":"simple","type":"address","optional":false}}]},
]

const AccountManager_getters: ABIGetter[] = [
    {"name":"TonCheckBookAddress","arguments":[{"name":"owner","type":{"kind":"simple","type":"address","optional":false}}],"returnType":{"kind":"simple","type":"address","optional":false}},
    {"name":"JettonWalletAddress","arguments":[{"name":"owner","type":{"kind":"simple","type":"address","optional":false}}],"returnType":{"kind":"simple","type":"address","optional":false}},
    {"name":"minterAddress","arguments":[],"returnType":{"kind":"simple","type":"address","optional":false}},
    {"name":"myAddress","arguments":[],"returnType":{"kind":"simple","type":"address","optional":false}},
    {"name":"MaxBetIdInApplyedBlock","arguments":[],"returnType":{"kind":"simple","type":"int","optional":false,"format":257}},
    {"name":"MaxBetIdInCurrentBlock","arguments":[],"returnType":{"kind":"simple","type":"int","optional":false,"format":257}},
    {"name":"BetAddressBySeqnoInApplyedBlock","arguments":[{"name":"seqno","type":{"kind":"simple","type":"int","optional":false,"format":257}}],"returnType":{"kind":"simple","type":"address","optional":false}},
    {"name":"BetAddressBySeqnoInCurrentBlock","arguments":[{"name":"seqno","type":{"kind":"simple","type":"int","optional":false,"format":257}}],"returnType":{"kind":"simple","type":"address","optional":false}},
    {"name":"CurrentBlockOddFlag","arguments":[],"returnType":{"kind":"simple","type":"bool","optional":false}},
    {"name":"Balance","arguments":[],"returnType":{"kind":"simple","type":"int","optional":false,"format":257}},
    {"name":"OldBlockCourse","arguments":[],"returnType":{"kind":"simple","type":"int","optional":false,"format":257}},
    {"name":"NewBlockCourse","arguments":[],"returnType":{"kind":"simple","type":"int","optional":false,"format":257}},
    {"name":"owner","arguments":[],"returnType":{"kind":"simple","type":"address","optional":false}},
]

const AccountManager_receivers: ABIReceiver[] = [
    {"receiver":"internal","message":{"kind":"empty"}},
    {"receiver":"internal","message":{"kind":"typed","type":"DeployOk"}},
    {"receiver":"internal","message":{"kind":"typed","type":"InitMinter"}},
    {"receiver":"internal","message":{"kind":"typed","type":"IncrementCurrentBlockCount"}},
    {"receiver":"internal","message":{"kind":"typed","type":"Mint"}},
    {"receiver":"internal","message":{"kind":"typed","type":"InternalBetWinMessage"}},
    {"receiver":"internal","message":{"kind":"typed","type":"CreateNewBlock"}},
    {"receiver":"internal","message":{"kind":"typed","type":"Deploy"}},
]

export class AccountManager implements Contract {
    
    static async init(owner: Address) {
        return await AccountManager_init(owner);
    }
    
    static async fromInit(owner: Address) {
        const init = await AccountManager_init(owner);
        const address = contractAddress(0, init);
        return new AccountManager(address, init);
    }
    
    static fromAddress(address: Address) {
        return new AccountManager(address);
    }
    
    readonly address: Address; 
    readonly init?: { code: Cell, data: Cell };
    readonly abi: ContractABI = {
        types:  AccountManager_types,
        getters: AccountManager_getters,
        receivers: AccountManager_receivers,
        errors: AccountManager_errors,
    };
    
    private constructor(address: Address, init?: { code: Cell, data: Cell }) {
        this.address = address;
        this.init = init;
    }
    
    async send(provider: ContractProvider, via: Sender, args: { value: bigint, bounce?: boolean| null | undefined }, message: null | DeployOk | InitMinter | IncrementCurrentBlockCount | Mint | InternalBetWinMessage | CreateNewBlock | Deploy) {
        
        let body: Cell | null = null;
        if (message === null) {
            body = new Cell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'DeployOk') {
            body = beginCell().store(storeDeployOk(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'InitMinter') {
            body = beginCell().store(storeInitMinter(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'IncrementCurrentBlockCount') {
            body = beginCell().store(storeIncrementCurrentBlockCount(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'Mint') {
            body = beginCell().store(storeMint(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'InternalBetWinMessage') {
            body = beginCell().store(storeInternalBetWinMessage(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'CreateNewBlock') {
            body = beginCell().store(storeCreateNewBlock(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'Deploy') {
            body = beginCell().store(storeDeploy(message)).endCell();
        }
        if (body === null) { throw new Error('Invalid message type'); }
        
        await provider.internal(via, { ...args, body: body });
        
    }
    
    async getTonCheckBookAddress(provider: ContractProvider, owner: Address) {
        let builder = new TupleBuilder();
        builder.writeAddress(owner);
        let source = (await provider.get('TonCheckBookAddress', builder.build())).stack;
        let result = source.readAddress();
        return result;
    }
    
    async getJettonWalletAddress(provider: ContractProvider, owner: Address) {
        let builder = new TupleBuilder();
        builder.writeAddress(owner);
        let source = (await provider.get('JettonWalletAddress', builder.build())).stack;
        let result = source.readAddress();
        return result;
    }
    
    async getMinterAddress(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('minterAddress', builder.build())).stack;
        let result = source.readAddress();
        return result;
    }
    
    async getMyAddress(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('myAddress', builder.build())).stack;
        let result = source.readAddress();
        return result;
    }
    
    async getMaxBetIdInApplyedBlock(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('MaxBetIdInApplyedBlock', builder.build())).stack;
        let result = source.readBigNumber();
        return result;
    }
    
    async getMaxBetIdInCurrentBlock(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('MaxBetIdInCurrentBlock', builder.build())).stack;
        let result = source.readBigNumber();
        return result;
    }
    
    async getBetAddressBySeqnoInApplyedBlock(provider: ContractProvider, seqno: bigint) {
        let builder = new TupleBuilder();
        builder.writeNumber(seqno);
        let source = (await provider.get('BetAddressBySeqnoInApplyedBlock', builder.build())).stack;
        let result = source.readAddress();
        return result;
    }
    
    async getBetAddressBySeqnoInCurrentBlock(provider: ContractProvider, seqno: bigint) {
        let builder = new TupleBuilder();
        builder.writeNumber(seqno);
        let source = (await provider.get('BetAddressBySeqnoInCurrentBlock', builder.build())).stack;
        let result = source.readAddress();
        return result;
    }
    
    async getCurrentBlockOddFlag(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('CurrentBlockOddFlag', builder.build())).stack;
        let result = source.readBoolean();
        return result;
    }
    
    async getBalance(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('Balance', builder.build())).stack;
        let result = source.readBigNumber();
        return result;
    }
    
    async getOldBlockCourse(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('OldBlockCourse', builder.build())).stack;
        let result = source.readBigNumber();
        return result;
    }
    
    async getNewBlockCourse(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('NewBlockCourse', builder.build())).stack;
        let result = source.readBigNumber();
        return result;
    }
    
    async getOwner(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('owner', builder.build())).stack;
        let result = source.readAddress();
        return result;
    }
    
}