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
    content: Cell;
    is_minter_present: boolean;
    minter_address: Address | null;
}

export function storeInitMinter(src: InitMinter) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1112563628, 32);
        b_0.storeRef(src.content);
        b_0.storeBit(src.is_minter_present);
        b_0.storeAddress(src.minter_address);
    };
}

export function loadInitMinter(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1112563628) { throw Error('Invalid prefix'); }
    let _content = sc_0.loadRef();
    let _is_minter_present = sc_0.loadBit();
    let _minter_address = sc_0.loadMaybeAddress();
    return { $$type: 'InitMinter' as const, content: _content, is_minter_present: _is_minter_present, minter_address: _minter_address };
}

function loadTupleInitMinter(source: TupleReader) {
    let _content = source.readCell();
    let _is_minter_present = source.readBoolean();
    let _minter_address = source.readAddressOpt();
    return { $$type: 'InitMinter' as const, content: _content, is_minter_present: _is_minter_present, minter_address: _minter_address };
}

function storeTupleInitMinter(source: InitMinter) {
    let builder = new TupleBuilder();
    builder.writeCell(source.content);
    builder.writeBoolean(source.is_minter_present);
    builder.writeAddress(source.minter_address);
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

 type Bet_init_args = {
    $$type: 'Bet_init_args';
    accountManager: Address;
    seqno: bigint;
    odd_flag: boolean;
}

function initBet_init_args(src: Bet_init_args) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeAddress(src.accountManager);
        b_0.storeInt(src.seqno, 257);
        b_0.storeBit(src.odd_flag);
    };
}

async function Bet_init(accountManager: Address, seqno: bigint, odd_flag: boolean) {
    const __code = Cell.fromBase64('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');
    const __system = Cell.fromBase64('te6cckECIgEABe8AAQHAAQEFoXIDAgEU/wD0pBP0vPLICwMCAWISBAIBIBAFAgEgDAYCASAJBwIRtwbbZ5tnjZAwHwgACPgnbxACASALCgB1sm7jQ1aXBmczovL1FtWnp6WlB5VnBOODdLOHdweEVjQ2pWZVVuQzJONFFMR2tzcGVDaUVQd3JjZHOCAAEbCvu1E0NIAAYAIBIA4NAJW3ejBOC52Hq6WVz2PQnYc6yVCjbNBOE7rGpaVsj5ZkWnXlv74sRzBOBAq4A3AM7HKZywdVyOS2WHBOE7Lpy1Zp2W5nQdLNsozdFJACEbS3W2ebZ42REB8PABBUd2VUd2VTdgIRvwS22ebZ42QMHxEABPgoA37QAdDTAwFxsKMB+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiFRQUwNvBPhhAvhi2zxVF9s88uCC2zwfFRMBFsj4QwHMfwHKAFVwFADsUIcg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxZQBSDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFlADINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WAcjL/xLKAFj6AlAD+gLKAMkBzMntVAPO7aLt+wGSMH/gcCHXScIflTAg1wsf3iDAACLXScEhsJJbf+AgghD/EtqyuuMCIIIQlGqYtrqOqDDTHwGCEJRqmLa68uCB0z8BMcgBghCv+Q9XWMsfyz/J+EIBcG3bPH/gwACRMOMNcBsaFgP6+QEggvAsz0mPfN9AjwYuKWxt98CCgN14NzZl62s4SDPMFMcocrqPUzCCCvrwgHJ/U0nIWYIQ3qcvcVADyx8B+gIBINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WyStVMBRDMG1t2zwlcIEAgn9VIG1tbds8f9sx4CAdHRcC/oLwUx2iyj+UDXcTSJF8AIea7qPOzLzivaGP47j2+T270Q66jrQwjQhgAep1ZpPBmYhq7EHdqp+k9zY4kLE2bm5Zgxe3H+26H9a0cIEAgn9VIG1tbds8f9sx4ILww5JJZ2xalR9xUXrXhGVfqVwq5M4sc+U8rfC0ekw+P6q64wIdGAJA+EKCCTEtAHJ/VHuoVHqYKshVYNs8yRRDMG1t2zx/2zEZHQC4ghBInKw+UAjLH1AGINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WUAQg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxYSy//KAAH6AshY+gISygDJAcwBOm1tIm6zmVsgbvLQgG8iAZEy4hAkcAMEgEJQI9s8HQGwMNMfAYIQ/xLasrry4IH6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIAfpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgB+gD6ANIAVUBsFRwBVjU1NTc3ggkxLQB/clN2yFmCEBLsQVpQA8sfy//KAMkrVTAQJBAjbW3bPH8dAcrIcQHKAVAHAcoAcAHKAlAFINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WUAP6AnABymgjbrORf5MkbrPilzMzAXABygDjDSFus5x/AcoAASBu8tCAAcyVMXABygDiyQH7AB4AmH8BygDIcAHKAHABygAkbrOdfwHKAAQgbvLQgFAEzJY0A3ABygDiJG6znX8BygAEIG7y0IBQBMyWNANwAcoA4nABygACfwHKAALJWMwCiu1E0NQB+GPSAAHjAvgo1wsKgwm68uCJ+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiAGBAQHXANIAVSAD0VjbPCEgABZTInAgEDZeIhAjcADs+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiAH6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIAfpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgB1AHQ0//SAPoA+gDSADAQWBBXEFZsGHW4Xtw=');
    let builder = beginCell();
    builder.storeRef(__system);
    builder.storeUint(0, 1);
    initBet_init_args({ $$type: 'Bet_init_args', accountManager, seqno, odd_flag })(builder);
    const __data = builder.endCell();
    return { code: __code, data: __data };
}

