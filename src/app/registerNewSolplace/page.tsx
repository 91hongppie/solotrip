'use client';
import { useEffect, useState } from 'react';
import TitleHeader from '../_components/TitleHeader/TitleHeader';
import Close from '@icon/close.svg';
import Search from '@icon/search.svg';
import styles from './registerNewSolplace.module.css';
import { currentNewSolplace } from '../_stores/solplaceStore';
import { useRouter } from 'next/navigation';
import { currentUser } from '../_stores/userStore';

export default function RegisterNewSolplace() {
    const router = useRouter();
    const { user } = currentUser();
    const [solplaceName, setSolplaceName] = useState('');
    const [solplaceAddress, setSolplaceAddress] = useState('');

    const { newSolplace, setNewSolplace } = currentNewSolplace();
    const [isCheck, setIsCheck] = useState(false);

    useEffect(() => {
        if (user.accessToken) {
            return;
        }
        router.replace('/main');
    }, []);

    useEffect(() => {
        setIsCheck(false);
        if (solplaceAddress.length == 0 || solplaceName.length == 0) {
            return;
        }
        setIsCheck(true);
    }, [solplaceName, solplaceAddress]);

    const handleSolplaceName = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSolplaceName(e.target.value);
    };

    const handleSolplaceAddress = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSolplaceAddress(e.target.value);
    };

    const removeSolplaveName = () => {
        setSolplaceName('');
    };

    const removeSolplaceAddress = () => {
        setSolplaceAddress('');
    };

    const clickButton = () => {
        if (!isCheck) {
            return;
        }

        setNewSolplace({ ...newSolplace, solplaceName: solplaceName });
        router.replace('/registerSolplaceLog');
    };
    return (
        <>
            <TitleHeader title="새로운 솔플레이스 등록">
                <div className={styles.container}>
                    <div>
                        <div className={styles.inputTitle}>솔플레이스 이름</div>
                        <div style={{ height: '8px' }} />
                        <div className={styles.inputContainer}>
                            <input
                                type="text"
                                name="solplace_name"
                                id="solplace"
                                placeholder="솔플레이스 이름을 입력해 주세요."
                                value={solplaceName}
                                className={styles.input}
                                onChange={handleSolplaceName}
                            />
                            {solplaceName && (
                                <button type="button" onClick={removeSolplaveName}>
                                    <Close />
                                </button>
                            )}
                        </div>
                        <div className={styles.warningContainer}>
                            <span className={styles.highlight}>이름 없는 장소라면, 이름을 지워주세요.</span>
                            <span>Tip - 장소 이름 앞에 해당 지역의-읍,면,동을 넣어주세요.</span>
                            <span>{'예시) 한남동 천국의 계단'}</span>
                        </div>
                    </div>
                    <div style={{ height: 40 }} />
                    <div>
                        <div className={styles.inputTitle}>솔플레이스 주소</div>
                        <div style={{ height: '8px' }} />
                        <div className={styles.addressSearchContainer}>
                            <Search />
                            <input
                                type="text"
                                placeholder="솔플레이스 주소를 검색해 보세요."
                                className={styles.input}
                                value={solplaceAddress}
                                onChange={handleSolplaceAddress}
                            />
                            {solplaceAddress && (
                                <button type="button" onClick={removeSolplaceAddress}>
                                    <Close />
                                </button>
                            )}
                        </div>
                    </div>
                    <div className={isCheck ? styles.registerButton : styles.disableButton}>
                        <button type="button" className={isCheck ? styles.buttonText : styles.disableButtonText} onClick={clickButton}>
                            완료
                        </button>
                    </div>
                </div>
            </TitleHeader>
        </>
    );
}
