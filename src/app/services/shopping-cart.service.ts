import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { CartItems, Order } from '../phone.model';


@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  constructor(
    private http: HttpClient
  ) {}

  private cartItems: CartItems = JSON.parse(localStorage.getItem('shoppingCart') || '{}');
  private cartItems$ = new BehaviorSubject<CartItems>(this.cartItems);
  readonly items$: Observable<CartItems> = this.cartItems$.asObservable();
  readonly total$: Observable<number> = this.items$.pipe(
    map(items => Object.values(items).reduce((acc, cur) => {
      return acc + cur.amount;
    }, 0))
  );

  private updateStream(): void {
    this.cartItems$.next(this.cartItems);
    localStorage.setItem('shoppingCart', JSON.stringify(this.cartItems));
  }

  addToCart(id: string): void {
    if (this.cartItems[id]) {
      this.cartItems[id].amount++;
    } else {
      this.cartItems[id] = { amount: 1 };
    }
    this.updateStream();
  }

  reduceAmount(id: string): void {
    if (this.cartItems[id]) {
      if (this.cartItems[id].amount === 1) {
        delete this.cartItems[id];
      } else {
        this.cartItems[id].amount--;
      }
      this.updateStream();
    }
  }

  removeFromCart(id: string): void {
    if (this.cartItems[id]) {
        delete this.cartItems[id];
        this.updateStream();
    }
  }

  clearCart(): void {
    for (const id of Object.keys(this.cartItems)) {
      const phone: string = id;
    }
    this.cartItems = {};
    this.updateStream();
  }

  newOrder(
    name: string,
    lastName: string,
    street: string,
    poNumber: number,
    city: string,
    phone: number
  ): any {
    const orderData: Order = {
      name,
      lastName,
      street,
      poNumber,
      city,
      phone
    };
    return this.http.post<{ name: string }>('https://phone-store-9b852-default-rtdb.firebaseio.com/orders.json',
    orderData);
  }
}
