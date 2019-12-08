import { helpers } from '../utils/helpers';
import { AsyncStorage } from 'react-native';

async function getFeed(page) {
    try {
        let checkData = await AsyncStorage.getItem(`page${page}`);
        if(checkData) return JSON.parse(checkData);
        let data = {
            method : 'GET'
        }
        if(page === 1)  data.apiPath = 'http://www.mocky.io/v2/59b3f0b0100000e30b236b7e';
        if(page === 2)  data.apiPath = 'http://www.mocky.io/v2/59ac28a9100000ce0bf9c236';
        if(page === 3)  data.apiPath = 'http://www.mocky.io/v2/59ac293b100000d60bf9c239';
        let response = await helpers.secureFetch(data);
        if(response){
            await AsyncStorage.setItem(`page${page}`,JSON.stringify(response));
        }
        return response;
    }
    catch (error) {
        throw error;
    }
}
export const posts = {getFeed};