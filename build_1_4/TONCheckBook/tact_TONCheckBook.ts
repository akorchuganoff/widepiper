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

export type Win = {
    $$type: 'Win';
}

export function storeWin(src: Win) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(174790457, 32);
    };
}

export function loadWin(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 174790457) { throw Error('Invalid prefix'); }
    return { $$type: 'Win' as const };
}

function loadTupleWin(source: TupleReader) {
    return { $$type: 'Win' as const };
}

function storeTupleWin(source: Win) {
    let builder = new TupleBuilder();
    return builder.build();
}

function dictValueParserWin(): DictionaryValue<Win> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeWin(src)).endCell());
        },
        parse: (src) => {
            return loadWin(src.loadRef().beginParse());
        }
    }
}

export type Lose = {
    $$type: 'Lose';
}

export function storeLose(src: Lose) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(866806741, 32);
    };
}

export function loadLose(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 866806741) { throw Error('Invalid prefix'); }
    return { $$type: 'Lose' as const };
}

function loadTupleLose(source: TupleReader) {
    return { $$type: 'Lose' as const };
}

function storeTupleLose(source: Lose) {
    let builder = new TupleBuilder();
    return builder.build();
}

function dictValueParserLose(): DictionaryValue<Lose> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeLose(src)).endCell());
        },
        parse: (src) => {
            return loadLose(src.loadRef().beginParse());
        }
    }
}

export type ApplyBetMessage = {
    $$type: 'ApplyBetMessage';
    owner: Address;
    rounds_count: bigint;
    delta_r: bigint;
    bet_ammount: bigint;
    prev_bet_seqno: bigint;
    prev_bet_odd_flag: boolean;
}

export function storeApplyBetMessage(src: ApplyBetMessage) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2142873043, 32);
        b_0.storeAddress(src.owner);
        b_0.storeUint(src.rounds_count, 16);
        b_0.storeCoins(src.delta_r);
        b_0.storeCoins(src.bet_ammount);
        b_0.storeUint(src.prev_bet_seqno, 256);
        b_0.storeBit(src.prev_bet_odd_flag);
    };
}

export function loadApplyBetMessage(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2142873043) { throw Error('Invalid prefix'); }
    let _owner = sc_0.loadAddress();
    let _rounds_count = sc_0.loadUintBig(16);
    let _delta_r = sc_0.loadCoins();
    let _bet_ammount = sc_0.loadCoins();
    let _prev_bet_seqno = sc_0.loadUintBig(256);
    let _prev_bet_odd_flag = sc_0.loadBit();
    return { $$type: 'ApplyBetMessage' as const, owner: _owner, rounds_count: _rounds_count, delta_r: _delta_r, bet_ammount: _bet_ammount, prev_bet_seqno: _prev_bet_seqno, prev_bet_odd_flag: _prev_bet_odd_flag };
}

function loadTupleApplyBetMessage(source: TupleReader) {
    let _owner = source.readAddress();
    let _rounds_count = source.readBigNumber();
    let _delta_r = source.readBigNumber();
    let _bet_ammount = source.readBigNumber();
    let _prev_bet_seqno = source.readBigNumber();
    let _prev_bet_odd_flag = source.readBoolean();
    return { $$type: 'ApplyBetMessage' as const, owner: _owner, rounds_count: _rounds_count, delta_r: _delta_r, bet_ammount: _bet_ammount, prev_bet_seqno: _prev_bet_seqno, prev_bet_odd_flag: _prev_bet_odd_flag };
}

function storeTupleApplyBetMessage(source: ApplyBetMessage) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.owner);
    builder.writeNumber(source.rounds_count);
    builder.writeNumber(source.delta_r);
    builder.writeNumber(source.bet_ammount);
    builder.writeNumber(source.prev_bet_seqno);
    builder.writeBoolean(source.prev_bet_odd_flag);
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
    seqno: bigint;
    odd_flag: boolean;
    rounds_count: bigint;
    delta_r: bigint;
    bet_amount: bigint;
}

