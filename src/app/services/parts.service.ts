import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PartsResponse } from '../interfaces/interfaces';
import { FuncionesService } from 'src/app/services/funciones.service';

@Injectable({
  providedIn: 'root'
})
export class PartsService {
  homeURL = "https://tuyonke.mx/controllers/";
  constructor(private http:HttpClient,
    private funcionesService: FuncionesService  ) {  }

  getMyParts(ID_User:number){
    return this.http.get<PartsResponse>(this.homeURL+`get_myParts.php?ID_User=${ID_User}`);
  }

  getParts(searchValue:String, searchState:string){
    searchValue  = this.funcionesService.deleteSpecialCharacters(searchValue);
    return this.http.get<PartsResponse>(this.homeURL+`get_parts.php?searchValue=${searchValue}&searchState=${searchState}`);
  }

  getPart(ID_Part:number){
    return this.http.get<PartsResponse>(this.homeURL+`get_parts.php?ID_Car=${ID_Part}`);
  }

  postPart(Name:string, Brand:string, Model:string, Year:number, Description:string, ID_Yonke:number, ID_User:number){
    Name  = this.funcionesService.deleteSpecialCharacters(Name);
    Model  = this.funcionesService.deleteSpecialCharacters(Model);
    Year  = this.funcionesService.deleteSpecialCharacters(Year);
    Description  = this.funcionesService.deleteSpecialCharacters(Description);
    return this.http.get<PartsResponse>(this.homeURL+`post_part.php?Name=${Name}&Brand=${Brand}&Model=${Model}&Year=${Year}&Description=${Description}&ID_Yonke=${ID_Yonke}&ID_User=${ID_User}`);
  }

  deletePart(ID_Part:number){
    return this.http.get<PartsResponse>(this.homeURL+`delete_part.php?ID_Part=${ID_Part}`);
  }


  editPart(ID_Part:number, Name:string, Brand:string, Model:string, Year:number, Description:string, ID_Yonke:number){
    Name  = this.funcionesService.deleteSpecialCharacters(Name);
    Model  = this.funcionesService.deleteSpecialCharacters(Model);
    Year  = this.funcionesService.deleteSpecialCharacters(Year);
    Description  = this.funcionesService.deleteSpecialCharacters(Description);
    return this.http.get<PartsResponse>(this.homeURL+`edit_part.php?ID_Part=${ID_Part}&Name=${Name}&Brand=${Brand}&Model=${Model}&Year=${Year}&Description=${Description}&ID_Yonke=${ID_Yonke}`);
 }


 getYonkeParts(ID_Yonke:number){
  return this.http.get<PartsResponse>(this.homeURL+`get_yonkeParts.php?ID_Yonke=${ID_Yonke}`);
}
  
}
