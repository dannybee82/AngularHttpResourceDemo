import { Component, inject, input, InputSignal, OnInit, effect } from '@angular/core';
import { AvatarPerson } from '../../models/avatar/avatar-person.interface';
import { GenericsByIdService } from '../../services/generics/by_id/generics-by-id';
import { AllMaterialsModule } from '../../all-materials.module';
import { TitleCasePipe } from '@angular/common';
import { RESOURCE_CONFIG } from '../../services/generics/tokens/resource.config';
import { ToastService } from '../../services/toast/toast-service';

@Component({
  selector: 'app-avatars-details',
  imports: [AllMaterialsModule, TitleCasePipe],
  templateUrl: './avatars-details.html',
  styleUrl: './avatars-details.scss',
  providers: [  
    GenericsByIdService<AvatarPerson>,  
    {  
      provide: RESOURCE_CONFIG,  
      useValue: {  
        controller: 'Avatar',  
        methodById: 'GetById' 
      }  
    }  
  ]
})
export class AvatarsDetails implements OnInit {

  readonly id: InputSignal<number> = input.required();
  
  protected readonly avatarService = inject(GenericsByIdService<AvatarPerson>);
  private readonly toastr = inject(ToastService);
  
  constructor() {
    effect(() => {
      if(this.avatarService.error()) {
        this.toastr.show('Can\'t fetch Avatar by Id', 'error');
      }
    });
  }

  ngOnInit(): void {
    const params: Record<string, any> = {
     "Id": this.id()
    };
    this.avatarService.params.set(params);
  }

}