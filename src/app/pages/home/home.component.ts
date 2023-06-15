import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/models/product.model';
import { CartService } from 'src/app/services/cart.service';
import { StoreService } from 'src/app/services/store.service';

const ROWS_HEIGHT: {[id:number]: number} = {1: 400, 3: 335, 4:350}

@Component({
  selector: 'app-home',
  templateUrl:'./home.component.html',

})
export class HomeComponent implements OnInit, OnDestroy {

  cols = 3
  category:string | undefined
  rowHeight = ROWS_HEIGHT[this.cols]
  products: Array<Product> | undefined
  sort = 'desc'
  count = '12'
  productsSubscription:Subscription | undefined 

 
 

  constructor(private cartService: CartService, private storeService: StoreService) {}

  onColumnsCountChange(colsNumber: number):void {
    this.cols = colsNumber
    this.rowHeight = ROWS_HEIGHT[this.cols]
  }

  onShowCategory(newCategory: string):void {
    this.category = newCategory
  }

  onAddToCart(product: Product):void {
    this.cartService.addToCart({
      product: product.image,
      name: product.title,
      price:product.price,
      quantity: 1,
      id: product.id
    })
  }

  ngOnInit(): void {
    this.getProducts()
  }

  
  getProducts(): void {
    this.productsSubscription = this.storeService.getAllProducts(this.count, this.sort)
      .subscribe((_products) => {
        this.products = _products
      })
    }

    ngOnDestroy(): void {
      if(this.productsSubscription) {
        this.productsSubscription.unsubscribe()
      }
    }
  }
