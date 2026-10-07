import axios, { AxiosError, AxiosRequestHeaders, ResponseType } from 'axios';

type ResponseDataT = Partial<{
    statusCode: number;
    message: string;
    error: ErrorT;
    errors: ErrorT[];
}>;

type ParamsT = {
    url: string;
    method: 'POST' | 'GET' | 'PATCH' | 'PUT' | 'DELETE';
} & Partial<{
    data: any;
    query: { name: string; value: string }[];
    headers: AxiosRequestHeaders;
    responseType: ResponseType;
}>;

export default async function request<T extends any>({
    url,
    method,
    data,
    query,
    headers,
    responseType,
}: ParamsT): Promise<T> {
    const queryStr = (query || [])
        .filter((i) => i.value)
        .map((i) => [i.name, encodeURIComponent(i.value)].join('='))
        .join('&');
    let resultUrl = [process.env.REACT_APP_API_HOST, url].join('/');

    if (url.includes('http')) {
        resultUrl = url;
    }

    if (queryStr) {
        resultUrl += (url.includes('?') ? '&' : '?') + queryStr;
    }

    try {
        const response = await axios.request<T & ResponseDataT>({
            url: resultUrl,
            method,
            data,
            headers: {
                ...headers,
            },
            responseType,
        });

        return response.data;
    } catch (e) {
        const error = e as AxiosError;
        const errorData = error.response?.data as ResponseDataT;

        return Promise.reject({ ...(errorData || error) });
    }
}

export type { ResponseDataT };
