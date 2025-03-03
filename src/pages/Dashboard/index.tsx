import AddQueueComponent from '@components/AddQueue';
import CurrentComponent from '@components/Current';
import QueueComponent from '@components/Queue';
import StatusComponent from '@components/Status';
import UserComponent from '@components/User';
import { useContent } from '@providers/ContentProvider';
import { imageUrl } from '@utils/formater';
import styles from './dashboard.module.scss';

export default function DashboardPage() {
    const { user, isAddQueueOpen } = useContent();

    return (
        <main className={styles.Main}>
            {user && (
                <img
                    src={imageUrl(user.banner || user.wallpaper)}
                    alt='Banner'
                    className={styles.Banner}
                />
            )}
            <div className={styles.Content}>
                <UserComponent />
                <StatusComponent />
                <CurrentComponent />
                <QueueComponent />
                {isAddQueueOpen && <AddQueueComponent />}
            </div>
        </main>
    );
}
