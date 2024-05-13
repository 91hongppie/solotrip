import Logo from '@icon/logo.svg';
import Noti from '@icon/noti.svg';
import styles from './HomeHead.module.css';

const HomeHead = () => {
    return (
        <div className={styles.header}>
            <div style={{ marginLeft: 20, marginTop: 9, marginBottom: 9 }}>
                <Logo />
            </div>
            <div style={{ marginRight: 20 }}>
                <Noti />
            </div>
        </div>
    );
};

export default HomeHead;
