import dayjs from 'dayjs';
import { createContext, useContext, useState } from 'react';

import 'dayjs/locale/pt-br';
import RelativeTime from 'dayjs/plugin/relativeTime';
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
    const [user, setUser] = useState<UserEntity | null>(null);

    const changeStatus = (status: StatusType) => setStatus(status);
    const logoff = () => setUser(null);
    const changeWorkerFilter = (filter: WorkerFilter) =>
        setWorker(c => ({
            ...c,
            filter,
        }));

    return (
        <ContentContext.Provider
            value={{ user, logoff, status, changeStatus, worker, changeWorkerFilter }}
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
    user: UserEntity | null;
    logoff: () => void;
    status: StatusType;
    changeStatus: (status: StatusType) => void;
    worker: WorkerData;
    changeWorkerFilter: (filter: WorkerFilter) => void;
}
