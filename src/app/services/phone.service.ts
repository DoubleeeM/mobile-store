import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { exhaustMap, map, take } from 'rxjs/operators';
import { Phone } from '../phone.model';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class PhoneService {

  constructor(
    private http: HttpClient,
    private userService: UserService) { }

  addPhone(
    brand: string,
    type: string,
    picture: string,
    price: number,
    description: string): any {
      const phoneData: Phone = {
        brand,
        type,
        picture,
        price,
        description
      };
      return this.http.post<{ name: string }>('https://phone-store-9b852-default-rtdb.firebaseio.com/phones.json',
      phoneData);
  }

  editPhone(
    brand: string,
    type: string,
    picture: string,
    price: number,
    description: string,
    id: string): any {
      const phoneData: Phone = {
        brand,
        type,
        picture,
        price,
        description
      };
      return this.http.patch(`https://phone-store-9b852-default-rtdb.firebaseio.com/phones/${id}.json`,
      phoneData);
  }

  deletePhone(id: string): any {
    return this.http.delete(`https://phone-store-9b852-default-rtdb.firebaseio.com/phones/${id}.json`);
  }

  getPhones(): Observable<Phone[]> {
    return this.http.get<{[key: string]: Phone}>('https://phone-store-9b852-default-rtdb.firebaseio.com/phones.json')
    .pipe(
      map(responseData => {
        const phonesArray: Phone[] = [];
        for (const key in responseData) {
          if (responseData.hasOwnProperty(key)) {
          phonesArray.push({ ...responseData[key], id: key });
          }
        }
        return phonesArray;
      })
    );
  }

}
