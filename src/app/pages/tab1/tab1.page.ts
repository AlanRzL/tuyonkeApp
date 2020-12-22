import { Component, ViewChild } from '@angular/core';
import { ModalController, AlertController, IonSlides } from '@ionic/angular';
import { NewCarComponent } from 'src/app/components/new-car/new-car.component';
import { CarsService } from 'src/app/services/cars.service';
import { YonkesService } from 'src/app/services/yonkes.service';
import { Car, Yonke } from 'src/app/interfaces/interfaces';


import { PopoverController } from '@ionic/angular';
import { PopoverComponent } from 'src/app/components/popover/popover.component';
import { Storage } from '@ionic/storage';

import { YonkeDetailsComponent } from 'src/app/components/yonke-details/yonke-details.component';



@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  @ViewChild('sliderRef', { static: true }) protected slides: IonSlides;

  foundCars:boolean = true;
  cars: Car [] = [];
  yonkesAdds: Yonke [] = [];
  searchValue:String = "";
  showSkeleton:boolean;
  showAddsSkeleton:boolean = true;
    slideOptions = {
      speed: 600,
      slidesPerView: 2.5,
      freeMode: true
    };
   searchState:string = "Todo México";

  constructor(
    private carsService: CarsService,
    private yonkesService: YonkesService,
    public popoverController: PopoverController,
    private modalCtrl: ModalController,
    private storage: Storage
  ) {}
  
  ngOnInit(){
    this.showSkeleton = true;
    this.storage.get('searchState').then((val) => {
      if(val){
        this.searchState = val;
      }else{
        this.storage.set('searchState', this.searchState);
      }
      this.getCars();
      this.getYonkesAdds();
    });
  }




  async presentPopover() {
    const popover = await this.popoverController.create({
      component: PopoverComponent,
      cssClass: 'my-custom-class',
      translucent: true
    });
    await popover.present();
    const { data } = await popover.onWillDismiss();
    if(data != undefined){
      this.searchState = data.item;
      this.storage.set('searchState', data.item);
      this.getCars();
      this.getYonkesAdds();
    }
  }


  runSearch(event:any){
    this.getCars();
  }

  cancelSearch(){
    this.searchValue = "";
    this.getCars();
  }

  getCars(){
    this.foundCars = true;
    this.showSkeleton = true;
    this.carsService.getCars(this.searchValue, this.searchState).subscribe(resp => {
      this.cars = [];
      this.cars.push(...resp.data);
      if(resp.data.length == 0){
        this.foundCars = false;
      }
      this.showSkeleton = false;
    });
  }


  getYonkesAdds(){
    this.showAddsSkeleton = true;
    this.yonkesService.getYonkesAdds(1, this.searchState).subscribe(resp => {
      this.showAddsSkeleton = false;
      this.yonkesAdds = [];
        this.yonkesAdds.push(...resp.data);
      if(resp.data.length < 5){
        let adds = [ 
          { Photo: "https://www.tuyonke.mx/adds/1.png"},
          { Photo: "https://www.tuyonke.mx/adds/2.png"},
          { Photo: "https://www.tuyonke.mx/adds/3.png"},
          { Photo: "https://www.tuyonke.mx/adds/4.png"},
          { Photo: "https://www.tuyonke.mx/adds/5.png"},
        ];
        this.yonkesAdds.push(...adds);
      }
      //this.slides.update();
    });
  }


  async openYonkeDetails(yonke:Yonke){
    if(yonke.ID_Yonke){
      const modal = await this.modalCtrl.create({
          component: YonkeDetailsComponent,
          componentProps: {
            ID_Yonke: yonke.ID_Yonke,
            yonkePhoto: yonke.Photo
          }
      });
      modal.present();
      const data  = await modal.onWillDismiss();
    }
  }


}





