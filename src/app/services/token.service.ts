import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  token: string | null = null;
  myToken: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);
  decode: BehaviorSubject<any> = new BehaviorSubject({});
  myToken$ = this.myToken.asObservable();
  decode$ = this.decode.asObservable();
  isBrowser: boolean = false;

  constructor(@Inject(PLATFORM_ID) private platformId: object, private router: Router) {
    this.isBrowser = isPlatformBrowser(platformId);
    if (this.isBrowser) {
      const storedToken = localStorage.getItem('token');
      if (storedToken) {
        this.token = storedToken
        this.changeToken(this.token);
      }
    }
  }

  changeToken(tokenSt: string | null) {
    this.myToken.next(tokenSt);
    if (tokenSt) {
      try {
        this.decode.next(jwtDecode(tokenSt));
      } catch (error) {
        console.error('Token decoding failed', error);
      }
    } else {
      this.decode.next({});
    }
  }
}
