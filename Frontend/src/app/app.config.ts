import { ApplicationConfig, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { routes } from './app.routes';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material/snack-bar';

export const appConfig: ApplicationConfig = {
  providers: [    
    provideZonelessChangeDetection(),
    provideRouter(routes, withComponentInputBinding()),
    provideNoopAnimations(),
    { 
      provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, 
      useValue: { 
        horizontalPosition: 'center', 
        verticalPosition: 'bottom', 
        duration: 3500 
      } 
    },   
  ]
};