const Bet_errors: { [key: number]: { message: string } } = {
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
    48121: { message: `Only Account Manager` },
}

const Bet_types: ABIType[] = [
    {"name":"StateInit","header":null,"fields":[{"name":"code","type":{"kind":"simple","type":"cell","optional":false}},{"name":"data","type":{"kind":"simple","type":"cell","optional":false}}]},
    {"name":"Context","header":null,"fields":[{"name":"bounced","type":{"kind":"simple","type":"bool","optional":false}},{"name":"sender","type":{"kind":"simple","type":"address","optional":false}},{"name":"value","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"raw","type":{"kind":"simple","type":"slice","optional":false}}]},
    {"name":"SendParameters","header":null,"fields":[{"name":"bounce","type":{"kind":"simple","type":"bool","optional":false}},{"name":"to","type":{"kind":"simple","type":"address","optional":false}},{"name":"value","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"mode","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"body","type":{"kind":"simple","type":"cell","optional":true}},{"name":"code","type":{"kind":"simple","type":"cell","optional":true}},{"name":"data","type":{"kind":"simple","type":"cell","optional":true}}]},
    {"name":"Deploy","header":2490013878,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"DeployOk","header":2952335191,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"FactoryDeploy","header":1829761339,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"cashback","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"ChangeOwner","header":2174598809,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"newOwner","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"ChangeOwnerOk","header":846932810,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"newOwner","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"CreateNewBlock","header":4244186966,"fields":[{"name":"course","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}}]},
    {"name":"ApplyBetMessage","header":4260982606,"fields":[{"name":"account_manager","type":{"kind":"simple","type":"address","optional":false}},{"name":"owner","type":{"kind":"simple","type":"address","optional":false}},{"name":"bet_amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"delta_r","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"seqno","type":{"kind":"simple","type":"uint","optional":false,"format":256}},{"name":"odd_flag","type":{"kind":"simple","type":"bool","optional":false}},{"name":"is_negative","type":{"kind":"simple","type":"bool","optional":false}}]},
    {"name":"BetData","header":null,"fields":[{"name":"accountManager","type":{"kind":"simple","type":"address","optional":false}},{"name":"owner","type":{"kind":"simple","type":"address","optional":false}},{"name":"checkbook","type":{"kind":"simple","type":"address","optional":false}},{"name":"seqno","type":{"kind":"simple","type":"uint","optional":false,"format":256}},{"name":"odd_flag","type":{"kind":"simple","type":"bool","optional":false}},{"name":"delta_r","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"bet_amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"is_negative","type":{"kind":"simple","type":"bool","optional":false}}]},
    {"name":"SetBetInfo","header":4279425714,"fields":[{"name":"owner","type":{"kind":"simple","type":"address","optional":false}},{"name":"ton_check_book","type":{"kind":"simple","type":"address","optional":false}},{"name":"delta_r","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"balance","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"is_negative","type":{"kind":"simple","type":"bool","optional":false}}]},
    {"name":"GetBetInfo","header":2443301346,"fields":[]},
    {"name":"ProcessBetInfo","header":1218227262,"fields":[{"name":"accountManager","type":{"kind":"simple","type":"address","optional":false}},{"name":"owner","type":{"kind":"simple","type":"address","optional":false}},{"name":"seqno","type":{"kind":"simple","type":"uint","optional":false,"format":256}},{"name":"odd_flag","type":{"kind":"simple","type":"bool","optional":false}},{"name":"delta_r","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"bet_amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"is_negative","type":{"kind":"simple","type":"bool","optional":false}}]},
    {"name":"InternalBetWinMessage","header":3735498609,"fields":[{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"owner_ton_wallet","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"Balance","header":15493955,"fields":[{"name":"balance","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}}]},
    {"name":"InitMinter","header":1112563628,"fields":[{"name":"content","type":{"kind":"simple","type":"cell","optional":false}},{"name":"is_minter_present","type":{"kind":"simple","type":"bool","optional":false}},{"name":"minter_address","type":{"kind":"simple","type":"address","optional":true}}]},
    {"name":"Withdraw","header":195467089,"fields":[{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}}]},
    {"name":"IncrementCurrentBlockCount","header":317473114,"fields":[{"name":"seqno","type":{"kind":"simple","type":"uint","optional":false,"format":256}},{"name":"odd_flag","type":{"kind":"simple","type":"bool","optional":false}}]},
    {"name":"ProcessOldBlock","header":3179079380,"fields":[{"name":"median_delta_r","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"course","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}}]},
]