export function storeBetData(src: BetData) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeAddress(src.accountManager);
        b_0.storeAddress(src.owner);
        b_0.storeUint(src.seqno, 256);
        b_0.storeBit(src.odd_flag);
        b_0.storeUint(src.rounds_count, 16);
        b_0.storeCoins(src.delta_r);
        let b_1 = new Builder();
        b_1.storeCoins(src.bet_amount);
        b_0.storeRef(b_1.endCell());
    };
}

export function loadBetData(slice: Slice) {
    let sc_0 = slice;
    let _accountManager = sc_0.loadAddress();
    let _owner = sc_0.loadAddress();
    let _seqno = sc_0.loadUintBig(256);
    let _odd_flag = sc_0.loadBit();
    let _rounds_count = sc_0.loadUintBig(16);
    let _delta_r = sc_0.loadCoins();
    let sc_1 = sc_0.loadRef().beginParse();
    let _bet_amount = sc_1.loadCoins();
    return { $$type: 'BetData' as const, accountManager: _accountManager, owner: _owner, seqno: _seqno, odd_flag: _odd_flag, rounds_count: _rounds_count, delta_r: _delta_r, bet_amount: _bet_amount };
}

function loadTupleBetData(source: TupleReader) {
    let _accountManager = source.readAddress();
    let _owner = source.readAddress();
    let _seqno = source.readBigNumber();
    let _odd_flag = source.readBoolean();
    let _rounds_count = source.readBigNumber();
    let _delta_r = source.readBigNumber();
    let _bet_amount = source.readBigNumber();
    return { $$type: 'BetData' as const, accountManager: _accountManager, owner: _owner, seqno: _seqno, odd_flag: _odd_flag, rounds_count: _rounds_count, delta_r: _delta_r, bet_amount: _bet_amount };
}

function storeTupleBetData(source: BetData) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.accountManager);
    builder.writeAddress(source.owner);
    builder.writeNumber(source.seqno);
    builder.writeBoolean(source.odd_flag);
    builder.writeNumber(source.rounds_count);
    builder.writeNumber(source.delta_r);
    builder.writeNumber(source.bet_amount);
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
    owner_ton_wallet: Address;
    rounds_count: bigint;
    delta_r: bigint;
}

export function storeSetBetInfo(src: SetBetInfo) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(942208451, 32);
        b_0.storeAddress(src.owner_ton_wallet);
        b_0.storeUint(src.rounds_count, 16);
        b_0.storeCoins(src.delta_r);
    };
}

export function loadSetBetInfo(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 942208451) { throw Error('Invalid prefix'); }
    let _owner_ton_wallet = sc_0.loadAddress();
    let _rounds_count = sc_0.loadUintBig(16);
    let _delta_r = sc_0.loadCoins();
    return { $$type: 'SetBetInfo' as const, owner_ton_wallet: _owner_ton_wallet, rounds_count: _rounds_count, delta_r: _delta_r };
}

function loadTupleSetBetInfo(source: TupleReader) {
    let _owner_ton_wallet = source.readAddress();
    let _rounds_count = source.readBigNumber();
    let _delta_r = source.readBigNumber();
    return { $$type: 'SetBetInfo' as const, owner_ton_wallet: _owner_ton_wallet, rounds_count: _rounds_count, delta_r: _delta_r };
}

function storeTupleSetBetInfo(source: SetBetInfo) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.owner_ton_wallet);
    builder.writeNumber(source.rounds_count);
    builder.writeNumber(source.delta_r);
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
    rounds_count: bigint;
    delta_r: bigint;
    bet_amount: bigint;
}

export function storeProcessBetInfo(src: ProcessBetInfo) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1208154667, 32);
        b_0.storeAddress(src.accountManager);
        b_0.storeAddress(src.owner);
        b_0.storeUint(src.seqno, 256);
        b_0.storeBit(src.odd_flag);
        b_0.storeUint(src.rounds_count, 16);
        b_0.storeCoins(src.delta_r);
        let b_1 = new Builder();
        b_1.storeCoins(src.bet_amount);
        b_0.storeRef(b_1.endCell());
    };
}

