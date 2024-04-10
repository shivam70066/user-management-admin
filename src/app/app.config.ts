import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideToastr } from 'ngx-toastr';
import { provideAnimations } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, provideHttpClient, withFetch, withInterceptors, withInterceptorsFromDi } from '@angular/common/http';
import { addTokenInterceptor } from './interceptor/add-token.interceptor';
import { provideState, provideStore } from '@ngrx/store';
import { roleReducer } from './states/roleState/role.reducer';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes),
  provideAnimationsAsync(),
  provideAnimations(),
  provideToastr({
    positionClass: 'toast-bottom-center',
  }),
  provideHttpClient(withFetch(), withInterceptors([addTokenInterceptor])),
  provideStore(),
  provideState({ name: 'role_slug', reducer: roleReducer })
  ]
};
