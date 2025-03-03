import axios from 'axios';

export default async function search(
    query: string,
    token: string
): Promise<MangaEntity[] | undefined> {
    try {
        const req = await axios.get('/mangas?includeInvisible=true&query=' + query, {
            headers: { Authorization: `Bearer ${token}` },
        });

        return req.data.mangas;
    } catch (err) {
        console.error(err);
        return;
    }
}
