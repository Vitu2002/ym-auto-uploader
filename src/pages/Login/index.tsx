import Input from '@components/Input';
import CenterLayout from '@layouts/Center';
import axios, { AxiosError } from 'axios';
import { AtSignIcon, LockIcon } from 'lucide-react';
import { useState, useTransition } from 'react';
import { useCookies } from 'react-cookie';
import { toast } from 'react-toastify';
import Turnstile from 'react-turnstile';
import styles from './login.module.scss';

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export default function LoginPage() {
    const [data, setData] = useState<LoginData>({
        email: '',
        password: '',
        captcha: '',
        remind: true,
    });
    const [loading, startLoading] = useTransition();
    const [cookie, setCookie] = useCookies(['access_token']);

    if (cookie.access_token) {
        window.location.href = '/dashboard';
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (loading)
            return toast.error('Calma! O Zoro ainda tá procurando o caminho certo pro seu login!');
        if (!data.email)
            return toast.error('Sem email? Isso é mais incompleto que o final de Hunter x Hunter!');
        if (!emailRegex.test(data.email))
            return toast.error('Esse email parece um genjutsu... Tenta de novo!');
        if (!data.password)
            return toast.error(
                'Sem senha? Isso aqui não é um shonen onde você ganha tudo no grito!'
            );
        if (data.password.length < 6)
            return toast.error('Até um Slime teria mais resistência que essa senha!');
        if (data.password.length > 32)
            return toast.error('Nem o L escreveria uma senha tão complexa assim!');
        if (!data.captcha)
            return toast.error('Sem o CAPTCHA? Tá achando que tu é o Eren invadindo Marley?');
        startLoading(async () => {
            const toastId = toast.loading('Entrando...');
            try {
                const req = await axios.post('/users/login', data);
                toast.update(toastId, {
                    render: 'Você passou pela Reverse Mountain!',
                    type: 'success',
                    isLoading: false,
                    autoClose: 3000,
                });
                setTimeout(() => {
                    setCookie('access_token', req.data.access_token, {
                        path: '/',
                        maxAge: 60 * 60 * 24 * 365, // 1 ano
                    });
                    window.location.href = '/dashboard';
                }, 3000);
            } catch (err) {
                switch ((err as AxiosError).status) {
                    case 401: {
                        toast.update(toastId, {
                            render: 'Nem a Mikasa conseguiria proteger esses dados errados!',
                            type: 'warning',
                            isLoading: false,
                            autoClose: 3000,
                        });
                        break;
                    }
                    case 500: {
                        toast.update(toastId, {
                            render: 'Algo deu muito errado... Talvez o Chopper precise dar uma olhada nisso.',
                            type: 'error',
                            isLoading: false,
                            autoClose: 3000,
                        });
                        break;
                    }
                    default: {
                        toast.update(toastId, {
                            render: 'Algo de errado não está certo...',
                            type: 'warning',
                            isLoading: false,
                            autoClose: 3000,
                        });
                        break;
                    }
                }
            }
        });
    };

    return (
        <CenterLayout maxWidth={400}>
            <h1 className={styles.Title}>Entrar</h1>
            <p className={styles.Description}>
                Use suas credenciais para entrar em sua conta Yomu.
            </p>
            <form onSubmit={handleSubmit}>
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
                    onChange={email => setData(c => ({ ...c, email }))}
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
                    onChange={password => setData(c => ({ ...c, password }))}
                />
                <Turnstile
                    className={styles.Turnstile}
                    theme='dark'
                    sitekey='1x00000000000000000000AA'
                    appearance='always'
                    fixedSize={true}
                    language='pt-br'
                    size={'normal'}
                    onVerify={captcha => setData(c => ({ ...c, captcha }))}
                />
                <button className={styles.Button}>{loading ? 'Entrando...' : 'Entrar'}</button>
            </form>
        </CenterLayout>
    );
}

interface LoginData {
    email: string;
    password: string;
    captcha: string;
    remind: true;
}
