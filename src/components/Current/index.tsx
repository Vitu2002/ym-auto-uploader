import CardComponent from '@components/Card';
import ProgressBarComponent from '@components/ProgressBar';
import { useContent } from '@providers/ContentProvider';
import { formatBytes } from '@utils/formater';
import { BookCopyIcon, DatabaseBackup, ImagesIcon } from 'lucide-react';
import styles from './status.module.scss';

export default function CurrentComponent() {
    const {
        queue: { current },
    } = useContent();
    const c_index = current?.chapters.findIndex(c => c.id === current.current_chapter) ?? -1;
    const chapter = c_index === -1 ? null : current?.chapters[c_index] || null;

    return (
        <div className={styles.Container}>
            <div className={styles.Header}>
                <h1 className={styles.Title}>
                    {current?.title ? `Processando ${current.title}` : 'Aguardando...'}
                </h1>
            </div>
            <ProgressBarComponent
                total={current?.chapters.length || 0}
                values={
                    current?.chapters
                        ? [
                              {
                                  current: current.stats.chapters.error,
                                  color: '#ff4f4f',
                              },
                              {
                                  current: current.stats.chapters.success,
                                  color: '#00ff9d',
                              },
                          ]
                        : []
                }
            />
            <div className={styles.Content}>
                <CardComponent
                    icon={<BookCopyIcon />}
                    label='Capítulo'
                    value={
                        current && chapter
                            ? `${chapter.chapter} (${c_index + 1} de ${current.chapters.length})`
                            : 'Aguardando...'
                    }
                />
                <CardComponent
                    icon={<ImagesIcon />}
                    label='Imagens'
                    value={
                        current
                            ? `${current.stats.images.total} (S: ${current.stats.images.success}| E: ${current.stats.images.error})`
                            : 'Aguardando...'
                    }
                />
                <CardComponent
                    icon={<DatabaseBackup />}
                    label='Armazenamento'
                    value={formatBytes(current?.stats.bytes || 0)}
                />
            </div>
            {chapter && (
                <div className={styles.Chapter}>
                    <div className={styles.Header}>
                        <h1 className={styles.Title}>
                            {current?.title ? `Processando ${current.title}` : 'Aguardando...'}
                        </h1>
                    </div>
                </div>
            )}
        </div>
    );
}
