import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BasicSettingsService {

  http : HttpClient = inject(HttpClient);
  constructor() { }

  getSettingsData(){
    return this.http.get("http://localhost:3000/settings");
  }

  saveRowsPerPage(data:any){
    return this.http.post("http://localhost:3000/settings/rowsPerPage",data)
  }

}
