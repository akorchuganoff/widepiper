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
    receiver: Address;
}

export function storeMint(src: Mint) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(4235234258, 32);
        b_0.storeInt(src.amount, 257);
        b_0.storeAddress(src.receiver);
    };
}

export function loadMint(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 4235234258) { throw Error('Invalid prefix'); }
    let _amount = sc_0.loadIntBig(257);
    let _receiver = sc_0.loadAddress();
    return { $$type: 'Mint' as const, amount: _amount, receiver: _receiver };
}

function loadTupleMint(source: TupleReader) {
    let _amount = source.readBigNumber();
    let _receiver = source.readAddress();
    return { $$type: 'Mint' as const, amount: _amount, receiver: _receiver };
}

function storeTupleMint(source: Mint) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.amount);
    builder.writeAddress(source.receiver);
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

export type JettonData = {
    $$type: 'JettonData';
    totalSupply: bigint;
    mintable: boolean;
    owner: Address;
    content: Cell;
    walletCode: Cell;
}

export function storeJettonData(src: JettonData) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeInt(src.totalSupply, 257);
        b_0.storeBit(src.mintable);
        b_0.storeAddress(src.owner);
        b_0.storeRef(src.content);
        b_0.storeRef(src.walletCode);
    };
}

export function loadJettonData(slice: Slice) {
    let sc_0 = slice;
    let _totalSupply = sc_0.loadIntBig(257);
    let _mintable = sc_0.loadBit();
    let _owner = sc_0.loadAddress();
    let _content = sc_0.loadRef();
    let _walletCode = sc_0.loadRef();
    return { $$type: 'JettonData' as const, totalSupply: _totalSupply, mintable: _mintable, owner: _owner, content: _content, walletCode: _walletCode };
}

function loadTupleJettonData(source: TupleReader) {
    let _totalSupply = source.readBigNumber();
    let _mintable = source.readBoolean();
    let _owner = source.readAddress();
    let _content = source.readCell();
    let _walletCode = source.readCell();
    return { $$type: 'JettonData' as const, totalSupply: _totalSupply, mintable: _mintable, owner: _owner, content: _content, walletCode: _walletCode };
}

function storeTupleJettonData(source: JettonData) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.totalSupply);
    builder.writeBoolean(source.mintable);
    builder.writeAddress(source.owner);
    builder.writeCell(source.content);
    builder.writeCell(source.walletCode);
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
    walletCode: Cell;
}

export function storeJettonWalletData(src: JettonWalletData) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeInt(src.balance, 257);
        b_0.storeAddress(src.owner);
        b_0.storeAddress(src.master);
        b_0.storeRef(src.walletCode);
    };
}

export function loadJettonWalletData(slice: Slice) {
    let sc_0 = slice;
    let _balance = sc_0.loadIntBig(257);
    let _owner = sc_0.loadAddress();
    let _master = sc_0.loadAddress();
    let _walletCode = sc_0.loadRef();
    return { $$type: 'JettonWalletData' as const, balance: _balance, owner: _owner, master: _master, walletCode: _walletCode };
}

function loadTupleJettonWalletData(source: TupleReader) {
    let _balance = source.readBigNumber();
    let _owner = source.readAddress();
    let _master = source.readAddress();
    let _walletCode = source.readCell();
    return { $$type: 'JettonWalletData' as const, balance: _balance, owner: _owner, master: _master, walletCode: _walletCode };
}

function storeTupleJettonWalletData(source: JettonWalletData) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.balance);
    builder.writeAddress(source.owner);
    builder.writeAddress(source.master);
    builder.writeCell(source.walletCode);
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

export type TokenTransfer = {
    $$type: 'TokenTransfer';
    queryId: bigint;
    amount: bigint;
    destination: Address;
    response_destination: Address;
    custom_payload: Cell | null;
    forward_ton_amount: bigint;
    forward_payload: Cell;
}

export function storeTokenTransfer(src: TokenTransfer) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(260734629, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeCoins(src.amount);
        b_0.storeAddress(src.destination);
        b_0.storeAddress(src.response_destination);
        if (src.custom_payload !== null && src.custom_payload !== undefined) { b_0.storeBit(true).storeRef(src.custom_payload); } else { b_0.storeBit(false); }
        b_0.storeCoins(src.forward_ton_amount);
        b_0.storeBuilder(src.forward_payload.asBuilder());
    };
}

