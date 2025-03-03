import axios from 'axios';

export default async function getUser(token: string): Promise<UserEntity | undefined> {
    try {
        const req = await axios.get('/users/@me', {
            headers: { Authorization: `Bearer ${token}` },
        });

        return req.data;
    } catch (err) {
        console.error(err);
        return;
    }
}
