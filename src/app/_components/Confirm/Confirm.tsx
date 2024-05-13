import styles from './Confirm.module.css';
interface Props {
    message: string;
    okMessage: string;
    onClickOK: () => void;
}

const Confirm = ({ message, okMessage, onClickOK }: Props) => {
    return (
        <div className={styles.confirmBackground}>
            <div className={styles.confirmContainer}>
                <div className={styles.messageContainer}>
                    <span className={styles.messageText}>{message}</span>
                </div>
                <div className={styles.divider} />
                <div className={styles.buttonContainer}>
                    <button onClick={onClickOK} className={styles.button}>
                        {okMessage}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Confirm;