export function loadProcessBetInfo(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1208154667) { throw Error('Invalid prefix'); }
    let _accountManager = sc_0.loadAddress();
    let _owner = sc_0.loadAddress();
    let _seqno = sc_0.loadUintBig(256);
    let _odd_flag = sc_0.loadBit();
    let _rounds_count = sc_0.loadUintBig(16);
    let _delta_r = sc_0.loadCoins();
    let sc_1 = sc_0.loadRef().beginParse();
    let _bet_amount = sc_1.loadCoins();
    return { $$type: 'ProcessBetInfo' as const, accountManager: _accountManager, owner: _owner, seqno: _seqno, odd_flag: _odd_flag, rounds_count: _rounds_count, delta_r: _delta_r, bet_amount: _bet_amount };
}

function loadTupleProcessBetInfo(source: TupleReader) {
    let _accountManager = source.readAddress();
    let _owner = source.readAddress();
    let _seqno = source.readBigNumber();
    let _odd_flag = source.readBoolean();
    let _rounds_count = source.readBigNumber();
    let _delta_r = source.readBigNumber();
    let _bet_amount = source.readBigNumber();
    return { $$type: 'ProcessBetInfo' as const, accountManager: _accountManager, owner: _owner, seqno: _seqno, odd_flag: _odd_flag, rounds_count: _rounds_count, delta_r: _delta_r, bet_amount: _bet_amount };
}

function storeTupleProcessBetInfo(source: ProcessBetInfo) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.accountManager);
    builder.writeAddress(source.owner);
    builder.writeNumber(source.seqno);
    builder.writeBoolean(source.odd_flag);
    builder.writeNumber(source.rounds_count);
    builder.writeNumber(source.delta_r);
    builder.writeNumber(source.bet_amount);
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

export type PayBet = {
    $$type: 'PayBet';
    bet_address: Address;
    amount: bigint;
}

export function storePayBet(src: PayBet) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1926842362, 32);
        b_0.storeAddress(src.bet_address);
        b_0.storeCoins(src.amount);
    };
}

export function loadPayBet(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1926842362) { throw Error('Invalid prefix'); }
    let _bet_address = sc_0.loadAddress();
    let _amount = sc_0.loadCoins();
    return { $$type: 'PayBet' as const, bet_address: _bet_address, amount: _amount };
}

function loadTuplePayBet(source: TupleReader) {
    let _bet_address = source.readAddress();
    let _amount = source.readBigNumber();
    return { $$type: 'PayBet' as const, bet_address: _bet_address, amount: _amount };
}

function storeTuplePayBet(source: PayBet) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.bet_address);
    builder.writeNumber(source.amount);
    return builder.build();
}

function dictValueParserPayBet(): DictionaryValue<PayBet> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storePayBet(src)).endCell());
        },
        parse: (src) => {
            return loadPayBet(src.loadRef().beginParse());
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

 type TONCheckBook_init_args = {
    $$type: 'TONCheckBook_init_args';
    accountManager: Address;
    owner: Address;
}

function initTONCheckBook_init_args(src: TONCheckBook_init_args) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeAddress(src.accountManager);
        b_0.storeAddress(src.owner);
    };
}

