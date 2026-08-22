import { Component, inject, signal, WritableSignal, effect } from '@angular/core';
import { AvatarPerson } from '../../models/avatar/avatar-person.interface';
import { Filters } from '../../components/filters/filters';
import { FilterData } from '../../models/filter/filter-data.interface';
import { GenericsByParamsService } from '../../services/generics/by_params/generics-by-params';
import { AllMaterialsModule } from '../../all-materials.module';
import { RouterLink } from '@angular/router';
import { ScrollToTop } from '../../components/scroll-to-top/scroll-to-top';
import { GenericsAllService } from '../../services/generics/all/generics-all';
import { RESOURCE_CONFIG } from '../../services/generics/tokens/resource.config';
import { ToastService } from '../../services/toast/toast-service';

@Component({
  selector: 'app-all-avatars',
  imports: [Filters, AllMaterialsModule, RouterLink, ScrollToTop],
  templateUrl: './all-avatars.html',
  styleUrl: './all-avatars.scss',
    providers: [  
    GenericsAllService<AvatarPerson>, GenericsByParamsService<AvatarPerson>,  
    {  
      provide: RESOURCE_CONFIG,  
      useValue: {  
        controller: 'Avatar',  
        methodGetAll: 'GetAll',  
        methodByParams: 'Filter'  
      }  
    }  
  ]
})
export class AllAvatars {

  protected filterData: WritableSignal<FilterData | undefined> = signal(undefined);

  protected readonly avatarServiceAll = inject(GenericsAllService<AvatarPerson>);
  protected readonly avatarServiceByParams = inject(GenericsByParamsService<AvatarPerson>);
  private readonly toastr = inject(ToastService);

  constructor() {
    effect(() => {
      if(this.service.error()) {
        this.toastr.show('Can\'t fetch all Avatars', 'error');
      }
    });
  }

  filterAvatars($event: FilterData | undefined): void {
    if($event) {
      this.filterData.set($event);   
      this.avatarServiceByParams.params.set($event);   
    } else {
      this.filterData.set(undefined); 
      this.avatarServiceByParams.params.set(undefined);     
    }
  }

  get service() {
    return this.filterData() === undefined ? this.avatarServiceAll : this.avatarServiceByParams;
  }

}