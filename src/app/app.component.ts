import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {

  isAuthenticated = false;
  userEmail = '';
  private userSub: Subscription;

  constructor(
    private router: Router,
    private userService: UserService
  ){}
  title = 'mobile-store';
  opened = true;

  ngOnInit(): void {
    this.userSub = this.userService.user.subscribe(user => {
      this.isAuthenticated = !user ? false : true;
      this.userEmail = user?.email;
    });
    this.userService.autoLogin();
  }

  returnToHome(): void {
    this.router.navigate(['/']);
  }

  goToCart(): void {
    this.router.navigate(['/shopping-cart']);
  }

  goToLogin(): void {
    this.router.navigate(['/login']);
  }

  goToAccount(): void {
    this.router.navigate(['/account']);
  }

  onLogout(): void {
    this.userService.logout();
  }

  onEditPhones(): void {
    this.router.navigate(['/admin']);
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }

}
