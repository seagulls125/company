import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  API_URL_COMPANY : string = 'https://run.mocky.io/v3/0e1cd9d2-bfbb-498b-afad-2669282ae012';
  API_URL_STOCK : string = 'https://run.mocky.io/v3/b271087c-89bf-445b-8f83-44bf25b1875e';

  constructor(private httpClient:HttpClient) { }

  getCompanyData() : Observable<any[]>{
    return this.httpClient.get<any>(this.API_URL_COMPANY);
  }

  getStockPrice() : Observable<any[]>{
    return this.httpClient.get<any>(this.API_URL_STOCK);
  }

}
