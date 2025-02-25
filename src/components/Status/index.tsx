import CardComponent from '@components/Card';
import { formatBytes, formatNumber } from '@utils/formater';
import {
    BookCheckIcon,
    BookCopyIcon,
    BookImageIcon,
    BookMarkedIcon,
    CalendarCheck2Icon,
    DatabaseIcon,
} from 'lucide-react';
import { useState } from 'react';
import styles from './status.module.scss';

export default function StatusComponent(props: Props) {
    const [filter, setFilter] = useState<FilterType>('24h');
    return (
        <div className={styles.Container}>
            <div className={styles.Header}>
                <h1 className={styles.Title}>{props.title}</h1>
                <div className={styles.Actions}>
                    <button
                        className={styles.Action}
                        onClick={() => setFilter('24h')}
                        data-active={filter === '24h'}
                    >
                        24h
                    </button>
                    <button
                        className={styles.Action}
                        onClick={() => setFilter('7d')}
                        data-active={filter === '7d'}
                    >
                        7d
                    </button>
                    <button
                        className={styles.Action}
                        onClick={() => setFilter('30d')}
                        data-active={filter === '30d'}
                    >
                        30d
                    </button>
                    <button
                        className={styles.Action}
                        onClick={() => setFilter('all')}
                        data-active={filter === 'all'}
                    >
                        Tudo
                    </button>
                </div>
            </div>
            <div className={styles.Content}>
                <CardComponent
                    icon={<BookCopyIcon />}
                    label='Fila'
                    value={formatNumber(props.queued)}
                />
                <CardComponent
                    icon={<BookMarkedIcon />}
                    label='Capítulos'
                    value={formatNumber(props.chapters)}
                />
                <CardComponent
                    icon={<BookImageIcon />}
                    label='Imagens'
                    value={formatNumber(props.images)}
                />
                <CardComponent
                    icon={<BookCheckIcon />}
                    label='Finalizados'
                    value={formatNumber(props.finished)}
                />
                <CardComponent
                    icon={<DatabaseIcon />}
                    label='Tamanho'
                    value={formatBytes(props.bytes)}
                />
                <CardComponent
                    icon={<CalendarCheck2Icon />}
                    label='Última Atualização'
                    value={props.last_update}
                />
            </div>
        </div>
    );
}

interface Props {
    title: string;
    last_update: string;
    bytes: number;
    finished: number;
    queued: number;
    images: number;
    images_error: number;
    chapters: number;
    chapters_error: number;
}

type FilterType = '24h' | '7d' | '30d' | 'all';
