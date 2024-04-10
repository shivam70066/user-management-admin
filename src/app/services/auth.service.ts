import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { LoginData, LoginResponseData } from '../../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  http: HttpClient = inject(HttpClient);

  authLogin(data: any) {
    return this.http.post<LoginResponseData>('http://localhost:3000/auth/login', data);
  }

}
