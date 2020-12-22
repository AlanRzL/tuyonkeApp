import { Component, OnInit, Input } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { ModalController } from '@ionic/angular';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';

import { FuncionesService } from 'src/app/services/funciones.service';
import { CarsService } from 'src/app/services/cars.service';
import { Yonke } from 'src/app/interfaces/interfaces';
import { YonkesService } from 'src/app/services/yonkes.service';
import { Storage } from '@ionic/storage';
declare var window:any;

@Component({
  selector: 'app-new-car',
  templateUrl: './new-car.component.html',
  styleUrls: ['./new-car.component.scss'],
})
export class NewCarComponent implements OnInit {

  ID_User:number = 0;
  yonkes: Yonke [] = [];
  successCounter:number = 0;
  ID_Yonke:number = 0;
  Brand:string = "";
  Model:string = "";
  Year:any = 2020;
  Description:string = "";

  imagesToUpload: string[] = [];
  tempImages: string[] = [];



  isLoading = false;

  constructor(

    private fileTransfer: FileTransfer,
    private camera: Camera,
    private modalCtrl: ModalController,
    private carsService: CarsService,
    private storage: Storage,
    private funcionesService: FuncionesService,
    private yonkesService: YonkesService
     ) { }

  ngOnInit() {
    this.checkSession();
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
      this.ID_Yonke = resp.data[0].ID_Yonke;
      console.log(this.yonkes);
      this.funcionesService.dismissLoading();
    });
  }


  openGallery() {
    const options: CameraOptions = {
      quality: 25,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      saveToPhotoAlbum: false
    };
    this.camera.getPicture(options).then( ( imageData ) => {
      this.imagesToUpload.push( imageData );
      const img  = window.Ionic.WebView.convertFileSrc( imageData );
      this.tempImages.push( img );
     }, (err) => {
       //alert("error" + err);
     });
  } 


  openCamera() {
      const cameraOptions: CameraOptions = {
        quality: 25,
        destinationType: this.camera.DestinationType.FILE_URI,
        encodingType: this.camera.EncodingType.JPEG,
        mediaType: this.camera.MediaType.PICTURE,
        correctOrientation: false,
        sourceType: this.camera.PictureSourceType.CAMERA
      };
    this.camera.getPicture(cameraOptions).then( ( imageData ) => {
      this.imagesToUpload.push( imageData );
      const img  = window.Ionic.WebView.convertFileSrc( imageData );
      this.tempImages.push( img );
     }, (err) => {
       //alert("error" + err);
     });
  } 



  postCar(){

    if(this.Year > 2025 || this.Year < 1900){
      this.funcionesService.presentAlert("Error", "Revisa el año");
      return;
    }
    
    this.funcionesService.presentLoading("Publicando...");
    this.carsService.postCar(this.Brand, this.Model, this.Year, this.Description, this.ID_Yonke, this.ID_User).subscribe( resp => {
      if( resp.statusID == 200){
        var counter = 0;
        for (const file of this.imagesToUpload) {
          counter = counter + 1;
            this.subirImagen(file, resp.data[0].ID_Car, counter);
        }//for
      }else{
        this.funcionesService.dismissLoading();
        this.funcionesService.presentAlert(resp.statusName, resp.statusDescription);
        if( resp.statusID == -2){
          window.open("https://tuyonke.mx/", '_system');
        }
      }
    });
  }




  subirImagen( img:string, ID_Car, photoNumber: number  ) {
    const options: FileUploadOptions = {
      fileKey: 'image',
      fileName: 'car_'+ID_Car+'_'+photoNumber+'_.jpg',
      headers: {
        'x-token': 'rala9411'
      }
    };
    const fileTransfer: FileTransferObject = this.fileTransfer.create();
    fileTransfer.upload( img, `https://tuyonke.mx/controllers/post_image.php?ID_Car=${ID_Car}&photoNumber=${photoNumber}`, options )
      .then( data => {
          this.successCounter = this.successCounter  + 1;
          if(this.successCounter == this.imagesToUpload.length){
            this.funcionesService.dismissLoading();
            this.funcionesService.presentAlert("Exito","Tu auto ya se encuentra publicado!");
            this.closeModal("Refresh");
          }
      }).catch( err => {
      });
  }





  


  
}
