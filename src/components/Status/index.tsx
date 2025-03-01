import CardComponent from '@components/Card';
import { useContent } from '@providers/ContentProvider';
import { formatBytes, formatNumber } from '@utils/formater';
import {
    BookCheckIcon,
    BookCopyIcon,
    BookImageIcon,
    BookMarkedIcon,
    CalendarCheck2Icon,
    DatabaseIcon,
} from 'lucide-react';
import styles from './status.module.scss';

export default function StatusComponent() {
    const { worker, changeWorkerFilter } = useContent();

    return (
        <div className={styles.Container}>
            <div className={styles.Header}>
                <h1 className={styles.Title}>Status Gerais</h1>
                <div className={styles.Actions}>
                    <button
                        className={styles.Action}
                        onClick={() => changeWorkerFilter('24h')}
                        data-active={worker.filter === '24h'}
                    >
                        24h
                    </button>
                    <button
                        className={styles.Action}
                        onClick={() => changeWorkerFilter('7d')}
                        data-active={worker.filter === '7d'}
                    >
                        7d
                    </button>
                    <button
                        className={styles.Action}
                        onClick={() => changeWorkerFilter('30d')}
                        data-active={worker.filter === '30d'}
                    >
                        30d
                    </button>
                    <button
                        className={styles.Action}
                        onClick={() => changeWorkerFilter('all')}
                        data-active={worker.filter === 'all'}
                    >
                        Tudo
                    </button>
                </div>
            </div>
            <div className={styles.Content}>
                <CardComponent
                    icon={<BookCopyIcon />}
                    label='Fila'
                    value={formatNumber(worker.queue)}
                />
                <CardComponent
                    icon={<BookMarkedIcon />}
                    label='Capítulos'
                    value={formatNumber(worker.chapters)}
                />
                <CardComponent
                    icon={<BookImageIcon />}
                    label='Imagens'
                    value={formatNumber(worker.images)}
                />
                <CardComponent
                    icon={<BookCheckIcon />}
                    label='Finalizados'
                    value={formatNumber(worker.finished)}
                />
                <CardComponent
                    icon={<DatabaseIcon />}
                    label='Tamanho'
                    value={formatBytes(worker.bytes)}
                />
                <CardComponent
                    icon={<CalendarCheck2Icon />}
                    label='Última Atualização'
                    value={worker.last_update}
                />
            </div>
        </div>
    );
}
