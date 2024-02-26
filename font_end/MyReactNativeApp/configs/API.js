import axios from "axios";

export const endpoints = {
    'posts': '/posts/',
    'post-details': (postId) => `/posts/${postId}/`,
    'comments': (postId) => `/posts/${postId}/comment/`,
    'add-comment': (postId) => `/posts/${postId}/comments/`,
    'login': '/o/token/',
    'current-user': '/users/current-user/',
    'register': '/users/',

}

export const authApi = (accessToken) => axios.create({
    // baseURL: "https://ngosaiustudent.pythonanywhere.com",
    baseURL: "http://10.0.2.2:8000",
    headers: {
        "Authorization": `bearer ${accessToken}`
    }
})

export default axios.create({
    // baseURL: "https://ngosaiustudent.pythonanywhere.com"
    baseURL: "http://10.0.2.2:8000",

})

