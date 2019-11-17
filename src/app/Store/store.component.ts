import {Component} from "@angular/core";
import {Product} from "../model/product.model";
import {ProductRepository} from "../model/product.repository";
import { Cart } from "../model/cart.model";
import { Router } from "@angular/router";

@Component({
    selector: "store",
    templateUrl: "store.component.html"
    })
    export class StoreComponent{
        public selectedcategory =null;
        public productsPerPage = 6;
        public selectedPage = 1;

        constructor(private repository: ProductRepository,private cart: Cart,private route: Router) { }

    get products(): Product[] {
        let pageIndex = (this.selectedPage - 1) * this.productsPerPage
        return this.repository.getProducts(this.selectedcategory)
        .slice(pageIndex, pageIndex + this.productsPerPage);
    }
    get categories(): string[] {
    return this.repository.getCategories();
    }
    changecategory(newcategory?:String){
        this.selectedcategory =newcategory;
    }
    changePage(newPage: number) {
        this.selectedPage = newPage;
        }

        changePageSize(newSize: number) {
        this.productsPerPage = Number(newSize);
        this.changePage(1);
        }

        get pageCount(): number {
            return Math.ceil(this.repository
            .getProducts(this.selectedcategory).length / this.productsPerPage)
            }

            addProductToCart(product: Product) {
                this.cart.addLine(product);
                this.route.navigateByUrl("/cart");
                }
}