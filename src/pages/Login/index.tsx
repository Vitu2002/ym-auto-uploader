import Input from '@components/Input';
import CenterLayout from '@layouts/Center';
import { AtSignIcon, LockIcon } from 'lucide-react';
import styles from './login.module.scss';

export default function LoginPage() {
    return (
        <CenterLayout maxWidth={400}>
            <h1 className={styles.Title}>Entrar</h1>
            <p className={styles.Description}>
                Use suas credenciais para entrar em sua conta Yomu.
            </p>
            <form>
                <Input
                    className={styles.Input}
                    label='E-mail'
                    type='email'
                    required
                    icon={<AtSignIcon />}
                    placeholder='seu@email.com'
                    title='E-mail'
                    placeholderMoviment='top'
                    maxLength={30}
                    style='bordered'
                />
                <Input
                    className={styles.Input}
                    label='Senha'
                    type='password'
                    required
                    icon={<LockIcon />}
                    placeholder='$u4S3n8@'
                    title='Senha'
                    placeholderMoviment='top'
                    maxLength={30}
                    style='bordered'
                />
                <button className={styles.Button}>Entrar</button>
            </form>
        </CenterLayout>
    );
}
