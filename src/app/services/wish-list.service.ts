import { isPlatformBrowser } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, inject, Injectable, PLATFORM_ID } from '@angular/core';
import { jwtDecode } from 'jwt-decode';

import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WishListService {
  isBrowser: boolean;
  token: any = ''
  userID: any = ''

  private wishlistNumber = new BehaviorSubject<number>(0);
  numberofWish = this.wishlistNumber.asObservable();
  changeWish(data: number) {
    this.wishlistNumber.next(data);
  }
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

  getWishList(): Observable<any> {
    const headers = new HttpHeaders({
      'token': this.token
    });
    return this._httpClient.get<any>('https://ecommerce.routemisr.com/api/v1/wishlist', { headers })
  }


  addToWishList(productId: string): Observable<any> {
    const headers = new HttpHeaders({
      'token': this.token
    });
    return this._httpClient.post<any>('https://ecommerce.routemisr.com/api/v1/wishlist', { 'productId': productId }, { headers })
  }
  removeFromWishList(productId: string): Observable<any> {
    const headers = new HttpHeaders({
      'token': this.token
    });
    return this._httpClient.delete<any>(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`, { headers })
  }

}
