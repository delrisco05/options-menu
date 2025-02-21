import { DataInterface } from '@/interfaces';
import axios from 'axios';
import { httpMenu } from 'remoteShell/mf-axiosConfig';

const modulesAPI = "/permission";

export const updateModules = async (id: number, name: string, url: string, description?: string) => {
    try {
        const acces_token = localStorage.getItem('access_token');
        const ipResponse = await axios.get('https://api.ipify.org?format=json');
        const client_ip = ipResponse.data.ip;
        const client_datetime = formatClientDatetime();
        const updatedData = { "name": name, "description": description, "url": url };

        const response = await httpMenu.patch(`${modulesAPI}/${id}`, updatedData, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${acces_token}`,
                'client_ip': client_ip,
                'client_user': 'alexander.atehortua@sophossolutions.com',
                'client_datetime': client_datetime
            }
        });
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error('Axios error:', error.response?.data || error.message);
            throw new Error(error.response?.data?.error || 'Failed to deleted modules');
        } else {
            console.error('Unexpected error:', error);
            throw new Error('Failed to deleted modules');
        }
    }
};
export const moveModules = async (idFrom: number, idTo: number, level: number) => {
    try {
        const acces_token = localStorage.getItem('access_token');
        const ipResponse = await axios.get('https://api.ipify.org?format=json');
        const client_ip = ipResponse.data.ip;
        const client_datetime = formatClientDatetime();
        const updatedData = { "idParent": idTo, "level": level + 1 };

        const response = await httpMenu.patch(`${modulesAPI}/${idFrom}`, updatedData, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${acces_token}`,
                'client_ip': client_ip,
                'client_user': 'alexander.atehortua@sophossolutions.com',
                'client_datetime': client_datetime
            }
        });
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error('Axios error:', error.response?.data || error.message);
            throw new Error(error.response?.data?.error || 'Failed to deleted modules');
        } else {
            console.error('Unexpected error:', error);
            throw new Error('Failed to deleted modules');
        }
    }
};
export const deleteModules = async (data: DataInterface) => {
    try {
        const acces_token = localStorage.getItem('access_token');
        const ipResponse = await axios.get('https://api.ipify.org?format=json');
        const client_ip = ipResponse.data.ip;
        const client_datetime = formatClientDatetime();
        const updatedData = { ...data, status: 'DELETED' };

        const response = await httpMenu.patch(`${modulesAPI}/${data.id}`, updatedData, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${acces_token}`,
                'client_ip': client_ip,
                'client_user': 'alexander.atehortua@sophossolutions.com',
                'client_datetime': client_datetime
            }
        });
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error('Axios error:', error.response?.data || error.message);
            throw new Error(error.response?.data?.error || 'Failed to deleted modules');
        } else {
            console.error('Unexpected error:', error);
            throw new Error('Failed to deleted modules');
        }
    }
};
export const postModules = async (data: DataInterface) => {
    try {
        const acces_token = localStorage.getItem('access_token');
        const ipResponse = await axios.get('https://api.ipify.org?format=json');
        const client_ip = ipResponse.data.ip;
        const client_datetime = formatClientDatetime();

        const response = await httpMenu.post(modulesAPI, data, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${acces_token}`,
                'client_ip': client_ip,
                'client_user': 'alexander.atehortua@sophossolutions.com',
                'client_datetime': client_datetime
            }
        });
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error('Axios error:', error.response?.data || error.message);
            throw new Error(error.response?.data?.error || 'Failed to get modules');
        } else {
            console.error('Unexpected error:', error);
            throw new Error('Failed to get modules');
        }
    }
};

export const getModules = async () => {
    try {
        const acces_token = localStorage.getItem('access_token');
        const response = await httpMenu.get<DataInterface[]>(modulesAPI, {
            headers: {
                'client_ip': '252.80.19.154',
                'client_user': 'alexander.atehortua@sophossolutions.com',
                'client_datetime': '2024-10-15T10:40:11',
                'Authorization': `Bearer ${acces_token}`
            }
        });
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error('Axios error:', error.response?.data || error.message);
            throw new Error(error.response?.data?.error || 'Failed to get modules');
        } else {
            console.error('Unexpected error:', error);
            throw new Error('Failed to get modules');
        }
    }
};

const formatClientDatetime = (): string => {
    const date = new Date();
    return date.toISOString().split('.')[0];
};

export const updateModulesState = async (client_user: string, moduleId: string | number | undefined, formData: any) => {
    try {
        const access_token = localStorage.getItem('access_token');
        const ipResponse = await axios.get('https://api.ipify.org?format=json');
        const client_ip = ipResponse.data.ip;
        const client_datetime = formatClientDatetime();

        const response = await httpMenu.patch(`${modulesAPI}/${moduleId}`, formData, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${access_token}`,
                'client_ip': client_ip,
                'client_user': client_user,
                'client_datetime': client_datetime
            }
        });
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error('Axios error:', error.response?.data || error.message);
            throw new Error(error.response?.data?.error || 'Failed to update state');
        } else {
            console.error('Unexpected error:', error);
            throw new Error('Failed to update state');
        }
    }
};