import {API_URL} from '../utils/constants.js';

export const postJson = async (url, body) => {
    const response = await fetch(API_URL + url, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
    })

    return await response.json();
}

export const postFormData = async (url, body) => {
    const response = await fetch(API_URL + url, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: body
    })

    return await response.json();
}

export const get = async (url) => {
    const response = await fetch(API_URL + url, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json'
        },
    })

    return await response.json();
}