import axios from 'axios';
import {BaseUrl} from '../Shared/Constants'

export const getUsers = (callback) => {

    axios.get( BaseUrl + '/users')
        .then(response => callback(response, false))
        .catch(error => callback(error, true));
}
