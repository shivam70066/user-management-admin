import { usersData } from './../../../../interfaces/interfaces';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { ActivatedRoute, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { NavbarComponent } from '../../navbar/navbar.component';
import { ToastrService } from 'ngx-toastr';
import { BasicSettingsService } from '../../../services/basic-settings.service';

@Component({
  selector: 'app-edit-basic-settings',
  standalone: true,
  imports: [NavbarComponent, HttpClientModule, RouterLink, RouterLinkActive,
    FormsModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule,
    MatButtonModule, MatRadioModule,
    HttpClientModule, MatIconModule, RouterLink, MatSelectModule],
  templateUrl: './edit-basic-settings.component.html',
  styleUrl: './edit-basic-settings.component.scss'
})
export class EditBasicSettingsComponent {
  isloading = true;
  httpClient = inject(HttpClient);
  settingServices: BasicSettingsService = inject(BasicSettingsService);
  userform:any;
  rowsPerPage?: number;
  userData : boolean = true;




  ngOnInit(): void {
    this.settingServices.getSettingsData().subscribe({
      next: (resp: any) => {
        this.rowsPerPage = resp.data.filter((obj: any) => obj.setting_key === "rows_per_page")[0].setting_value;
        this.setForm();
      }
    })

  }

  setForm() {
    this.userform = this.builder.group({
      rowsPerPage: this.builder.control(this.rowsPerPage,),
    });
    this.userData = false
  }

  update() {
    this.settingServices.saveRowsPerPage(this.userform.value).subscribe({
      next:(resp:any)=>{
        this.toastr.success("Settings Saved")
        this.router.navigate(['../settings'])
      }
    })
  }
  constructor(private builder: FormBuilder, private router: Router,
    private toastr: ToastrService, private activatedRoute: ActivatedRoute) {

  }

}
