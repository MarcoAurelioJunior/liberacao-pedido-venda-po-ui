import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  let router = inject(Router)
  let username = sessionStorage.getItem('username')
  let url = state.url
  
  return true

  if(url !== '/login'){
    if(!username) {
      sessionStorage.setItem('url', url)
      router.navigate(['/login'])

      return false;
    }
  }
  return true;
};
