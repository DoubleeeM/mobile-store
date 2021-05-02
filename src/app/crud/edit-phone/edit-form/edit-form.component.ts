import { map } from 'rxjs/operators';
import { Phone } from 'src/app/phone.model';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PhoneService } from 'src/app/services/phone.service';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-edit-form',
  templateUrl: './edit-form.component.html',
  styleUrls: ['./edit-form.component.css']
})
export class EditFormComponent implements OnInit {

  private phoneId = '';
  loadedPhone: Phone;

  phoneBrand: FormControl;
  phoneType: FormControl;
  phonePicture: FormControl;
  phonePrice: FormControl;
  phoneDescription: FormControl;
  phoneForm: FormGroup;

  constructor(
    fb: FormBuilder,
    private phoneService: PhoneService,
    private router: Router,
    private route: ActivatedRoute,
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
    this.route.params.subscribe(params => {
      this.phoneId = params.id;
    });
    this.getPhone();
    }

  onEditPhone(): void {
    this.phoneService.editPhone(
      this.phoneBrand.value,
      this.phoneType.value,
      this.phonePicture.value,
      this.phonePrice.value,
      this.phoneDescription.value,
      this.phoneId)
    .subscribe(resData => {
      console.log(resData);
      this.snackBar.open('Telefon je uspiješno izmijenjen', 'Zatvori');
      this.router.navigate(['/admin']);
    }, error => {
        console.log(error);
        this.snackBar.open('Desila se greška', 'Zatvori');
      }
      );
  }

  getPhone(): any {
    this.phoneService.getPhones().pipe(
      map(items => items.find(item => item.id === this.phoneId)),
    ).subscribe(phone => {
      this.loadedPhone = phone;
      console.log(this.loadedPhone);
      this.phoneBrand.setValue(this.loadedPhone.brand);
      this.phoneType.setValue(this.loadedPhone.type);
      this.phonePicture.setValue(this.loadedPhone.picture);
      this.phonePrice.setValue(this.loadedPhone.price);
      this.phoneDescription.setValue(this.loadedPhone.description);
      }
    );
  }

}
