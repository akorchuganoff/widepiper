import { useEffect, useState } from "react";
import { Address, fromNano } from "ton-core";
import { useTonConnect } from "../hooks/useTonConnect";
import { getTonWalletInfo } from "../hooks/getTonWalletInfo";
import { useAccountManagerContract } from "../hooks/useAccountManagerContract";
import {
    Card,
    FlexBoxCol,
    FlexBoxRow,
    Button,
    Ellipsis,
} from "./styled/styled";



export function AccountManager() {
    const { connected } = useTonConnect()
    const { wallet_address, ton_balance } = getTonWalletInfo()
    const { AccountManagerAddress, minterAddress, jettonWalletAddress, jettonBalance, TONCheckBookAddress, TONCheckBookBalance, admin_wallet_address, mint, create_bet, deploy, deploy_check_book, deposit_check_book, withdraw_check_book, create_new_block, new_bets, old_bets, win_bet, lose_bet } = useAccountManagerContract()

    const [round_amount, setRoundAmountValue] = useState(0);
    const [delta, setDeltaValue] = useState(0);
    const [deposit, setDepositValue] = useState('');
    const [win_bet_address, setWinValue] = useState('');
    const [lose_bet_address, setLoseValue] = useState('');
    const [course, setCourseValue] = useState('');

    const handleRoundAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setRoundAmountValue(Number(e.target.value));
    };

    const handleDeltaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDeltaValue(Number(e.target.value));
    };

    const handleDepositChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDepositValue(e.target.value);
    };

    const handleWINChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setWinValue(e.target.value);
    };

    const handleLoseChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLoseValue(e.target.value);
    };

    const handleCourseChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCourseValue(e.target.value);
    };

    const handleSubmitCreateBet = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); // Предотвращение стандартного поведения формы
        create_bet(delta); // Вызов функции с значением из состояния
        setRoundAmountValue(0); // Опционально: очистка поля ввода после отправки
        setDeltaValue(0);
    };

    const handleSubmitDeposit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); // Предотвращение стандартного поведения формы
        deposit_check_book(deposit); // Вызов функции с значением из состояния
        setDepositValue(''); // Опционально: очистка поля ввода после отправки
    };

    const handleSubmitWIN = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); // Предотвращение стандартного поведения формы
        win_bet(win_bet_address); // Вызов функции с значением из состояния
        setWinValue(''); // Опционально: очистка поля ввода после отправки
    };

    const handleSubmitLose = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); // Предотвращение стандартного поведения формы
        lose_bet(lose_bet_address); // Вызов функции с значением из состояния
        setLoseValue(''); // Опционально: очистка поля ввода после отправки
    };

    const handleSubmitCourse = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); // Предотвращение стандартного поведения формы
        create_new_block(course); // Вызов функции с значением из состояния
        setCourseValue(''); // Опционально: очистка поля ввода после отправки
    };

    return (
        <Card title="AccountManager">
            <FlexBoxCol>
                <h3>Account Manager</h3>

                <FlexBoxRow>
                    Admin address
                    <Ellipsis>{admin_wallet_address ? Address.parse(admin_wallet_address as string).toString() : "Loading..."}</Ellipsis>
                </FlexBoxRow>

                <FlexBoxRow>
                    Wallet address
                    <Ellipsis>{wallet_address ? Address.parse(wallet_address as string).toString() : "Loading..."}</Ellipsis>
                </FlexBoxRow>

                <FlexBoxRow>
                    Balance
                    <div>{ton_balance ?? "Loading..."}</div>
                </FlexBoxRow>

                <FlexBoxRow>
                    Account Manager Address
                    <Ellipsis>{AccountManagerAddress ? Address.parse(AccountManagerAddress as string).toString() : "Loading..."}</Ellipsis>
                </FlexBoxRow>

                <FlexBoxRow>
                    Minter Address
                    <Ellipsis>{minterAddress ? Address.parse(minterAddress as string).toString() : "Loading..."}</Ellipsis>
                </FlexBoxRow>

                <FlexBoxRow>
                    Jetton Wallet address
                    <Ellipsis>{jettonWalletAddress ? Address.parse(jettonWalletAddress as string).toString() : "Loading..."}</Ellipsis>
                </FlexBoxRow>

                <FlexBoxRow>
                    Jetton Balance
                    <div>{jettonBalance ?? "Loading..."}</div>
                </FlexBoxRow>

                <FlexBoxRow>
                    TonCheckBookAddress
                    <div>{TONCheckBookAddress ?? "Loading..."}</div>
                </FlexBoxRow>

                <FlexBoxRow>
                    TonCheckBookBalance
                    <div>{TONCheckBookBalance?.toString() ?? "Loading..."}</div>
                </FlexBoxRow>



                <Button
                    disabled={!connected} onClick={mint}>
                    Mint jettons
                </Button>
                <form onSubmit={handleSubmitCreateBet}>
                    <input
                        type="number"
                        value={delta}
                        onChange={handleDeltaChange}
                    />
                    <button type="submit">Create Bet</button>
                </form>


                <Button
                    disabled={!connected} onClick={deploy}>
                    Create Check Book
                </Button>

                <form onSubmit={handleSubmitDeposit}>
                    <input
                        type="text"
                        value={deposit}
                        onChange={handleDepositChange}
                    />
                    <button type="submit">Deposit Check Book</button>
                </form>

                <Button
                    disabled={!connected} onClick={withdraw_check_book}>
                    Withdraw Check Book
                </Button>

                <form onSubmit={handleSubmitCourse}>
                    <input
                        type="int"
                        value={course}
                        onChange={handleCourseChange}
                    />
                    <button type="submit">Create new block</button>
                </form>

                {/* <Button
                    disabled={!connected} onClick={create_new_block()}>
                    Create new block
                </Button> */}

                <form onSubmit={handleSubmitWIN}>
                    <input
                        type="text"
                        value={win_bet_address}
                        onChange={handleWINChange}
                    />
                    <button type="submit">Win bet</button>
                </form>

                <form onSubmit={handleSubmitLose}>
                    <input
                        type="text"
                        value={lose_bet_address}
                        onChange={handleLoseChange}
                    />
                    <button type="submit">Lose bet</button>
                </form>



            </FlexBoxCol>
            <FlexBoxCol>
                <div><h1>Cтавки в текущем блоке</h1>
                    {new_bets && new_bets.length > 0 ? (
                        new_bets.map((value, index) => (
                            <div key={index}>
                                <h3>{`Владелец: ${value.owner}`}</h3>
                                <p>{`Дельта: ${fromNano(Number(value.delta_r) / 1000)}`}</p>
                                <p>{`ID ставки: ${value.seqno}`}</p>
                                <p>{`Размер ставки: ${fromNano(value.bet_amount)}`}</p>
                                <p>{`Отрицательное значение: ${value.is_negative}`}</p>
                            </div>
                        ))
                    ) : (
                        <div>Значения отсутствуют или массив пуст.</div>
                    )}
                </div>
            </FlexBoxCol>
            <FlexBoxCol>
                <div><h1>Cтавки в Последнем заполненном блоке</h1>
                    {old_bets && old_bets.length > 0 ? (
                        old_bets.map((value, index) => (
                            <div key={index}>
                                <h3>{`Владелец: ${value.owner}`}</h3>
                                <p>{`Дельта: ${fromNano(Number(value.delta_r) / 1000)}`}</p>
                                <p>{`ID ставки: ${value.seqno}`}</p>
                                <p>{`Размер ставки: ${fromNano(value.bet_amount)}`}</p>
                                <p>{`Отрицательное значение: ${value.is_negative}`}</p>
                            </div>
                        ))
                    ) : (
                        <div>Значения отсутствуют или массив пуст.</div>
                    )}
                </div>
            </FlexBoxCol>
        </Card>

    );
}
