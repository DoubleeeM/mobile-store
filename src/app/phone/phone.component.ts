import { PhoneService } from './../services/phone.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { ShoppingCartService } from '../services/shopping-cart.service';

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
    private shoppingCartService: ShoppingCartService
  ) { }

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
  }

}