export function loadTokenTransfer(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 260734629) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    let _amount = sc_0.loadCoins();
    let _destination = sc_0.loadAddress();
    let _response_destination = sc_0.loadAddress();
    let _custom_payload = sc_0.loadBit() ? sc_0.loadRef() : null;
    let _forward_ton_amount = sc_0.loadCoins();
    let _forward_payload = sc_0.asCell();
    return { $$type: 'TokenTransfer' as const, queryId: _queryId, amount: _amount, destination: _destination, response_destination: _response_destination, custom_payload: _custom_payload, forward_ton_amount: _forward_ton_amount, forward_payload: _forward_payload };
}

function loadTupleTokenTransfer(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _amount = source.readBigNumber();
    let _destination = source.readAddress();
    let _response_destination = source.readAddress();
    let _custom_payload = source.readCellOpt();
    let _forward_ton_amount = source.readBigNumber();
    let _forward_payload = source.readCell();
    return { $$type: 'TokenTransfer' as const, queryId: _queryId, amount: _amount, destination: _destination, response_destination: _response_destination, custom_payload: _custom_payload, forward_ton_amount: _forward_ton_amount, forward_payload: _forward_payload };
}

function storeTupleTokenTransfer(source: TokenTransfer) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeNumber(source.amount);
    builder.writeAddress(source.destination);
    builder.writeAddress(source.response_destination);
    builder.writeCell(source.custom_payload);
    builder.writeNumber(source.forward_ton_amount);
    builder.writeSlice(source.forward_payload);
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
    response_destination: Address;
    forward_ton_amount: bigint;
    forward_payload: Cell;
}

export function storeTokenTransferInternal(src: TokenTransferInternal) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(395134233, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeCoins(src.amount);
        b_0.storeAddress(src.from);
        b_0.storeAddress(src.response_destination);
        b_0.storeCoins(src.forward_ton_amount);
        b_0.storeBuilder(src.forward_payload.asBuilder());
    };
}

export function loadTokenTransferInternal(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 395134233) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    let _amount = sc_0.loadCoins();
    let _from = sc_0.loadAddress();
    let _response_destination = sc_0.loadAddress();
    let _forward_ton_amount = sc_0.loadCoins();
    let _forward_payload = sc_0.asCell();
    return { $$type: 'TokenTransferInternal' as const, queryId: _queryId, amount: _amount, from: _from, response_destination: _response_destination, forward_ton_amount: _forward_ton_amount, forward_payload: _forward_payload };
}

function loadTupleTokenTransferInternal(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _amount = source.readBigNumber();
    let _from = source.readAddress();
    let _response_destination = source.readAddress();
    let _forward_ton_amount = source.readBigNumber();
    let _forward_payload = source.readCell();
    return { $$type: 'TokenTransferInternal' as const, queryId: _queryId, amount: _amount, from: _from, response_destination: _response_destination, forward_ton_amount: _forward_ton_amount, forward_payload: _forward_payload };
}

function storeTupleTokenTransferInternal(source: TokenTransferInternal) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeNumber(source.amount);
    builder.writeAddress(source.from);
    builder.writeAddress(source.response_destination);
    builder.writeNumber(source.forward_ton_amount);
    builder.writeSlice(source.forward_payload);
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
    forward_payload: Cell;
}

export function storeTokenNotification(src: TokenNotification) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1935855772, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeCoins(src.amount);
        b_0.storeAddress(src.from);
        b_0.storeBuilder(src.forward_payload.asBuilder());
    };
}

export function loadTokenNotification(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1935855772) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    let _amount = sc_0.loadCoins();
    let _from = sc_0.loadAddress();
    let _forward_payload = sc_0.asCell();
    return { $$type: 'TokenNotification' as const, queryId: _queryId, amount: _amount, from: _from, forward_payload: _forward_payload };
}

function loadTupleTokenNotification(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _amount = source.readBigNumber();
    let _from = source.readAddress();
    let _forward_payload = source.readCell();
    return { $$type: 'TokenNotification' as const, queryId: _queryId, amount: _amount, from: _from, forward_payload: _forward_payload };
}

function storeTupleTokenNotification(source: TokenNotification) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeNumber(source.amount);
    builder.writeAddress(source.from);
    builder.writeSlice(source.forward_payload);
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
    response_destination: Address;
}

export function storeTokenBurn(src: TokenBurn) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1499400124, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeCoins(src.amount);
        b_0.storeAddress(src.owner);
        b_0.storeAddress(src.response_destination);
    };
}

