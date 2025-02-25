import styles from './center.module.scss';

export default function CenterLayout({ children, maxWidth }: Props) {
    return (
        <main className={styles.Main}>
            <div className={styles.Container} style={{ maxWidth }}>
                {children}
            </div>
        </main>
    );
}

interface Props {
    children: React.ReactNode;
    maxWidth?: string | number;
}
