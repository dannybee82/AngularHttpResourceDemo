import { Injectable } from '@angular/core';
import { GenericsDeleteClass } from '../generics/delete/generics-delete.abstract';

@Injectable({
  providedIn: 'root'
})
export class AvatarDeleteService extends GenericsDeleteClass {

  constructor() {
    super();
  }
  
}