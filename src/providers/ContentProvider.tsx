import { createContext, useContext, useState } from 'react';

const ContentContext = createContext({} as ContentContextType);

export const ContentProvider = ({ children }: { children: React.ReactNode }) => {
    const [status, setStatus] = useState<StatusType>('paused');
    const [user, setUser] = useState<UserEntity | null>(null);

    const changeStatus = (status: StatusType) => {
        setStatus(status);
    };

    const logoff = () => {
        setUser(null);
    };

    return (
        <ContentContext.Provider value={{ user, logoff, status, changeStatus }}>
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
}
