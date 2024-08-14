import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartNumber = new BehaviorSubject<number>(0);
  numberofCart = this.cartNumber.asObservable();
  changeCart(data: number) {
    this.cartNumber.next(data);
  }
  _httpClient = inject(HttpClient)
  private token = localStorage.getItem('token')

  constructor(@Inject(PLATFORM_ID) platformId: object) {
    this.isBrowser = isPlatformBrowser(platformId)
    if (this.isBrowser) {
      const token = localStorage.getItem('token')

    }
  }


  addToCart(productId: string): Observable<any> {
    const headers = new HttpHeaders({
      'token': this.token
    });
    return this._httpClient.post<any>(`https://ecommerce.routemisr.com/api/v1/cart`, { productId: productId }, { headers })
  }
  updateCart(count: any, productId: string): Observable<any> {
    const headers = new HttpHeaders({
      'token': this.token
    });
    return this._httpClient.put<any>(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, { count }, { headers })
  }
  getCart(): Observable<any> {
    const headers = new HttpHeaders({
      'token': this.token
    });
    return this._httpClient.get<any>('https://ecommerce.routemisr.com/api/v1/cart', { headers })
  }
  deleteCartOneProduct(productId: string): Observable<any> {
    const headers = new HttpHeaders({
      'token': this.token
    });
    return this._httpClient.delete<any>(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, { headers })
  }
  deleteTheCart(): Observable<any> {
    const headers = new HttpHeaders({
      'token': this.token
    });
    return this._httpClient.delete<any>('https://ecommerce.routemisr.com/api/v1/cart', { headers })
  }
}
