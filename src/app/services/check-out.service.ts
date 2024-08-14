import { isPlatformBrowser } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, inject, Injectable, PLATFORM_ID } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CheckOutService {
  isBrowser: boolean;
  token: any = ''
  userID: any = ''
  constructor(@Inject(PLATFORM_ID) platformId: object) {
    this.isBrowser = isPlatformBrowser(platformId)
    if (this.isBrowser) {
      const token = localStorage.getItem('token')
      if (token) {
        this.initToken();
      }
    }
  }

  private initToken() {
    if (this.isBrowser) {
      this.token = localStorage.getItem('token');
      const decodedToken: any = jwtDecode(this.token);
      this.userID = decodedToken.id;
    }
  }
  _httpClient = inject(HttpClient)

  checkOutSession(cartId: string, shippingAddress: string): Observable<any> {
    const headers = new HttpHeaders({
      'token': this.token
    });
    return this._httpClient.post<any>(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:4200`, shippingAddress, { headers })
  }

}
