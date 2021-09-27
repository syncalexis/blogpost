import { environment } from 'src/environments/environment';

export const LoginBaseUrl = environment.loginBaseUrl;
export const BlogBaseUrl = environment.blogBaseUrl;
export const login = {
    loginUser: `${LoginBaseUrl}`,
}
export const blogs = {
    getBlogs: `${BlogBaseUrl}`,
    addBlogs: `${BlogBaseUrl}`,
}


