type StatusType = 'idle' | 'processing' | 'paused';
type WorkerFilter = '24h' | '7d' | '30d' | 'all';

interface WorkerData {
    queue: number;
    finished: number;
    chapters: number;
    images: number;
    bytes: number;
    last_update: string;
    filter: WorkerFilter;
}
