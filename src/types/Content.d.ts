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

interface QueueData {
    current: UploadData | null;
    queue: UploadData[];
    finished: UploadData[];
}

interface UploadData {
    id: string;
    title: string;
    api_id: string;
    slug: string;
    cover: string;
    queued_at: string;
    started_at: string | null;
    finished_at: string | null;
    path: string;
    stats: UploadStatusData;
    chapters: UploadChapterData[];
    current_chapter: string;
}

interface UploadStatusData extends UploadChapterStatsData {
    chapters: {
        total: number;
        success: number;
        error: number;
    };
}

type UploadStatus = 'QUEUED' | 'FINISHED' | 'CANCELLED' | 'PROCESSING';

interface UploadChapterData {
    id: string;
    api_id: number;
    chapter: number;
    title: string | null;
    volume: number | null;
    path: string;
    stats: UploadChapterStatsData;
    started_at: string | null;
    finished_at: string | null;
}

interface UploadChapterStatsData {
    images: {
        total: number;
        success: number;
        error: number;
    };
    bytes: number;
    status: UploadStatus;
}

interface MangaEntity {
    id: number;
    title: string;
    slug: string;
    cover: string | null;
    visible: boolean;
    status: string;
    type: string;
}