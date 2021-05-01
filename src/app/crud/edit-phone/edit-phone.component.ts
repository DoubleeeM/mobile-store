import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Phone } from 'src/app/phone.model';
import { PhoneService } from 'src/app/services/phone.service';

@Component({
  selector: 'app-edit-phone',
  templateUrl: './edit-phone.component.html',
  styleUrls: ['./edit-phone.component.css']
})
export class EditPhoneComponent implements OnInit {

  allPhones: Phone[] = [];
  filteredPhones: Phone[] = [];
  searchTerm = '';

  constructor(
    private phoneService: PhoneService,
    private router: Router) { }

  ngOnInit(): void {
    this.phoneService.getPhones().subscribe(phones => {
      this.filteredPhones = phones;
      this.allPhones = this.filteredPhones;
    });
  }

  search(value: string): void {
    this.filteredPhones = this.allPhones.filter((val) => val.brand.toLowerCase().includes(value));
  }

  onClick(phoneId: string): void {
    this.router.navigate(['/edit/', phoneId]);
  }

}
