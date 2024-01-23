import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product } from '../models/product';


@Injectable({
  providedIn: 'root'
})
export class CartService {

  private apiUrl = environment.apiUrl + '/cart';

  private cartItemsSubject: BehaviorSubject<Product[]> = new BehaviorSubject<Product[]>([]);
  cartItems$: Observable<Product[]> = this.cartItemsSubject.asObservable();

  constructor(private http: HttpClient) { }

  addToCart(product: Product): Observable<Product>{
    return this.http.post<Product>(this.apiUrl, product);
  }

  getCartItems(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl);
  }

  clearCart(): Observable<void> {
    return this.http.delete<void>(this.apiUrl);
  }

  checkOutCart(products: Product[]): Observable<void> {
    return this.http.post<void>(this.apiUrl, products);
  }
}
