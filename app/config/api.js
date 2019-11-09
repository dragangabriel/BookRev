import { Platform } from 'react-native';
import AppConfig from './appConfig';
export default {

    async getBooksByISBN(isbn) {
        return fetch(AppConfig.apiBaseUrl + 'api/book/search?Isbn=' + isbn,
            {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Device-OS': Platform.OS
                },
            })
    },

}