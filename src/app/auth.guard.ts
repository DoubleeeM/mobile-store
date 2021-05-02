import { map, take } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { UserService } from './services/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private userService: UserService,
    private router: Router
  ) {}

  // if user has admin e-mail he can visit /admin page
  canActivate(
    route: ActivatedRouteSnapshot,
    router: RouterStateSnapshot):
    boolean | Promise<boolean | UrlTree> | Observable<boolean | UrlTree> {
      return this.userService.user.pipe(
        take(1),
        map(user => {
          // const isAuth = !!user;
          // if (isAuth)
          if (user.email === 'mahir@mehinovic.com') {
            return true;
          }
          return this.router.createUrlTree(['/phones']);
        })
      );
    }
}
