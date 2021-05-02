import { PhoneService } from '../../services/phone.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-phone',
  templateUrl: './add-phone.component.html',
  styleUrls: ['./add-phone.component.css']
})
export class AddPhoneComponent implements OnInit {

  phoneBrand: FormControl;
  phoneType: FormControl;
  phonePicture: FormControl;
  phonePrice: FormControl;
  phoneDescription: FormControl;
  phoneForm: FormGroup;

  constructor(fb: FormBuilder,
              private phoneService: PhoneService,
              private snackBar: MatSnackBar) {
    this.phoneBrand = fb.control('');
    this.phoneType = fb.control('');
    this.phonePicture = fb.control('');
    this.phonePrice = fb.control('');
    this.phoneDescription = fb.control('');
    this.phoneForm = fb.group({
      brand: this.phoneBrand,
      type: this.phoneType,
      picture: this.phonePicture,
      price: this.phonePrice,
      description: this.phoneDescription
    });
  }

  ngOnInit(): void {
  }

  addPhone(): void {
    this.phoneService.addPhone(
      this.phoneBrand.value,
      this.phoneType.value,
      this.phonePicture.value,
      this.phonePrice.value,
      this.phoneDescription.value)
    .subscribe(resData => {
      this.snackBar.open('Telefon je dodan u bazu', 'Zatvori');
      console.log(resData); }, error => {
        console.log(error);
        this.snackBar.open('Desila se greška', 'Zatvori');
      });
    this.reset();
  }

  reset(): void {
    this.phoneBrand.setValue('');
    this.phoneType.setValue('');
    this.phonePicture.setValue('');
    this.phonePrice.setValue('');
    this.phoneDescription.setValue('');
  }

}
