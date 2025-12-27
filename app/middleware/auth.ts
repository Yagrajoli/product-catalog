export default defineNuxtRouteMiddleware(() => {

    //== dummy middleware to check authentication ==//
    
  const isLoggedIn = true 

  if (!isLoggedIn) {
    return navigateTo('/login')
  }
})
