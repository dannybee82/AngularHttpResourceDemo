import { Component, input, InputSignal, OnInit } from '@angular/core';
import { AvatarPerson } from '../../models/avatar/avatar-person.interface';
import { GenericsByIdClass } from '../../services/generics/by_id/generics-by-id.abstract';
import { environment } from '../../../environments/environment';
import { AllMaterialsModule } from '../../all-materials.module';
import { TitleCasePipe } from '@angular/common';

const api: string = environment.endpoint;

@Component({
  selector: 'app-avatars-details',
  imports: [
    AllMaterialsModule,
    TitleCasePipe
  ],
  templateUrl: './avatars-details.component.html',
  styleUrl: './avatars-details.component.scss'
})
export class AvatarsDetailsComponent extends GenericsByIdClass<AvatarPerson> implements OnInit {

  readonly id: InputSignal<number> = input.required();
  
  ngOnInit(): void {
    this.apiUrl.set(`${api}Avatar/GetById`);
    this.targetId.set(this.id());
  }

}