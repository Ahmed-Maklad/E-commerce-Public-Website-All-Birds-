import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { SliderCmComponent } from '../slider-cm/slider-cm.component';
import { ProductService } from '../../../Services/product.service';
import { Subscription } from 'rxjs';
import { Iproduct } from '../../../Modules/Product';
import { error } from 'jquery';
import { environment } from '../../../environments/environment.development';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule,SliderCmComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit,OnDestroy {

  sub:Subscription[]= []as Subscription[];
  Products:Iproduct[]=[]as Iproduct[];
  imagepath:string=environment.BaseIMageUrl;
  constructor(private Product:ProductService) {

  }
  ngOnDestroy(): void {
    for (const element of this.sub) {
      element.unsubscribe();
  }
  }
  ngOnInit(): void {
    var pr = this.Product.GetTop(1,4).subscribe(
      {
        next:(res)=>{
          this.Products=res.data;
          console.log(this.Products)
        },
        error:(er)=>{

          console.log(er);
        }
      }
    );
    this.sub.push(pr);



  }
  slides2 = [
    { img: 'Images/slide2-image1.jpg',img2: 'Images/slide2-image2.jpg', text: "Men's season ready" , text2: "Women's Fall Essentials", active:true },
    { img: 'Images/slide2-image3.jpg',img2: 'Images/slide2-image4.jpg', text: "Men's Sporty Styles" , text2: "Women's Athleisure Styles" , active:false },
    { img: 'Images/slide2-image5.jpg',img2: 'Images/slide2-image6.jpg', text: "Men's Lightweight Styles" , text2: "Women's Packable Shoes" , active:false },
  ];


  items = [
    {
      type: 'image',
      src: 'Images/slide1-image1.jpg',
      title: 'Wool Runner Go',
      subtitle: 'Sublimely Soft, Everyday Elevated'
    },
    {
      type: 'video',
      src: 'Images/video.webm',
      title: 'Wool Runner Mizzle',
      subtitle: 'Weather-ready, Everyday Sneaker'
    },
    {
      type: 'image',
      src: 'Images/slide1-image2.jpg',
      title: 'Tree Topper',
      subtitle: 'Breezy High-Top Sneakers'
    }
  ];




}