const Bet_getters: ABIGetter[] = [
    {"name":"BetData","arguments":[],"returnType":{"kind":"simple","type":"BetData","optional":false}},
    {"name":"Balance","arguments":[],"returnType":{"kind":"simple","type":"int","optional":false,"format":257}},
    {"name":"Address","arguments":[],"returnType":{"kind":"simple","type":"address","optional":false}},
]

const Bet_receivers: ABIReceiver[] = [
    {"receiver":"internal","message":{"kind":"empty"}},
    {"receiver":"internal","message":{"kind":"typed","type":"SetBetInfo"}},
    {"receiver":"internal","message":{"kind":"text","text":"Win"}},
    {"receiver":"internal","message":{"kind":"text","text":"Lose"}},
    {"receiver":"internal","message":{"kind":"text","text":"GetBetInfo"}},
    {"receiver":"internal","message":{"kind":"typed","type":"Deploy"}},
]

export class Bet implements Contract {
    
    static async init(accountManager: Address, seqno: bigint, odd_flag: boolean) {
        return await Bet_init(accountManager, seqno, odd_flag);
    }
    
    static async fromInit(accountManager: Address, seqno: bigint, odd_flag: boolean) {
        const init = await Bet_init(accountManager, seqno, odd_flag);
        const address = contractAddress(0, init);
        return new Bet(address, init);
    }
    
    static fromAddress(address: Address) {
        return new Bet(address);
    }
    
    readonly address: Address; 
    readonly init?: { code: Cell, data: Cell };
    readonly abi: ContractABI = {
        types:  Bet_types,
        getters: Bet_getters,
        receivers: Bet_receivers,
        errors: Bet_errors,
    };
    
    private constructor(address: Address, init?: { code: Cell, data: Cell }) {
        this.address = address;
        this.init = init;
    }
    
    async send(provider: ContractProvider, via: Sender, args: { value: bigint, bounce?: boolean| null | undefined }, message: null | SetBetInfo | 'Win' | 'Lose' | 'GetBetInfo' | Deploy) {
        
        let body: Cell | null = null;
        if (message === null) {
            body = new Cell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'SetBetInfo') {
            body = beginCell().store(storeSetBetInfo(message)).endCell();
        }
        if (message === 'Win') {
            body = beginCell().storeUint(0, 32).storeStringTail(message).endCell();
        }
        if (message === 'Lose') {
            body = beginCell().storeUint(0, 32).storeStringTail(message).endCell();
        }
        if (message === 'GetBetInfo') {
            body = beginCell().storeUint(0, 32).storeStringTail(message).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'Deploy') {
            body = beginCell().store(storeDeploy(message)).endCell();
        }
        if (body === null) { throw new Error('Invalid message type'); }
        
        await provider.internal(via, { ...args, body: body });
        
    }
    
    async getBetData(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('BetData', builder.build())).stack;
        const result = loadTupleBetData(source);
        return result;
    }
    
    async getBalance(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('Balance', builder.build())).stack;
        let result = source.readBigNumber();
        return result;
    }
    
    async getAddress(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('Address', builder.build())).stack;
        let result = source.readAddress();
        return result;
    }
    
}