import CardComponent from '@components/Card';
import ProgressBarComponent from '@components/ProgressBar';
import { formatBytes, formatNumber } from '@utils/formater';
import {
    BookCheckIcon,
    BookCopyIcon,
    CalendarCheck2Icon,
    DatabaseBackup,
    ImagesIcon,
} from 'lucide-react';
import { useState } from 'react';
import styles from './status.module.scss';

export default function CurrentComponent(props: Props) {
    const [test, setTest] = useState(props);

    return (
        <div className={styles.Container}>
            <div className={styles.Header}>
                <h1 className={styles.Title}>Processo Atual ({props.title})</h1>
                <button
                    onClick={() => {
                        setTest({
                            ...(test || props),
                            bytes: (test || props).bytes + 53896,
                            current: {
                                ...(test || props).current,
                                bytes: (test || props).current.bytes + 53896,
                                chapter: (test || props).current.chapter + 1,
                                index: (test || props).current.index + 1,
                                images_total: (test || props).current.images_total + 8,
                                images_success: (test || props).current.images_success + 8,
                            },
                            chapters_success: (test || props).chapters_success + 1,
                            chapters_total: (test || props).chapters_total + 1,
                            images_success: (test || props).images_success + 8,
                            images_total: (test || props).images_total + 8,
                        });
                    }}
                >
                    Teste
                </button>
            </div>
            <div className={styles.Content}>
                <CardComponent
                    icon={<BookCopyIcon />}
                    label='Capítulo Atual'
                    value={`${(test || props).current.chapter} (${
                        (test || props).current.index + 1
                    } de ${(test || props).chapters_total})`}
                />
                <CardComponent
                    icon={<ImagesIcon />}
                    label='Imagens Atuais'
                    value={`${(test || props).current.images_total} (OK: ${
                        (test || props).current.images_success
                    } | ERRO: ${(test || props).current.images_error})`}
                />
                <CardComponent
                    icon={<DatabaseBackup />}
                    label='Tamanho Atual'
                    value={formatBytes((test || props).current.bytes)}
                />
                <CardComponent
                    icon={<BookCheckIcon />}
                    label='Capítulos'
                    value={`${(test || props).chapters_total} (OK: ${formatNumber(
                        (test || props).chapters_success
                    )} | E: ${(test || props).chapters_error} | P: ${formatNumber(
                        (test || props).chapters_total -
                            (test || props).chapters_success -
                            (test || props).chapters_error
                    )})`}
                />
                <CardComponent
                    icon={<ImagesIcon />}
                    label='Imagens'
                    value={`${formatNumber((test || props).images_total)} - ${formatBytes(
                        (test || props).bytes
                    )} (OK: ${formatNumber((test || props).images_success)} | E: ${formatNumber(
                        (test || props).images_error
                    )})`}
                />
                <CardComponent
                    icon={<CalendarCheck2Icon />}
                    label='Última Atualização'
                    value={(test || props).last_update}
                />
            </div>
            <ProgressBarComponent
                total={(test || props).chapters_total}
                values={[
                    { current: (test || props).chapters_error, color: '#ff4f4f' },
                    { current: (test || props).chapters_success, color: '#00ff9d' },
                ]}
            />
        </div>
    );
}

interface Props {
    title: string;
    last_update: string;
    bytes: number;
    current: {
        chapter: number;
        index: number;
        images_success: number;
        images_error: number;
        images_total: number;
        bytes: number;
    };
    images_success: number;
    images_error: number;
    images_total: number;
    chapters_success: number;
    chapters_total: number;
    chapters_error: number;
}
