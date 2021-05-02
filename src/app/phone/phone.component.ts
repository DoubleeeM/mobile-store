import { PhoneService } from './../services/phone.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ShoppingCartService } from '../services/shopping-cart.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-phone',
  templateUrl: './phone.component.html',
  styleUrls: ['./phone.component.css']
})
export class PhoneComponent implements OnInit {

  loadedPhones = [];
  phoneId = '';

  constructor(
    private phoneService: PhoneService,
    private route: ActivatedRoute,
    private shoppingCartService: ShoppingCartService,
    private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.phoneService.getPhones().subscribe(phones =>
      this.loadedPhones = phones);
    this.route.params.subscribe(params => {
        this.phoneId = params.id;
      });
    console.log(this.phoneId);
  }

  addToCart(id: string): void {
    this.shoppingCartService.addToCart(id);
    this.snackBar.open('Artikal dodan u korpu', 'Zatvori');
  }

}