export function loadTokenBurn(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1499400124) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    let _amount = sc_0.loadCoins();
    let _owner = sc_0.loadAddress();
    let _response_destination = sc_0.loadAddress();
    return { $$type: 'TokenBurn' as const, queryId: _queryId, amount: _amount, owner: _owner, response_destination: _response_destination };
}

function loadTupleTokenBurn(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _amount = source.readBigNumber();
    let _owner = source.readAddress();
    let _response_destination = source.readAddress();
    return { $$type: 'TokenBurn' as const, queryId: _queryId, amount: _amount, owner: _owner, response_destination: _response_destination };
}

function storeTupleTokenBurn(source: TokenBurn) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeNumber(source.amount);
    builder.writeAddress(source.owner);
    builder.writeAddress(source.response_destination);
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
    response_destination: Address | null;
}

export function storeTokenBurnNotification(src: TokenBurnNotification) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2078119902, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeCoins(src.amount);
        b_0.storeAddress(src.owner);
        b_0.storeAddress(src.response_destination);
    };
}

export function loadTokenBurnNotification(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2078119902) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    let _amount = sc_0.loadCoins();
    let _owner = sc_0.loadAddress();
    let _response_destination = sc_0.loadMaybeAddress();
    return { $$type: 'TokenBurnNotification' as const, queryId: _queryId, amount: _amount, owner: _owner, response_destination: _response_destination };
}

function loadTupleTokenBurnNotification(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _amount = source.readBigNumber();
    let _owner = source.readAddress();
    let _response_destination = source.readAddressOpt();
    return { $$type: 'TokenBurnNotification' as const, queryId: _queryId, amount: _amount, owner: _owner, response_destination: _response_destination };
}

function storeTupleTokenBurnNotification(source: TokenBurnNotification) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeNumber(source.amount);
    builder.writeAddress(source.owner);
    builder.writeAddress(source.response_destination);
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
    content: Cell;
}

export function storeTokenUpdateContent(src: TokenUpdateContent) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2937889386, 32);
        b_0.storeRef(src.content);
    };
}

export function loadTokenUpdateContent(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2937889386) { throw Error('Invalid prefix'); }
    let _content = sc_0.loadRef();
    return { $$type: 'TokenUpdateContent' as const, content: _content };
}

function loadTupleTokenUpdateContent(source: TupleReader) {
    let _content = source.readCell();
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

export type ProvideWalletAddress = {
    $$type: 'ProvideWalletAddress';
    query_id: bigint;
    owner_address: Address;
    include_address: boolean;
}

export function storeProvideWalletAddress(src: ProvideWalletAddress) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(745978227, 32);
        b_0.storeUint(src.query_id, 64);
        b_0.storeAddress(src.owner_address);
        b_0.storeBit(src.include_address);
    };
}

export function loadProvideWalletAddress(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 745978227) { throw Error('Invalid prefix'); }
    let _query_id = sc_0.loadUintBig(64);
    let _owner_address = sc_0.loadAddress();
    let _include_address = sc_0.loadBit();
    return { $$type: 'ProvideWalletAddress' as const, query_id: _query_id, owner_address: _owner_address, include_address: _include_address };
}

function loadTupleProvideWalletAddress(source: TupleReader) {
    let _query_id = source.readBigNumber();
    let _owner_address = source.readAddress();
    let _include_address = source.readBoolean();
    return { $$type: 'ProvideWalletAddress' as const, query_id: _query_id, owner_address: _owner_address, include_address: _include_address };
}

function storeTupleProvideWalletAddress(source: ProvideWalletAddress) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.query_id);
    builder.writeAddress(source.owner_address);
    builder.writeBoolean(source.include_address);
    return builder.build();
}

function dictValueParserProvideWalletAddress(): DictionaryValue<ProvideWalletAddress> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeProvideWalletAddress(src)).endCell());
        },
        parse: (src) => {
            return loadProvideWalletAddress(src.loadRef().beginParse());
        }
    }
}

export type TakeWalletAddress = {
    $$type: 'TakeWalletAddress';
    query_id: bigint;
    wallet_address: Address;
    owner_address: Cell | null;
}

export function storeTakeWalletAddress(src: TakeWalletAddress) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(3513996288, 32);
        b_0.storeUint(src.query_id, 64);
        b_0.storeAddress(src.wallet_address);
        if (src.owner_address !== null && src.owner_address !== undefined) { b_0.storeBit(true).storeRef(src.owner_address); } else { b_0.storeBit(false); }
    };
}

