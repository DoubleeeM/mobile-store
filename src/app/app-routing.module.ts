import { CheckoutComponent } from './checkout/checkout.component';
import { AuthGuard } from './auth.guard';
import { CrudComponent } from './crud/crud.component';
import { ProfileComponent } from './profile/profile.component';
import { LoginSignupComponent } from './login-signup/login-signup.component';
import { PhoneComponent } from './phone/phone.component';
import { PhonesComponent } from './phones/phones.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { EditFormComponent } from './crud/edit-phone/edit-form/edit-form.component';

const routes: Routes = [
  {path: 'phones', component: PhonesComponent},
  {path: 'phones/:id', component: PhoneComponent},
  {path: 'shopping-cart', component: ShoppingCartComponent},
  {path: 'login', component: LoginSignupComponent},
  {path: 'checkout', component: CheckoutComponent},
  {path: 'account', component: ProfileComponent, canActivate: [AuthGuard]},
  {path: 'admin', component: CrudComponent, canActivate: [AuthGuard]},
  {path: 'edit/:id', component: EditFormComponent, canActivate: [AuthGuard]},
  {path: '', redirectTo: 'phones', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
