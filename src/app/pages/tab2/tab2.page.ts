import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { NewCarComponent } from 'src/app/components/new-car/new-car.component';
import { PartsService } from 'src/app/services/parts.service';
import { YonkesService } from 'src/app/services/yonkes.service';
import { Part, Yonke } from 'src/app/interfaces/interfaces';


import { PopoverController } from '@ionic/angular';
import { PopoverComponent } from 'src/app/components/popover/popover.component';
import { Storage } from '@ionic/storage';

import { YonkeDetailsComponent } from 'src/app/components/yonke-details/yonke-details.component';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  foundParts:boolean = true;
  parts: Part [] = [];
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
    private partsService: PartsService,
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
      this.getParts();
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
      this.getParts();
      this.getYonkesAdds();
    }
  }

  runSearch(event:any){
    this.getParts();
  }

  cancelSearch(){
    this.searchValue = "";
    this.getParts();
  }


  getParts(){
    this.foundParts = true;
    this.showSkeleton = true;
    this.partsService.getParts(this.searchValue, this.searchState).subscribe(resp => {
      this.parts = [];
      this.parts.push(...resp.data);
      if(resp.data.length == 0){
        this.foundParts = false;
      }
      this.showSkeleton = false;
    });
  }

  getYonkesAdds(){
    this.showAddsSkeleton = true;
    this.yonkesService.getYonkesAdds(2, this.searchState).subscribe(resp => {
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





