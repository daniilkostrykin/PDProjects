import api from '@/services/api';
import { NewPassRequest, PassRequest } from '@/types/pass-request';


export const PassRequestService = {
async list(): Promise<PassRequest[]> {
const { data } = await api.get('/passes');
return data;
},
async create(payload: NewPassRequest): Promise<PassRequest> {
const { data } = await api.post('/passes', payload);
return data;
},
};