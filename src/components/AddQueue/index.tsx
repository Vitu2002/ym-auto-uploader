import Input from '@components/Input';
import { useContent } from '@providers/ContentProvider';
import { useQuery } from '@tanstack/react-query';
import Search from '@utils/api/search';
import { imageUrl } from '@utils/formater';
import { SearchIcon, XIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import styles from './add.module.scss';

export default function AddQueueComponent() {
    const { access_token, closeAddQueue } = useContent();
    const [search, setSearch] = useState('');
    const [debouncedSearch, setDebouncedSearch] = useState('');
    const [current, setCurrent] = useState<MangaEntity | null>(null);
    const { data } = useQuery({
        queryKey: ['search', debouncedSearch],
        queryFn: async () => {
            const mangas = await Search(debouncedSearch, access_token || '');
            return mangas || [];
        },
        enabled: !!debouncedSearch,
    });

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearch(search);
        }, 2000);

        return () => clearTimeout(timer);
    }, [search]);

    return (
        <div className={styles.Component}>
            <div className={styles.Container}>
                <div className={styles.Header}>
                    <h1 className={styles.Title}>Adicionar obra</h1>
                    <button className={styles.Close} onClick={closeAddQueue}>
                        <XIcon />
                    </button>
                </div>
                <div className={styles.Content}>
                    <Input
                        className={styles.Input}
                        onChange={setSearch}
                        autoComplete='ym-search'
                        icon={<SearchIcon />}
                        maxLength={30}
                        placeholder='Digite o título da obra'
                        style='line'
                    />
                    <ul className={styles.List}>
                        {(current ? [current] : data ?? []).map(manga => (
                            <li
                                key={manga.id}
                                className={styles.Item}
                                onClick={current ? () => setCurrent(null) : () => setCurrent(manga)}
                                data-active={current?.id === manga.id}
                            >
                                <img
                                    className={styles.Cover}
                                    src={imageUrl(manga.cover || 's3://mangas/cover.avif')}
                                    alt='Cover'
                                />
                                <div className={styles.Manga}>
                                    <h2 className={styles.Title}>ID: {manga.id}</h2>
                                    <h2 className={styles.Title}>{manga.title}</h2>
                                    <span className={styles.Status}>{manga.status}</span>
                                    <span className={styles.Type}>{manga.type}</span>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}
