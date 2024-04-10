import { NavbarComponent } from "../../navbar/navbar.component";
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UsersService } from "../../../services/users.service";

@Component({
  selector: 'app-user-details',
  standalone: true,
  templateUrl: './user-details.component.html',
  styleUrl: './user-details.component.scss',
  imports: [NavbarComponent, HttpClientModule, RouterLink, RouterLinkActive]
})
export class UserDetailsComponent implements OnInit {
  isloading = true;
  id?: any;
  httpClient = inject(HttpClient);
  userServices : UsersService = inject(UsersService);
  userData?: any;
  showData: any;
  constructor(private activatedRoute: ActivatedRoute, private toastr: ToastrService, private router: Router) { }

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    this.id = id;
    this.fetchData()
  }

  fetchData() {
    this.userServices.fetchUserDetails(this.id).subscribe({next:(resp:any)=>{
      this.userData = resp;
      this.isloading = false;
    },
  error:(error)=>{
      this.router.navigate(['/users']);
      return
    alert("hello")
    console.log(error)
  }});
  }

  // (data: any) => {
  //   this.userData = data;
  //   console.log(data.msg)
  //   if(data.msg=="User not found"){
  //     this.router.navigate(['/login']);
  //     alert("hello")
  //   }

  //   if (data.status == 401) {
  //     this.toastr.error('Session Expired');
  //     localStorage.clear()
  //     this.router.navigate(['../login']);
  //   }
    // this.isloading = false;
  // }

  convertTimestampToDateTime(timestamp: string | number | Date) {
    if (timestamp == null) {
      return "N/A"
    }
    const dateTimeUTC = new Date(timestamp);
    return dateTimeUTC.toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });
  }
}
