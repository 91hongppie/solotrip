'use client';
import { useState } from 'react';
import './globals.css';
import ConfirmContext from './_context/confirm/confirmContext';
import Confirm from './_components/Confirm/Confirm';

type ConfirmState = {
    message: string;
    okMessage: string;
    onClickOK: () => void;
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    const [state, setState] = useState<ConfirmState>();

    const confirm = ({ message, okMessage }: { message: string; okMessage: string }): Promise<boolean> => {
        return new Promise((resolve) => {
            setState({
                message: message,
                okMessage: okMessage,
                onClickOK: () => {
                    setState(undefined);
                    resolve(true);
                },
            });
        });
    };

    return (
        <html lang="ko">
            <body>
                <ConfirmContext.Provider value={{ confirm }}>
                    {children}
                    {state && <Confirm message={state.message} okMessage={state.okMessage} onClickOK={state.onClickOK} />}
                </ConfirmContext.Provider>
            </body>
        </html>
    );
}
