import styles from './progress.module.scss';

export default function ProgressBarComponent({ values, total }: Props) {
    return (
        <div className={styles.Container}>
            <div className={styles.Track}>
                {values.map((value, i) => {
                    const percent = ((value.current / total) * 100).toFixed(2);

                    return (
                        <div
                            className={styles.Bar}
                            key={i}
                            style={{ width: `${percent}%`, backgroundColor: value.color }}
                        >
                            <span className={styles.Value} style={{ color: value.color }}>
                                {percent}% {(value.showValue && `(${value.current})`) || ''}
                            </span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

interface Props {
    values: {
        current: number;
        color: string;
        showValue?: boolean;
    }[];
    total: number;
}
