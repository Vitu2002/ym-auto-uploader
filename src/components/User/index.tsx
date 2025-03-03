import { useContent } from '@providers/ContentProvider';
import { StatusTypeEnum } from '@type/Content.types';
import { UserRolesEnum } from '@type/User.types';
import { imageUrl } from '@utils/formater';
import { LogOutIcon, PauseIcon, PlayIcon } from 'lucide-react';
import styles from './user.module.scss';

export default function UserComponent() {
    const { user, logoff, status, changeStatus } = useContent();

    return (
        <div className={styles.Container}>
            <img
                src={user?.avatar ? imageUrl(user.avatar) : 'https://github.com/Vitu2002.png'}
                alt='Avatar'
                className={styles.Avatar}
            />
            <div className={styles.Metadata}>
                <div className={styles.Name}>
                    <h1 className={styles.Username}>{user?.username || 'yumu-san'}</h1>
                    <span className={styles.DisplayName}>{user?.display_name || 'Yumu'}</span>
                    <button className={styles.Logout} onClick={logoff}>
                        Sair
                        <LogOutIcon />
                    </button>
                </div>
                <span className={styles.Role}>
                    {UserRolesEnum[user?.staff || user?.premium || 'MEMBER']}
                </span>
            </div>
            <div className={styles.Actions}>
                <div className={styles.Current} data-action={status}>
                    {StatusTypeEnum[status]}
                </div>
                <button
                    className={styles.Action}
                    data-action={status === 'paused' ? 'play' : 'pause'}
                    onClick={() => changeStatus(status === 'paused' ? 'idle' : 'paused')}
                >
                    {status === 'paused' ? (
                        <>
                            Continuar <PlayIcon />
                        </>
                    ) : (
                        <>
                            Pausar <PauseIcon />
                        </>
                    )}
                </button>
            </div>
        </div>
    );
}
