import { LocalStorage } from "quasar";

export default defineNuxtRouteMiddleware((to,from) => {
    const storedUser = LocalStorage.getItem('user');
    if(to.path === '/' && !storedUser ) {
        console.log(storedUser)
        return navigateTo('/login')
    }
    else if(to.path === '/' ) {
        console.log(storedUser)
    }
    else if((to.path === '/register' || to.path == '/login') && storedUser) {
        console.log(storedUser)
        return navigateTo('/')
    }
  })