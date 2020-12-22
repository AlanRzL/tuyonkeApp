import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { YonkesResponse } from '../interfaces/interfaces';
import { FuncionesService } from 'src/app/services/funciones.service';

@Injectable({
  providedIn: 'root'
})
export class YonkesService {
  homeURL = "https://tuyonke.mx/controllers/";
  constructor(
    private http:HttpClient,
    private funcionesService: FuncionesService ) {  }

  getMyYonkes(ID_User:number){
    return this.http.get<YonkesResponse>(this.homeURL+`get_myYonkes.php?ID_User=${ID_User}`);
  }
  getYonke(ID_Yonke:number){
    return this.http.get<YonkesResponse>(this.homeURL+`get_yonke.php?ID_Yonke=${ID_Yonke}`);
  }
  getYonkesAdds(page:number, searchState:string){
    return this.http.get<YonkesResponse>(this.homeURL+`get_yonkesAdds.php?page=${page}&searchState=${searchState}`);
  }



  editYonke(
    ID_Yonke:number,
    Name:string,
    Category:string,
    Phone:string,
    WhatsApp:string,
    Address:string,
    AddressNumber:string,
    AddressSubur:string,
    State:string,
    City:string,
    Description:string,
    ){
    Name  = this.funcionesService.deleteSpecialCharacters(Name);
    Phone  = this.funcionesService.deleteSpecialCharacters(Phone);
    WhatsApp  = this.funcionesService.deleteSpecialCharacters(WhatsApp);
    Address  = this.funcionesService.deleteSpecialCharacters(Address);
    AddressNumber  = this.funcionesService.deleteSpecialCharacters(AddressNumber);
    AddressSubur  = this.funcionesService.deleteSpecialCharacters(AddressSubur);
    City  = this.funcionesService.deleteSpecialCharacters(City);
    Description  = this.funcionesService.deleteSpecialCharacters(Description);
    return this.http.get<YonkesResponse>(this.homeURL+`edit_yonke.php?ID_Yonke=${ID_Yonke}&Name=${Name}&Category=${Category}&Phone=${Phone}&WhatsApp=${WhatsApp}&Address=${Address}&AddressNumber=${AddressNumber}&AddressSubur=${AddressSubur}&State=${State}&City=${City}&Description=${Description}`);
  }


}