export function loadTakeWalletAddress(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 3513996288) { throw Error('Invalid prefix'); }
    let _query_id = sc_0.loadUintBig(64);
    let _wallet_address = sc_0.loadAddress();
    let _owner_address = sc_0.loadBit() ? sc_0.loadRef() : null;
    return { $$type: 'TakeWalletAddress' as const, query_id: _query_id, wallet_address: _wallet_address, owner_address: _owner_address };
}

function loadTupleTakeWalletAddress(source: TupleReader) {
    let _query_id = source.readBigNumber();
    let _wallet_address = source.readAddress();
    let _owner_address = source.readCellOpt();
    return { $$type: 'TakeWalletAddress' as const, query_id: _query_id, wallet_address: _wallet_address, owner_address: _owner_address };
}

function storeTupleTakeWalletAddress(source: TakeWalletAddress) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.query_id);
    builder.writeAddress(source.wallet_address);
    builder.writeCell(source.owner_address);
    return builder.build();
}

function dictValueParserTakeWalletAddress(): DictionaryValue<TakeWalletAddress> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeTakeWalletAddress(src)).endCell());
        },
        parse: (src) => {
            return loadTakeWalletAddress(src.loadRef().beginParse());
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
    const __code = Cell.fromBase64('te6ccgECHQEABbUAART/APSkE/S88sgLAQIBYgIDA3jQAdDTAwFxsKMB+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiFRQUwNvBPhhAvhi2zxa2zzy4IIaBAUCASAREgTkAY4wgCDXIXAh10nCH5UwINcLH96CEAuml1G6jhPTHwGCEAuml1G68uCB+gABMTB/4DB/4HAh10nCH5UwINcLH94gwAAi10nBIbCSW3/gIIIQC6aXUbrjAiCCEP35b066jwgw2zxsF9s8f+CCEJRqmLa6BgcICQCWyPhDAcx/AcoAWVkg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxYBINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8Wye1UA4Yw0x8BghALppdRuvLggfoAATFZ2zyBPJ74J28QggnJw4C88vT4QvgnbxCCCcnDgKFQBLYIgEJ/iBBGFEMwbW3bPAF/CgsPAMbTHwGCEP35b0668uCB+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiAH6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIAfoA+gDUAdDT/9IA0gAwEDcQNhA1EDQC2IIA7lv4J28QJoIJycOAoLzy9PhDRzMH2zxccFnIcAHLAXMBywFwAcsAEszMyfkAyHIBywFwAcsAEsoHy//J0CDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgkggnJw4Cgcn/4KBBJRxNQigwNAViOp9MfAYIQlGqYtrry4IHTPwExyAGCEK/5D1dYyx/LP8n4QgFwbds8f+AwcA4AEvhCUhDHBfLghABCAAAAAE1vbmV5IHN1Y2Nlc3NmdWxseSB3aXRoZHJhd2VkAK4D0PQEMG0BggC5AQGAEPQPb6Hy4IcBggC5ASICgBD0F8gByPQAyQHMcAHKAFUgBFog10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxYSgQEBzwDKAMkC4MhVQIIQ/xLaslAGyx9QBCDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFlgg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxYB+gIB+gLKAMkQVhA0AhA2EDUQNAHbPPhCcIBCf1UgbW1t2zwPDwE6bW0ibrOZWyBu8tCAbyIBkTLiECRwAwSAQlAj2zwPAcrIcQHKAVAHAcoAcAHKAlAFINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WUAP6AnABymgjbrORf5MkbrPilzMzAXABygDjDSFus5x/AcoAASBu8tCAAcyVMXABygDiyQH7ABAAmH8BygDIcAHKAHABygAkbrOdfwHKAAQgbvLQgFAEzJY0A3ABygDiJG6znX8BygAEIG7y0IBQBMyWNANwAcoA4nABygACfwHKAALJWMwCEb4o7tnm2eNhDBoTAgEgFBUAAiAAubu9GCcFzsPV0srnsehOw51kqFG2aCcJ3WNS0rZHyzItOvLf3xYjmCcCBVwBuAZ2OUzlg6rkclssOCcJ2XTlqzTstzOg6WbZRm6KSCcEDOdWnnFfnSULAdYW4mR7KAIBIBYXAgEgGBkCEbcG22ebZ42EMBobABGwr7tRNDSAAGAAdbJu40NWlwZnM6Ly9RbVR4Z0hkenlLV0dtTDNxc3JKZGlRaGlXcGFXS1J5cGU4SDlHUlkzNDNBdkxDggAbTtRNDUAfhj0gABjkL6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIAfpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgSbBLg+CjXCwqDCbry4IkcAAj4J28QAIb6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIAfpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgSAtEB');
    const __system = Cell.fromBase64('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');
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
    3734: { message: `Not Owner` },
    4159: { message: `Invalid value!!` },
    4429: { message: `Invalid sender` },
    15518: { message: `Amount is too small` },
    17990: { message: `Only bet can increment` },
    18668: { message: `Can't Mint Anymore` },
    19255: { message: `Only current block` },
    37845: { message: `Invalid ID` },
    42708: { message: `Invalid sender!` },
    43422: { message: `Invalid value - Burn` },
    48121: { message: `Only Account Manager` },
    61019: { message: `Invalid Balance` },
    62972: { message: `Invalid balance` },
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
    {"name":"Mint","header":4235234258,"fields":[{"name":"amount","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"receiver","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"JettonData","header":null,"fields":[{"name":"totalSupply","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"mintable","type":{"kind":"simple","type":"bool","optional":false}},{"name":"owner","type":{"kind":"simple","type":"address","optional":false}},{"name":"content","type":{"kind":"simple","type":"cell","optional":false}},{"name":"walletCode","type":{"kind":"simple","type":"cell","optional":false}}]},
    {"name":"JettonWalletData","header":null,"fields":[{"name":"balance","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"owner","type":{"kind":"simple","type":"address","optional":false}},{"name":"master","type":{"kind":"simple","type":"address","optional":false}},{"name":"walletCode","type":{"kind":"simple","type":"cell","optional":false}}]},
    {"name":"TokenTransfer","header":260734629,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"destination","type":{"kind":"simple","type":"address","optional":false}},{"name":"response_destination","type":{"kind":"simple","type":"address","optional":false}},{"name":"custom_payload","type":{"kind":"simple","type":"cell","optional":true}},{"name":"forward_ton_amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"forward_payload","type":{"kind":"simple","type":"slice","optional":false,"format":"remainder"}}]},
    {"name":"TokenTransferInternal","header":395134233,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"from","type":{"kind":"simple","type":"address","optional":false}},{"name":"response_destination","type":{"kind":"simple","type":"address","optional":false}},{"name":"forward_ton_amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"forward_payload","type":{"kind":"simple","type":"slice","optional":false,"format":"remainder"}}]},
    {"name":"TokenNotification","header":1935855772,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"from","type":{"kind":"simple","type":"address","optional":false}},{"name":"forward_payload","type":{"kind":"simple","type":"slice","optional":false,"format":"remainder"}}]},
    {"name":"TokenBurn","header":1499400124,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"owner","type":{"kind":"simple","type":"address","optional":false}},{"name":"response_destination","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"TokenBurnNotification","header":2078119902,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"owner","type":{"kind":"simple","type":"address","optional":false}},{"name":"response_destination","type":{"kind":"simple","type":"address","optional":true}}]},
    {"name":"TokenExcesses","header":3576854235,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"TokenUpdateContent","header":2937889386,"fields":[{"name":"content","type":{"kind":"simple","type":"cell","optional":false}}]},
    {"name":"ProvideWalletAddress","header":745978227,"fields":[{"name":"query_id","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"owner_address","type":{"kind":"simple","type":"address","optional":false}},{"name":"include_address","type":{"kind":"simple","type":"bool","optional":false}}]},
    {"name":"TakeWalletAddress","header":3513996288,"fields":[{"name":"query_id","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"wallet_address","type":{"kind":"simple","type":"address","optional":false}},{"name":"owner_address","type":{"kind":"simple","type":"cell","optional":true}}]},
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

const TONCheckBook_getters: ABIGetter[] = [
    {"name":"Balance","arguments":[],"returnType":{"kind":"simple","type":"int","optional":false,"format":257}},
    {"name":"owner","arguments":[],"returnType":{"kind":"simple","type":"address","optional":false}},
]

const TONCheckBook_receivers: ABIReceiver[] = [
    {"receiver":"internal","message":{"kind":"empty"}},
    {"receiver":"internal","message":{"kind":"typed","type":"Withdraw"}},
    {"receiver":"internal","message":{"kind":"typed","type":"ApplyBetMessage"}},
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
    
    async send(provider: ContractProvider, via: Sender, args: { value: bigint, bounce?: boolean| null | undefined }, message: null | Withdraw | ApplyBetMessage | Deploy) {
        
        let body: Cell | null = null;
        if (message === null) {
            body = new Cell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'Withdraw') {
            body = beginCell().store(storeWithdraw(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'ApplyBetMessage') {
            body = beginCell().store(storeApplyBetMessage(message)).endCell();
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