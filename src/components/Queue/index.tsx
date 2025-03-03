import { useContent } from '@providers/ContentProvider';
import { BookDashedIcon, BookPlusIcon } from 'lucide-react';
import styles from './queue.module.scss';

export default function QueueComponent() {
    const { queue, openAddQueue } = useContent();

    return (
        <div className={styles.Container}>
            <h1 className={styles.Title}>Fila ({queue.queue.length})</h1>
            <button className={styles.Button} onClick={openAddQueue}>
                <BookPlusIcon />
                Adicionar obra à fila
            </button>
            <ul className={styles.Queue}>
                {!queue.queue.length ? (
                    <li className={styles.NoData}>
                        <BookDashedIcon /> Nenhuma obra na fila
                    </li>
                ) : (
                    queue.queue.map((item, index) => (
                        <li key={index} className={styles.Item}>
                            {JSON.stringify(item, null, 2)}
                        </li>
                    ))
                )}
            </ul>
        </div>
    );
}
