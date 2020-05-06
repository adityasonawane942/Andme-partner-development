import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-store-detail',
  templateUrl: './store-detail.component.html',
  styleUrls: ['./store-detail.component.css']
})
export class StoreDetailComponent implements OnInit {

  products
  categories
  product = ''
  current_product
  current_category
  flavors
  base_price
  prices
  mySubscription: any;
  // source = '../../../assets/'
  product_image
  benefits
  working

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router
    ) {
      this.router.routeReuseStrategy.shouldReuseRoute = function () {
        return false;
      };
      this.mySubscription = this.router.events.subscribe((event) => {
        if (event instanceof NavigationEnd) {
          // Trick the Router into believing it's last link wasn't previously loaded
          this.router.navigated = false;
        }
      });
     }

  ngOnInit() {
                
    this.route.params.subscribe(
      params => {
        this.current_category = params.category
        this.current_product = params.product
      }
    );

    this.http.get('http://127.0.0.1:8000/andme/products/')
      .subscribe(
        data => {
          // console.log(data);
          this.categories = data['Categories']
          // console.log(this.categories)
          this.products = this.categories.find(category => category.name==this.current_category).products
          // console.log(this.products)
          this.product = this.products.find(product => product.name==this.current_product)
          console.log(this.product)
          this.product_image = this.product['image1']
          // console.log(this.product_image)
          // console.log(this.product['flavour'])
          this.flavors = this.product['flavour'].split(",")
          // console.log(this.flavors)
          this.base_price = this.product['price']
          // console.log(this.base_price)
          this.prices = [this.base_price]
          // console.log(this.prices)
          this.benefits = [{image: this.product['benefit1'], name: this.product['benefitname1']},
                          {image: this.product['benefit2'], name: this.product['benefitname2']},
                          {image: this.product['benefit3'], name: this.product['benefitname3']}]
          // console.log(this.benefits)
          this.working = this.product['working']
          // console.log(this.working)
        },
        error => {
          alert(JSON.stringify(error))
        }
        )
  }

  ngOnDestroy() {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    if (this.mySubscription) {
      this.mySubscription.unsubscribe();
    }
  }

}
