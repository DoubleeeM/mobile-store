import { PhoneService } from './../services/phone.service';
import { Component, OnInit } from '@angular/core';
import { Phone } from '../phone.model';
import { Router } from '@angular/router';
import { ShoppingCartService } from '../services/shopping-cart.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-phones',
  templateUrl: './phones.component.html',
  styleUrls: ['./phones.component.css']
})
export class PhonesComponent implements OnInit {

  allPhones: Phone[] = [];
  filteredPhones: Phone[] = [];
  searchTerm = '';

  constructor(
    private phoneService: PhoneService,
    private router: Router,
    private shoppingCartService: ShoppingCartService,
    private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.phoneService.getPhones().subscribe(phones => {
      this.filteredPhones = phones;
      this.allPhones = this.filteredPhones;
    });

  }

  search(value: string): void {
        this.filteredPhones = this.allPhones.filter((val) => val.brand.toLowerCase().includes(value));
  }

  onPhoneClick(phone: Phone): void {
    const phoneId = phone.id;
    this.router.navigate(['/phones/', phoneId]);
  }

  addToCart(id: string): void {
    this.shoppingCartService.addToCart(id);
    this.snackBar.open('Artikal dodan u korpu', 'Zatvori');
  }


}
