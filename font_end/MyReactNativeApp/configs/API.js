import axios from "axios";
const BASE_URL = "http://10.0.2.2:8000"

export const endpoints = {
    'posts': '/posts/',
    'post-details': (postId) => `/posts/${postId}/`,
    'comments': (postId) => `/posts/${postId}/comment/`,
    'add-comment': (postId) => `/posts/${postId}/comments/`,
    'login': '/o/token/',
    'current-user': '/users/current-user/',
    'register': '/users/',

    'favourite-post': (userId) => `/posts/${userId}/favourite/`,
    'posts-favourite': (postId) => `/posts/${postId}/post-favourite/`,
}

export const authApi = (accessToken) => axios.create({
    // baseURL: "https://ngosaiustudent.pythonanywhere.com",
    baseURL: BASE_URL,
    headers: {
        "Authorization": `bearer ${accessToken}`
    }
})

export default axios.create({
    // baseURL: "https://ngosaiustudent.pythonanywhere.com"
    baseURL: BASE_URL,

})

