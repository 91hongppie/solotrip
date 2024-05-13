'use client';
import HomeComponent from './_components/home/home';
import Clicekd_home from '@icon/clicked_home.svg';
import Unclicked_home from '@icon/unclicked_home.svg';
import Clicked_solplace from '@icon/clicked_solplace.svg';
import Unclicked_solplace from '@icon/unclicked_solplace.svg';

import styles from './main.module.css';
import { useEffect, useState } from 'react';

type pageNum = 0 | 1;

export default function Main() {
    const homeComponent = HomeComponent();
    const [tabNum, setTabNum] = useState<pageNum>(0);
    const [isHome, setIsHome] = useState<boolean>(true);

    useEffect(() => {
        setIsHome(tabNum == 0);
    }, [tabNum]);

    const homeClick = () => {
        setTabNum(0);
    };

    const solplaceClick = () => {
        setTabNum(1);
    };

    return (
        <>
            {isHome ? homeComponent : <span></span>}
            <div className={styles.footer}>
                <button type="button" style={{ width: '100%', justifyContent: 'center', display: 'flex' }} onClick={homeClick}>
                    {isHome ? <Clicekd_home /> : <Unclicked_home />}
                </button>
                <button type="button" style={{ width: '100%', justifyContent: 'center', display: 'flex' }} onClick={solplaceClick}>
                    {!isHome ? <Clicked_solplace /> : <Unclicked_solplace />}
                </button>
            </div>
        </>
    );
}
