import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart.service';
import { Product } from '../../models/product';


@Component({
  selector: 'app-cart-view',
  templateUrl: './cart-view.component.html',
  styleUrl: './cart-view.component.css'
})
export class CartViewComponent implements OnInit {
  cartItems: Product[] = [];
  totalPrice: number = 0;

  constructor(private cartService: CartService){}

  ngOnInit():void {
    this.cartService.getCartItems().subscribe(data => {
      this.cartItems = data;
      this.totalPrice = this.getTotalPrice()
    })
  }
  getTotalPrice():number {
    this.totalPrice = this.cartItems.map(item => item.price).reduce((sum, item) => sum + item, 0);
    return this.totalPrice; 
  }
  clearCart(): void {
    this.cartService.clearCart().subscribe();
    this.cartItems = [];
    this.totalPrice = 0; 
  }

  checkOutCart(): void {
    this.cartService.checkOutCart(this.cartItems).subscribe(() => {
      this.cartItems = [];
      this.totalPrice = 0; 
    })
  }
}
