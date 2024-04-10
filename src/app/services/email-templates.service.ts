import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, inject } from '@angular/core';
import { singleTemplateRespone, templateResponse,UpdateEmailTemplateData} from '../../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})

export class EmailTemplatesService {

  http: HttpClient = inject(HttpClient)

  getTemplatesData() {
    return this.http.get<templateResponse>('http://localhost:3000/email-templates');
  }

  getTemplateData(slug:string){
    return this.http.get<singleTemplateRespone>('http://localhost:3000/email-templates/'+slug);
  }

  updateTemplate(slug:string,data:UpdateEmailTemplateData){
    return this.http.put<any>('http://localhost:3000/email-templates/'+slug, data);
  }
}
