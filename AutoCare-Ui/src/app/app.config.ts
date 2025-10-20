import {ApplicationConfig, provideZoneChangeDetection} from '@angular/core';
import {provideRouter, withHashLocation} from '@angular/router';

import {routes} from './app.routes';
import {provideClientHydration, withNoHttpTransferCache} from '@angular/platform-browser';
import {provideHttpClient, withFetch, withInterceptorsFromDi} from "@angular/common/http";
import {provideAnimations} from "@angular/platform-browser/animations";

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes), provideClientHydration(),
    provideZoneChangeDetection({eventCoalescing: true}),
    provideRouter(routes, withHashLocation()),
    provideClientHydration(withNoHttpTransferCache()),
    provideHttpClient(withFetch(), withInterceptorsFromDi()),
    provideAnimations(),
  ]
};
