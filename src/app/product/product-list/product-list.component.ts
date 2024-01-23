import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { Product } from '../../models/product';
import { CartService } from '../../cart/cart.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit {

  products: Product[] = [];
  productsInCart: Product[] = [];
  filteredProducts: Product[] = [];
  productFound: boolean = true;
  sortOrder: string = ''
  
  constructor(private productService: ProductService, private cartService: CartService,
    private snackbar: MatSnackBar){}

  ngOnInit(): void {
    this.productService.getProducts().subscribe(data => {
      this.products = data;
      this.filteredProducts = data;
    });

    this.cartService.cartItems$.subscribe(cartItems => {
      this.productsInCart = cartItems;
    });
  }

  addToCart(product: Product): void {
    this.cartService.addToCart(product).subscribe({
      next: () => {
        this.snackbar.open("Added to cart", "", {
          duration: 2000,
          verticalPosition: "top",
          horizontalPosition: "center"
        })
      }
    })
  }

  isInCart(product: Product): boolean {
    return this.productsInCart.some(cartItem => cartItem.id === product.id);
  }

  applyFilter(event: Event): void {
    let searchTerm = ((event.target as HTMLInputElement).value).toLowerCase();

    this.filteredProducts = this.products.filter(item => item.name.toLowerCase().includes(searchTerm));
    this.productFound = this.filteredProducts.length > 0;

    this.sortProducts(this.sortOrder)
  }

  sortProducts(sortValue: string) {
    this.sortOrder = sortValue;

    if(this.sortOrder === "priceLowHigh"){
      this.filteredProducts.sort((a,b) => a.price - b.price);
    } else if (this.sortOrder === "priceHighLow"){
      this.filteredProducts.sort((a,b) => b.price - a.price);
    }
  }

}
