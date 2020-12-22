import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { YonkesService } from 'src/app/services/yonkes.service';
import { FuncionesService } from 'src/app/services/funciones.service';
import { Yonke } from 'src/app/interfaces/interfaces';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';

declare var window:any;
@Component({
  selector: 'app-edit-yonke',
  templateUrl: './edit-yonke.component.html',
  styleUrls: ['./edit-yonke.component.scss'],
})
export class EditYonkeComponent implements OnInit {

  @Input() yonke:Yonke;
  Name: string = "";
  Category: string = "";
  Phone: string = "";
  WhatsApp: string = "";
  Address: string = "";
  AddressNumber: string = "";
  AddressSubur: string = "";
  State: string = "";
  City: string = "";
  Description: string = "";


  newProfileImage: string = "";
  tempProfileImage: string = "";

  yonkePhoto:string = "no";

  constructor(
    private fileTransfer: FileTransfer,
    private camera: Camera,
    private modalCtrl: ModalController,
    private yonkesService: YonkesService,
    private funcionesService: FuncionesService
    ) {


   }

  ngOnInit() {
    console.log(this.yonke);
    this.Name = this.yonke.Name;
    this.Category = this.yonke.Category;
    this.Phone = this.yonke.Phone;
    this.WhatsApp = this.yonke.WhatsApp;
    this.Address = this.yonke.Address;
    this.AddressNumber = this.yonke.AddressNumber;
    this.AddressSubur = this.yonke.AddressSubur;
    this.State = this.yonke.State;
    this.City = this.yonke.City;
    this.Description = this.yonke.Description;
    if(this.yonke.Photo){
      this.yonkePhoto = "yes";
    }
  }

  closeModal(action:string = "null"){
    this.modalCtrl.dismiss(action);
  }




  choosePhoto() {
    const options: CameraOptions = {
      quality: 50,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      saveToPhotoAlbum: false
    };

    this.camera.getPicture(options).then( ( imageData ) => {
      this.newProfileImage =( imageData );
      const img  = window.Ionic.WebView.convertFileSrc( imageData );
      this.tempProfileImage =  img ;
      this.yonkePhoto = "new";
     }, (err) => {
       //alert("error" + err);
     });
  } 






  async editYonke(){    
    this.funcionesService.presentLoading("Actualizando...");
    this.yonkesService.editYonke(this.yonke.ID_Yonke, this.Name, this.Category, this.Phone, this.WhatsApp, this.Address, this.AddressNumber, this.AddressSubur, this.State, this.City, this.Description).subscribe( resp => {
      this.funcionesService.dismissLoading();
      if( resp.statusID == 200){
        if(this.newProfileImage.length > 0){
          this.editYonkePhoto();
        }else{
          this.funcionesService.dismissLoading();
          this.funcionesService.presentAlert(resp.statusName, resp.statusDescription);
          this.closeModal("Refresh");
        }
      }else{
        this.funcionesService.dismissLoading();
         this.funcionesService.presentAlert(resp.statusName, resp.statusDescription);
      }
    });
  }

  editYonkePhoto( ) {
    var d = new Date();
    var n = d.getTime();

    const options: FileUploadOptions = {
      fileKey: 'image',
      fileName: 'yonke_'+this.yonke.ID_Yonke+'_'+n+'_.jpg',
      headers: {
        'x-token': 'rala9411'
      }
    };
    const fileTransfer: FileTransferObject = this.fileTransfer.create();
    fileTransfer.upload( this.newProfileImage, `https://tuyonke.mx/controllers/edit_yonkePhoto.php?ID_Yonke=${this.yonke.ID_Yonke}&oldImage=${this.yonke.Photo}`, options )
      .then( data => {
        this.funcionesService.dismissLoading();
        this.funcionesService.presentAlert("Exito", "Actualizado");
        this.closeModal("Refresh");
      }).catch( err => {
        this.funcionesService.dismissLoading();
      });
  }





}
