import { CSSProperties } from 'react';
import styles from './TitleHeader.module.css';

const TitleHeader = ({ children, title, titleStyle }: { children?: React.ReactNode; title?: string; titleStyle?: React.CSSProperties }) => {
    return (
        <div>
            <div className={styles.titleHeaderContainer} style={titleStyle}>
                {title}
            </div>
            <div className={styles.titleHeaderArea} />
            <div>{children}</div>
        </div>
    );
};

export default TitleHeader;
