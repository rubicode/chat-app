import { request } from '../../api';

export const fetchLoadChat = async (sender: string, receiver: string) => {
    try {
        const { data } = await request.get('/chats', { params: { sender, receiver } });
        return data
    } catch (e) {
        console.log(e)
    }
}

export const fetchAddChat = async (message: Message) => {
    try {
        const { data } = await request.post('/chats', message);
        return data
    } catch (e) {
        console.log(e)
    }
}