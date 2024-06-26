'use client';

import Clicekd_home from '@icon/clicked_home.svg';
import Unclicked_home from '@icon/unclicked_home.svg';
import Clicked_solplace from '@icon/clicked_solplace.svg';
import Unclicked_solplace from '@icon/unclicked_solplace.svg';

import styles from './mainPage.module.css';
import { useEffect, useState } from 'react';
import SolplaceComponent from './_components/SolplaceComponent/SolplaceComponent';
import HomeComponent from './_components/HomeComponent/HomeComponent';
import { currentTab } from '../_stores/userStore';

type pageNum = 0 | 1;

export default function MainPage() {
    const { tab, setTab } = currentTab();
    const [isHome, setIsHome] = useState<boolean>(true);

    useEffect(() => {
        setIsHome(tab == 0);
    }, [tab]);

    const homeClick = () => {
        setTab(0);
    };

    const solplaceClick = () => {
        setTab(1);
    };

    return (
        <>
            {isHome ? <HomeComponent /> : <SolplaceComponent />}
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
