import { Injectable } from '@angular/core';
import { HttpHandler, HttpInterceptor, HttpParams, HttpRequest } from '@angular/common/http';
import { UserService } from './services/user.service';
import { exhaustMap, take } from 'rxjs/operators';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {

  constructor(
    private userService: UserService
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): any {
    this.userService.user.pipe(take(1), exhaustMap(user => {
      if (!user) {
        return next.handle(req);
      }
      const modifiedReq = req.clone({params: new HttpParams().set('auth', user.token)});
      return next.handle(modifiedReq);
    }));
  }
}
