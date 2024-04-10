import { Component, OnInit, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthService } from './services/auth.service';
import { Store } from '@ngrx/store';
import { AppState } from './states/app.state';
import { selectRole } from './states/roleState/role.selector';
import { Observable } from 'rxjs';
import { setID, setRole } from './states/roleState/role.actions';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {


  constructor(private store:Store<AppState>,

  ){
  }
  authService: AuthService = inject(AuthService);
  ngOnInit(): void {
    this.authService.me().subscribe({
      next: (resp:any)=>{
        this.store.dispatch(setRole({ role_slug: resp.data.role_slug }));
        this.store.dispatch(setID({ id: resp.data.id }));
      }
    })
  }
  title = 'user-management-admin';
}
