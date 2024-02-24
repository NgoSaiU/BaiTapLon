import axios from "axios";

export const endpoints = {
    'posts': '/posts/',

    // 'courses': '/courses/',
    // 'lessons': (courseId) => `/courses/${courseId}/lessons/`,
    // 'lesson-details': (lessonId) => `/lessons/${lessonId}/`,
    // 'comments': (lessonId) => `/lessons/${lessonId}/comments/`,
    'login': '/o/token/',
    'current-user': '/users/current-user/',
    'register': '/users/',
    // 'add-comment': (lessonId) => `/lessons/${lessonId}/comments/`
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

