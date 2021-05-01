import { ShoppingCartService } from 'src/app/services/shopping-cart.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  name: FormControl;
  lastName: FormControl;
  street: FormControl;
  poNumber: FormControl;
  city: FormControl;
  phone: FormControl;
  checkoutForm: FormGroup;

  constructor(fb: FormBuilder,
              private router: Router,
              private snackBar: MatSnackBar,
              private shoppingCartService: ShoppingCartService) {
    this.name = fb.control('', Validators.required);
    this.lastName = fb.control('', Validators.required);
    this.street = fb.control('', Validators.required);
    this.poNumber = fb.control('', Validators.required);
    this.city = fb.control('', Validators.required);
    this.phone = fb.control('', Validators.required);
    this.checkoutForm = fb.group({
      name: this.name,
      lastName: this.lastName,
      street: this.street,
      poNumber: this.poNumber,
      city: this.city,
      phone: this.phone
    });
  }

  ngOnInit(): void {
  }

  onOrder(): void {
    localStorage.removeItem('shoppingCart');
    this.shoppingCartService.clearCart();
    this.router.navigate(['']);
    this.snackBar.open('Narudžba je uspiješno izvršena.', 'Zatvori');
  }

}
