import { Component } from '@angular/core';
import { OrdersService } from './../../services/orders.service';
import { log } from 'console';
import { CommonModule } from '@angular/common';
import { TokenService } from './../../services/token.service';
@Component({
  selector: 'app-user-orders',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-orders.component.html',
  styleUrl: './user-orders.component.css'
})
export class UserOrdersComponent {

  orders: any = []
  constructor(private _orderService: OrdersService,
    private _tokenService: TokenService,
  ) {
    this.getUserInformation()
    this.getOrders()
  }
  getUserInformation() {
    this._tokenService.decode$.subscribe({
      next: (res) => {
      }, error: (err) => {
        console.log(err);
      }
    })
  }
  getOrders() {
    this._orderService.getOrders().subscribe({
      next: (res) => {
        console.log('dqwdqwd', res)
        this.orders = res
      },
      error: (err) => {
        console.log(err)
      }
    })
  }
}
