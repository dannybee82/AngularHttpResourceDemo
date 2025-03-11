import { Injectable } from '@angular/core';
import { AvatarPerson } from '../../models/avatar/avatar-person.interface';
import { GenericsByIdClass } from '../generics/by_id/generics-by-id.abstract';

@Injectable({
  providedIn: 'root'
})
export class AvatarByIdService extends GenericsByIdClass<AvatarPerson> {

  constructor() {
    super();
  }

}