async function TONCheckBook_init(accountManager: Address, owner: Address) {
    const __code = Cell.fromBase64('te6ccgECGgEABGEAART/APSkE/S88sgLAQIBYgIDA3jQAdDTAwFxsKMB+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiFRQUwNvBPhhAvhi2zxa2zzy4IIXBAUCASAODwPaAY4wgCDXIXAh10nCH5UwINcLH96CEAuml1G6jhPTHwGCEAuml1G68uCB+gABMTB/4DB/4HAh10nCH5UwINcLH94gwAAi10nBIbCSW3/gIIIQC6aXUbrjAiCCEHLZR/q64wKCEJRqmLa64wIwcAYHCACWyPhDAcx/AcoAWVkg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxYBINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8Wye1UA4Yw0x8BghALppdRuvLggfoAATFZ2zyBPJ74J28QggnJw4C88vT4QvgnbxCCCcnDgKFQBLYIgEJ/iBBGFEMwbW3bPAF/CQoMAaww0x8BghBy2Uf6uvLggfpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgB+gBZbBKBZ0b4QlJQxwXy9IIAqXz4J28QUiC58vSAQn9VIG1tbds8fwwBTtMfAYIQlGqYtrry4IHTPwExyAGCEK/5D1dYyx/LP8n4QgFwbds8fwsAEvhCUhDHBfLghABCAAAAAE1vbmV5IHN1Y2Nlc3NmdWxseSB3aXRoZHJhd2VkATptbSJus5lbIG7y0IBvIgGRMuIQJHADBIBCUCPbPAwByshxAcoBUAcBygBwAcoCUAUg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxZQA/oCcAHKaCNus5F/kyRus+KXMzMBcAHKAOMNIW6znH8BygABIG7y0IABzJUxcAHKAOLJAfsADQCYfwHKAMhwAcoAcAHKACRus51/AcoABCBu8tCAUATMljQDcAHKAOIkbrOdfwHKAAQgbvLQgFAEzJY0A3ABygDicAHKAAJ/AcoAAslYzAIRviju2ebZ42EMFxACASAREgACIAC5u70YJwXOw9XSyuex6E7DnWSoUbZoJwndY1LStkfLMi068t/fFiOYJwIFXAG4BnY5TOWDquRyWyw4JwnZdOWrNOy3M6DpZtlGbopIJwQM51aecV+dJQsB1hbiZHsoAgEgExQCASAVFgIRtwbbZ5tnjYQwFxgAEbCvu1E0NIAAYAB1sm7jQ1aXBmczovL1FtVGFUQ0VoZkdjQUxBMlNUWjNIRHJRM0JmSGc3bWtucWJoNUREdzltNnh4dFKCABtO1E0NQB+GPSAAGOQvpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgB+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiBJsEuD4KNcLCoMJuvLgiRkACPgnbxAAhvpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgB+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiBIC0QE=');
    const __system = Cell.fromBase64('te6cckECHAEABGsAAQHAAQEFobxFAgEU/wD0pBP0vPLICwMCAWIPBAIBIA0FAgEgDAYCASAJBwIRtwbbZ5tnjYQwGggACPgnbxACASALCgB1sm7jQ1aXBmczovL1FtVGFUQ0VoZkdjQUxBMlNUWjNIRHJRM0JmSGc3bWtucWJoNUREdzltNnh4dFKCAAEbCvu1E0NIAAYAC5u70YJwXOw9XSyuex6E7DnWSoUbZoJwndY1LStkfLMi068t/fFiOYJwIFXAG4BnY5TOWDquRyWyw4JwnZdOWrNOy3M6DpZtlGbopIJwQM51aecV+dJQsB1hbiZHsoAhG+KO7Z5tnjYQwaDgACIAN40AHQ0wMBcbCjAfpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IhUUFMDbwT4YQL4Yts8Wts88uCCGhEQAJbI+EMBzH8BygBZWSDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFgEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxbJ7VQD2gGOMIAg1yFwIddJwh+VMCDXCx/eghALppdRuo4T0x8BghALppdRuvLggfoAATEwf+Awf+BwIddJwh+VMCDXCx/eIMAAItdJwSGwklt/4CCCEAuml1G64wIgghBy2Uf6uuMCghCUapi2uuMCMHAVFBIBTtMfAYIQlGqYtrry4IHTPwExyAGCEK/5D1dYyx/LP8n4QgFwbds8fxMBOm1tIm6zmVsgbvLQgG8iAZEy4hAkcAMEgEJQI9s8FgGsMNMfAYIQctlH+rry4IH6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIAfoAWWwSgWdG+EJSUMcF8vSCAKl8+CdvEFIgufL0gEJ/VSBtbW3bPH8WA4Yw0x8BghALppdRuvLggfoAATFZ2zyBPJ74J28QggnJw4C88vT4QvgnbxCCCcnDgKFQBLYIgEJ/iBBGFEMwbW3bPAF/GRgWAcrIcQHKAVAHAcoAcAHKAlAFINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WUAP6AnABymgjbrORf5MkbrPilzMzAXABygDjDSFus5x/AcoAASBu8tCAAcyVMXABygDiyQH7ABcAmH8BygDIcAHKAHABygAkbrOdfwHKAAQgbvLQgFAEzJY0A3ABygDiJG6znX8BygAEIG7y0IBQBMyWNANwAcoA4nABygACfwHKAALJWMwAQgAAAABNb25leSBzdWNjZXNzZnVsbHkgd2l0aGRyYXdlZAAS+EJSEMcF8uCEAbTtRNDUAfhj0gABjkL6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIAfpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgSbBLg+CjXCwqDCbry4IkbAIb6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIAfpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgSAtEBE8GeRQ==');
    let builder = beginCell();
    builder.storeRef(__system);
    builder.storeUint(0, 1);
    initTONCheckBook_init_args({ $$type: 'TONCheckBook_init_args', accountManager, owner })(builder);
    const __data = builder.endCell();
    return { code: __code, data: __data };
}

