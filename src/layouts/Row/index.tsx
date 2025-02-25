import styles from './row.module.scss';

export default function RowLayout({ children, gap }: Props) {
    return (
        <div className={styles.Row} style={{ gap }}>
            {children}
        </div>
    );
}
interface Props {
    children: React.ReactNode[];
    gap: number | string;
}
