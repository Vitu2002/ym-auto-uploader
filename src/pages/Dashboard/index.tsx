import CurrentComponent from '@components/Current';
import StatusComponent from '@components/Status';
import UserComponent from '@components/User';
import styles from './dashboard.module.scss';

export default function DashboardPage() {
    return (
        <main className={styles.Main}>
            <UserComponent />
            <StatusComponent
                title='Worker Status (Vitu)'
                last_update='há 0 minutos'
                bytes={0}
                queued={0}
                finished={0}
                chapters={0}
                chapters_error={0}
                images={0}
                images_error={0}
            />
            <CurrentComponent
                title='Attack on Titan | ID: 74'
                current={{
                    chapter: 107,
                    index: 106,
                    bytes: 1294053,
                    images_total: 34,
                    images_success: 34,
                    images_error: 0,
                }}
                bytes={4592854}
                chapters_total={214}
                chapters_success={106}
                chapters_error={1}
                images_total={1294583}
                images_success={1294580}
                images_error={3}
                last_update='há 0 minutos'
            />
        </main>
    );
}
