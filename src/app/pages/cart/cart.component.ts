import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { loadStripe } from '@stripe/stripe-js';
import { Cart, CartItem } from 'src/app/models/cart.model';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html'
})
export class CartComponent implements OnInit {

  cart: Cart = {items: [{
    product: 'https://via.placeholder.com/150',
    name: 'Snickers',
    price: 150,
    quantity: 3,
    id: 1
  },
  {
    product: 'https://via.placeholder.com/150',
    name: 'Headphones',
    price: 100,
    quantity: 1,
    id: 1
  },
  {
    product: 'https://via.placeholder.com/150',
    name: 'Jumpers',
    price: 70,
    quantity: 10,
    id: 1
  },
  
]}

  dataSource: Array<CartItem> = []

  displayedColumns: Array<string> = ['product', 'name', 'price', 'quantity', 'total', 'action']

  constructor(private cartService:CartService, private http: HttpClient) {}

  ngOnInit():void {
    this.dataSource = this.cart.items
    this.cartService.cart.subscribe((_cart: Cart) => {
      this.cart = _cart
      this.dataSource = this.cart.items 
    })
  }

  getTotal(items: Array<CartItem>):number {
    return this.cartService.getTotal(items)
    
  }

  onClearCart():void {
    this.cartService.clearCart()
  }

  onRemoveFromCart(item: CartItem):void {
    this.cartService.removeFromCart(item)
  }

  onIncreaseQuantity(item: CartItem):void {
    this.cartService.addToCart(item )
  } 

  onDecreaseQuantity(item: CartItem):void {
    this.cartService.decreaseQuantity(item)
  }

  onCheckout():void {
    this.http.post('http://localhost:4242/checkout', {
      items: this.cart.items
    }).subscribe(async(res: any) => {
      let stripe = await loadStripe('pk_test_51KcWwQDGZCS4FY6tTpAwMyTn0kCep2uYHf8Jda2zW7eRJ8GxPBKbCIw4qwzKAsRTfppYrb2k0WLJKzam9BmQRDQm00b58oPGXd')
      stripe?.redirectToCheckout({
        sessionId: res.id
      })
    })
  }

}
 