const TONCheckBook_errors: { [key: number]: { message: string } } = {
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
    15518: { message: `Amount is too small` },
    26438: { message: `Only account manager` },
    43388: { message: `Can not make a bet` },
}

const TONCheckBook_types: ABIType[] = [
    {"name":"StateInit","header":null,"fields":[{"name":"code","type":{"kind":"simple","type":"cell","optional":false}},{"name":"data","type":{"kind":"simple","type":"cell","optional":false}}]},
    {"name":"Context","header":null,"fields":[{"name":"bounced","type":{"kind":"simple","type":"bool","optional":false}},{"name":"sender","type":{"kind":"simple","type":"address","optional":false}},{"name":"value","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"raw","type":{"kind":"simple","type":"slice","optional":false}}]},
    {"name":"SendParameters","header":null,"fields":[{"name":"bounce","type":{"kind":"simple","type":"bool","optional":false}},{"name":"to","type":{"kind":"simple","type":"address","optional":false}},{"name":"value","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"mode","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"body","type":{"kind":"simple","type":"cell","optional":true}},{"name":"code","type":{"kind":"simple","type":"cell","optional":true}},{"name":"data","type":{"kind":"simple","type":"cell","optional":true}}]},
    {"name":"Deploy","header":2490013878,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"DeployOk","header":2952335191,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"FactoryDeploy","header":1829761339,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"cashback","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"ChangeOwner","header":2174598809,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"newOwner","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"ChangeOwnerOk","header":846932810,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"newOwner","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"CreateNewBlock","header":4244186966,"fields":[{"name":"course","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}}]},
    {"name":"Win","header":174790457,"fields":[]},
    {"name":"Lose","header":866806741,"fields":[]},
    {"name":"ApplyBetMessage","header":2142873043,"fields":[{"name":"owner","type":{"kind":"simple","type":"address","optional":false}},{"name":"rounds_count","type":{"kind":"simple","type":"uint","optional":false,"format":16}},{"name":"delta_r","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"bet_ammount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"prev_bet_seqno","type":{"kind":"simple","type":"uint","optional":false,"format":256}},{"name":"prev_bet_odd_flag","type":{"kind":"simple","type":"bool","optional":false}}]},
    {"name":"BetData","header":null,"fields":[{"name":"accountManager","type":{"kind":"simple","type":"address","optional":false}},{"name":"owner","type":{"kind":"simple","type":"address","optional":false}},{"name":"seqno","type":{"kind":"simple","type":"uint","optional":false,"format":256}},{"name":"odd_flag","type":{"kind":"simple","type":"bool","optional":false}},{"name":"rounds_count","type":{"kind":"simple","type":"uint","optional":false,"format":16}},{"name":"delta_r","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"bet_amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}}]},
    {"name":"SetBetInfo","header":942208451,"fields":[{"name":"owner_ton_wallet","type":{"kind":"simple","type":"address","optional":false}},{"name":"rounds_count","type":{"kind":"simple","type":"uint","optional":false,"format":16}},{"name":"delta_r","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}}]},
    {"name":"GetBetInfo","header":2443301346,"fields":[]},
    {"name":"ProcessBetInfo","header":1208154667,"fields":[{"name":"accountManager","type":{"kind":"simple","type":"address","optional":false}},{"name":"owner","type":{"kind":"simple","type":"address","optional":false}},{"name":"seqno","type":{"kind":"simple","type":"uint","optional":false,"format":256}},{"name":"odd_flag","type":{"kind":"simple","type":"bool","optional":false}},{"name":"rounds_count","type":{"kind":"simple","type":"uint","optional":false,"format":16}},{"name":"delta_r","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"bet_amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}}]},
    {"name":"InternalBetWinMessage","header":3735498609,"fields":[{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"owner_ton_wallet","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"PayBet","header":1926842362,"fields":[{"name":"bet_address","type":{"kind":"simple","type":"address","optional":false}},{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}}]},
    {"name":"Balance","header":15493955,"fields":[{"name":"balance","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}}]},
    {"name":"InitMinter","header":3972604618,"fields":[{"name":"content","type":{"kind":"simple","type":"cell","optional":true}}]},
    {"name":"Withdraw","header":195467089,"fields":[{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}}]},
]

const TONCheckBook_getters: ABIGetter[] = [
    {"name":"Balance","arguments":[],"returnType":{"kind":"simple","type":"int","optional":false,"format":257}},
    {"name":"owner","arguments":[],"returnType":{"kind":"simple","type":"address","optional":false}},
]

const TONCheckBook_receivers: ABIReceiver[] = [
    {"receiver":"internal","message":{"kind":"empty"}},
    {"receiver":"internal","message":{"kind":"typed","type":"Withdraw"}},
    {"receiver":"internal","message":{"kind":"typed","type":"PayBet"}},
    {"receiver":"internal","message":{"kind":"typed","type":"Deploy"}},
]

export class TONCheckBook implements Contract {
    
    static async init(accountManager: Address, owner: Address) {
        return await TONCheckBook_init(accountManager, owner);
    }
    
    static async fromInit(accountManager: Address, owner: Address) {
        const init = await TONCheckBook_init(accountManager, owner);
        const address = contractAddress(0, init);
        return new TONCheckBook(address, init);
    }
    
    static fromAddress(address: Address) {
        return new TONCheckBook(address);
    }
    
    readonly address: Address; 
    readonly init?: { code: Cell, data: Cell };
    readonly abi: ContractABI = {
        types:  TONCheckBook_types,
        getters: TONCheckBook_getters,
        receivers: TONCheckBook_receivers,
        errors: TONCheckBook_errors,
    };
    
    private constructor(address: Address, init?: { code: Cell, data: Cell }) {
        this.address = address;
        this.init = init;
    }
    
    async send(provider: ContractProvider, via: Sender, args: { value: bigint, bounce?: boolean| null | undefined }, message: null | Withdraw | PayBet | Deploy) {
        
        let body: Cell | null = null;
        if (message === null) {
            body = new Cell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'Withdraw') {
            body = beginCell().store(storeWithdraw(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'PayBet') {
            body = beginCell().store(storePayBet(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'Deploy') {
            body = beginCell().store(storeDeploy(message)).endCell();
        }
        if (body === null) { throw new Error('Invalid message type'); }
        
        await provider.internal(via, { ...args, body: body });
        
    }
    
    async getBalance(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('Balance', builder.build())).stack;
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