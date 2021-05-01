import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Phone } from 'src/app/phone.model';
import { PhoneService } from 'src/app/services/phone.service';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';

@Component({
  selector: 'app-delete-phone',
  templateUrl: './delete-phone.component.html',
  styleUrls: ['./delete-phone.component.css']
})
export class DeletePhoneComponent implements OnInit {

  allPhones: Phone[] = [];
  filteredPhones: Phone[] = [];
  searchTerm = '';

  constructor(
    private phoneService: PhoneService,
    private router: Router,
    private shoppingCartService: ShoppingCartService) { }

  ngOnInit(): void {
    this.phoneService.getPhones().subscribe(phones => {
      this.filteredPhones = phones;
      this.allPhones = this.filteredPhones;
    });
  }

  search(value: string): void {
    this.filteredPhones = this.allPhones.filter((val) => val.brand.toLowerCase().includes(value));
  }

  onDeletePhone(phoneId: string): void {
    this.phoneService.deletePhone(phoneId).subscribe(resData => {
      console.log(resData);
    });
  }

}
