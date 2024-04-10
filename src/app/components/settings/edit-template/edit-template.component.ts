import { Component, inject } from '@angular/core';
import { NavbarComponent } from "../../navbar/navbar.component";
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { EmailTemplatesService } from '../../../services/email-templates.service';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { MatButtonModule } from '@angular/material/button';
import { ToastrService } from 'ngx-toastr';
import { TemplateData, singleTemplateRespone, templateResponse } from '../../../../interfaces/interfaces';

interface UpdateResponse{
  msg : string
}

@Component({
    selector: 'app-edit-template',
    standalone: true,
    templateUrl: './edit-template.component.html',
    styleUrl: './edit-template.component.scss',
    imports: [NavbarComponent, MatFormFieldModule, MatInputModule,
      MatFormFieldModule,
      MatInputModule,
      FormsModule, CKEditorModule, MatButtonModule, RouterLink]
})
export class EditTemplateComponent {
  title = 'angular';
  public Editor = ClassicEditor;

  isLoading: boolean = true;
  slug: string;
  templateData!: any;
  isButtonDisabled: boolean = true;


  activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  emailTemplateService: EmailTemplatesService = inject(EmailTemplatesService);
  httpClient: HttpClient = inject(HttpClient)

  constructor(private toastr: ToastrService,private router: Router) {
    this.slug = this.activatedRoute.snapshot.paramMap.get('slug') || "";
    this.getTemplateData(this.slug);
  }

  getTemplateData(slug: string) {

      this.emailTemplateService.getTemplateData(slug).subscribe({
        next:(resp:singleTemplateRespone)=>{

          this.templateData = resp.data;
          this.isLoading = false;
        },
        error:(error)=>{
          alert(error)
        }
      })
  }

  updateTemplate() {
    if (this.templateData.et_data == "" || this.templateData.et_subject.trim() == "") {
      this.toastr.error("Fields can't be empty")
    }
    else {

      const data = {
        subject: this.templateData.et_subject,
        body: this.templateData.et_data
      }

        this.emailTemplateService.updateTemplate(this.slug,data).subscribe({
          next:(resp:UpdateResponse)=>{
            this.toastr.success("Template updated")
            this.router.navigate(['../../settings']);
          },error:(error)=>{
            this.toastr.error("Error in update")
            alert(error)
          }
        })
    }
  }
}
