import { Component, inject, input, InputSignal, OnInit } from '@angular/core';
import { AvatarPerson } from '../../models/avatar/avatar-person.interface';
import { GenericsByIdService } from '../../services/generics/by_id/generics-by-id';
import { AllMaterialsModule } from '../../all-materials.module';
import { TitleCasePipe } from '@angular/common';
import { RESOURCE_CONFIG } from '../../services/generics/tokens/resource.config';

@Component({
  selector: 'app-avatars-details',
  imports: [AllMaterialsModule, TitleCasePipe],
  templateUrl: './avatars-details.component.html',
  styleUrl: './avatars-details.component.scss',
  providers: [  
    GenericsByIdService,  
    {  
      provide: RESOURCE_CONFIG,  
      useValue: {  
        controller: 'Avatar',  
        methodById: 'GetById' 
      }  
    }  
  ]
})
export class AvatarsDetailsComponent implements OnInit {

  readonly id: InputSignal<number> = input.required();
  
  protected readonly avatarService = inject(GenericsByIdService<AvatarPerson>);

  ngOnInit(): void {
    this.avatarService.id.set(this.id());
  }

}