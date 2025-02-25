import styles from './card.module.scss';

export default function CardComponent({ icon, label, value }: CardProps) {
    return (
        <div className={styles.Card}>
            <h2 className={styles.Label}>
                {icon}
                {label}
            </h2>
            <span className={styles.Value}>{value}</span>
        </div>
    );
}

interface CardProps {
    icon: React.ReactNode;
    label: string | React.ReactNode;
    value: string | React.ReactNode;
}
