'use client';
import { useRouter } from 'next/navigation';
import styles from './ reqLogin.module.css';
import { currentTab } from '../_stores/userStore';

export default function ReqLoginPage() {
    const { setTab } = currentTab();
    const router = useRouter();

    const moveToLogin = () => {
        setTab(0);
        router.push('/main');
    };

    return (
        <div className={styles.container}>
            <button type="button" className={styles.reqLoginButton} onClick={moveToLogin}>
                로그인 해주세요
            </button>
        </div>
    );
}
