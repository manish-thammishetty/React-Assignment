import axios from 'axios';
import { BaseUrl } from '../Shared/Constants'

export const getUserPosts = (userID, callback) => {

    axios.get(BaseUrl + '/posts?userId=' + userID)
        .then(response => callback(response, false))
        .catch(error => callback(error, true));
}

export const getPostDetails = (postID, callback) => {

    axios.get(BaseUrl + '/posts/' + postID)
        .then(response => callback(response, false))
        .catch(error => callback(error, true));;
}

export const getPostComments = (postID, callback) => {

    axios.get(BaseUrl + '/posts/' + postID + '/comments')
        .then(response => callback(response, false))
        .catch(error => callback(error, true));;
}

export const deletePost = (postID, callback) => {

    axios.delete(BaseUrl + '/posts/' + postID)
        .then(response => callback(response, false))
        .catch(error => callback(error, true));;
}