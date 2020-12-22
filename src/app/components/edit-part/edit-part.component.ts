import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { Part, Yonke } from 'src/app/interfaces/interfaces';
import { YonkesService } from 'src/app/services/yonkes.service';
import { PartsService } from 'src/app/services/parts.service';
import { FuncionesService } from 'src/app/services/funciones.service';

@Component({
  selector: 'app-edit-part',
  templateUrl: './edit-part.component.html',
  styleUrls: ['./edit-part.component.scss'],
})
export class EditPartComponent implements OnInit {

  ID_User:number;
  @Input() part:Part;
  yonkes: Yonke [] = [];
  ID_Part:number = 0;
  Name:string = "";
  Brand:string = "";
  Model:string = "";
  Year:any = 0;
  Description:string = "";
  ID_Yonke:number;


  constructor(
    private modalCtrl: ModalController,
    private storage: Storage,
    private funcionesService: FuncionesService,
    private yonkesService: YonkesService,
    private partsService: PartsService) { }

    ngOnInit() {
      this.checkSession();
      console.log(this.part);
    }

  closeModal(action:string = "null"){
    this.modalCtrl.dismiss(action);
  }


  checkSession(){
    this.funcionesService.presentLoading();
    this.storage.get('ID_User').then((val) => {
      this.funcionesService.dismissLoading();
      if(val > 0){
        this.ID_User = val;
        this.getMyYonkes();
      }else{
        this.closeModal();
      }
    });
  }
  
  getMyYonkes(){
    this.funcionesService.presentLoading();
    this.yonkes = [];
    this.yonkesService.getMyYonkes(this.ID_User).subscribe(resp => {
      this.yonkes.push(...resp.data);
      this.funcionesService.dismissLoading();
      this.ID_Part = this.part.ID_Part;
      this.Name = this.part.Name;
      this.Brand = this.part.Brand;
      this.Model = this.part.Model;
      this.Year = this.part.Year;
      this.Description = this.part.Description;
      this.ID_Yonke = this.part.ID_Yonke;
    });
  }


  editPart(){
    if(this.Brand != "Universal"){
      if(this.Year > 2025 || this.Year < 1900){
        this.funcionesService.presentAlert("Error", "Revisa el año");
        return;
      }
    }
    this.funcionesService.presentLoading("Actualizando...");
    this.partsService.editPart(this.ID_Part, this.Name,  this.Brand, this.Model, this.Year, this.Description, this.ID_Yonke).subscribe( resp => {
      this.funcionesService.dismissLoading();
      if( resp.statusID == 200){
        this.funcionesService.presentAlert(resp.statusName, resp.statusDescription);
        this.closeModal("Refresh");
      }else{
        this.funcionesService.presentAlert(resp.statusName, resp.statusDescription);
      }
      
    });

  }

  brandChange(){
    if(this.Brand == "Universal"){
      this.Model = " ";
      this.Year = "oo";
    }
  }


}
