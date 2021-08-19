import axios from 'axios';
import { apiUrl } from '@/env';
import {
    IClients,
    IAccountTypes,
  } from './interfaces';

export const api = {
    async getClients() {
        return axios.get<IClients>(`${apiUrl}/clients`);
    },
    async getAccounts() {
        return axios.get<IAccountTypes>(`${apiUrl}/accounts`);
    },
    async getClientAccounts(id: string) {
        return axios.get<IAccountTypes>(`${apiUrl}/accounts?client=`+id);
    },
};