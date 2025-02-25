import { LogOutIcon, PauseIcon, PlayIcon } from 'lucide-react';
import styles from './user.module.scss';

export default function UserComponent() {
    return (
        <div className={styles.Container}>
            <img src='https://github.com/Vitu2002.png' alt='Avatar' className={styles.Avatar} />
            <div className={styles.Metadata}>
                <div className={styles.Name}>
                    <h1 className={styles.Username}>Vitu2002</h1>
                    <span className={styles.DisplayName}>Vitu</span>
                    <button className={styles.Logout}>
                        Sair
                        <LogOutIcon />
                    </button>
                </div>
                <span className={styles.Role}>Master</span>
            </div>
            <div className={styles.Actions}>
                <button className={styles.Action} data-action='pause'>
                    Pausar <PauseIcon />
                </button>
                <button className={styles.Action} data-action='play'>
                    Iniciar <PlayIcon />
                </button>
            </div>
        </div>
    );
}
