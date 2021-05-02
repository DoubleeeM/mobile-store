import { CartItems, CartPhone, Phone } from './../phone.model';
import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { PhoneService } from '../services/phone.service';
import { ShoppingCartService } from '../services/shopping-cart.service';
import { combineLatest, Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {

  constructor(
    private shoppingCartService: ShoppingCartService,
    private phoneService: PhoneService,
    private router: Router
  ) { }

  total = this.shoppingCartService.total$;

  cartPhones: Observable<Array<CartPhone>> = combineLatest(
    [this.phoneService.getPhones(),
    this.shoppingCartService.items$]).pipe(
      map(([phones, items]: [Phone[], CartItems]) => {
        const ids = Object.keys(items);
        return phones.filter(
          phone => ids.indexOf(phone.id) !== -1
        ).map(
          phone => ({
            ...phone, amount: items[phone.id].amount
          })
        );
      })
    );

  ngOnInit(): void {
  }

  addAmount(id: string): void {
    this.shoppingCartService.addToCart(id);
  }

  reduceAmount(id: string): void {
    this.shoppingCartService.reduceAmount(id);
  }

  removeFromCart(id: string): void {
    this.shoppingCartService.removeFromCart(id);
  }

  toCheckout(): void {
    this.router.navigate(['/checkout']);
  }

}
