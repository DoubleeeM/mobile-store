import { CrudComponent } from './crud/crud.component';
import { MaterialModule } from './material/material.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PhonesComponent } from './phones/phones.component';
import { AddPhoneComponent } from './crud/add-phone/add-phone.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { PhoneComponent } from './phone/phone.component';
import { FilterPipe } from './filter.pipe';
import { LoginSignupComponent } from './login-signup/login-signup.component';
import { ProfileComponent } from './profile/profile.component';
import { EditPhoneComponent } from './crud/edit-phone/edit-phone.component';
import { DeletePhoneComponent } from './crud/delete-phone/delete-phone.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { EditFormComponent } from './crud/edit-phone/edit-form/edit-form.component';


@NgModule({
  declarations: [
    AppComponent,
    PhonesComponent,
    AddPhoneComponent,
    ShoppingCartComponent,
    PhoneComponent,
    FilterPipe,
    LoginSignupComponent,
    ProfileComponent,
    CrudComponent,
    EditPhoneComponent,
    DeletePhoneComponent,
    CheckoutComponent,
    EditFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    MaterialModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
