import { request } from '../../api';

export const fetchLoadUser = async (sender: string) => {
    try {
        const { data } = await request.get('/users', { params: { sender } });
        return data.users
    } catch (e) {
        console.log(e)
    }
}