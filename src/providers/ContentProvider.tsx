import dayjs from 'dayjs';
import { createContext, useContext, useState } from 'react';

import { useQuery } from '@tanstack/react-query';
import getUser from '@utils/api/user';
import 'dayjs/locale/pt-br';
import RelativeTime from 'dayjs/plugin/relativeTime';
import { useCookies } from 'react-cookie';
import { toast } from 'react-toastify';
dayjs.extend(RelativeTime);
dayjs.locale('pt-br');

const ContentContext = createContext({} as ContentContextType);
const initialWorker: WorkerData = {
    queue: 0,
    finished: 0,
    chapters: 0,
    images: 0,
    bytes: 0,
    last_update: dayjs().toNow(),
    filter: '24h',
};

export const ContentProvider = ({ children }: { children: React.ReactNode }) => {
    const [status, setStatus] = useState<StatusType>('paused');
    const [worker, setWorker] = useState<WorkerData>(initialWorker);
    const [queue, setQueue] = useState<QueueData>({ current: null, queue: [], finished: [] });
    const [{ access_token }, setCookie] = useCookies(['access_token']);
    const [isAddQueueOpen, setIsAddQueueOpen] = useState(false);
    const { data: user, refetch } = useQuery({
        queryKey: ['user', `Bearer ${access_token}`],
        queryFn: () =>
            getUser(access_token).then(user => {
                if (!user) {
                    toast.error('Seu login expirou! Por favor, logue novamente.');
                    logoff();
                }
                return user;
            }),
        enabled: !!access_token,
    });

    const changeStatus = (status: StatusType) => setStatus(status);
    const logoff = () => {
        refetch();
        setCookie('access_token', '', { path: '/' });
        setStatus('paused');
        window.location.href = '/';
    };
    const changeWorkerFilter = (filter: WorkerFilter) =>
        setWorker(c => ({
            ...c,
            filter,
        }));
    const refreshQueue = () => setQueue(c => ({ ...c }));
    const closeAddQueue = () => setIsAddQueueOpen(false);
    const openAddQueue = () => setIsAddQueueOpen(true);

    return (
        <ContentContext.Provider
            value={{
                user,
                logoff,
                status,
                changeStatus,
                worker,
                changeWorkerFilter,
                queue,
                refreshQueue,
                access_token,
                closeAddQueue,
                openAddQueue,
                isAddQueueOpen,
            }}
        >
            {children}
        </ContentContext.Provider>
    );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useContent = () => {
    const context = useContext(ContentContext);
    if (!context) throw new Error('useContent must be used in a ContentProvider');
    return context;
};

interface ContentContextType {
    user: UserEntity | undefined;
    logoff: () => void;
    status: StatusType;
    changeStatus: (status: StatusType) => void;
    worker: WorkerData;
    changeWorkerFilter: (filter: WorkerFilter) => void;
    queue: QueueData;
    refreshQueue: () => void;
    access_token?: string;
    closeAddQueue: () => void;
    openAddQueue: () => void;
    isAddQueueOpen: boolean;
}
