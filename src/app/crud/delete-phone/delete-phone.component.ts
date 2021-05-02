import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Phone } from 'src/app/phone.model';
import { PhoneService } from 'src/app/services/phone.service';

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

  onDeletePhone(phoneId: string): void {
    this.phoneService.deletePhone(phoneId).subscribe(resData => {
      console.log(resData);
      this.snackBar.open('Telefon je izbrisan iz baze', 'Zatvori');
    }, error => {
      console.log(error);
      this.snackBar.open('Desila se greška', 'Zatvori');
    });
  }

}
