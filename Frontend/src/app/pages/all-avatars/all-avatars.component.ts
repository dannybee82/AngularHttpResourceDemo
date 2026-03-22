import { Component, inject, signal, WritableSignal } from '@angular/core';
import { AvatarPerson } from '../../models/avatar/avatar-person.interface';
import { FiltersComponent } from '../../components/filters/filters.component';
import { FilterData } from '../../models/filter/filter-data.interface';
import { GenericsByParamsService } from '../../services/generics/by_params/generics-by-params';
import { AllMaterialsModule } from '../../all-materials.module';
import { RouterLink } from '@angular/router';
import { ScrollToTopComponent } from '../../components/scroll-to-top/scroll-to-top.component';
import { GenericsAllService } from '../../services/generics/all/generics-all';
import { RESOURCE_CONFIG } from '../../services/generics/tokens/resource.config';

@Component({
  selector: 'app-all-avatars',
  imports: [FiltersComponent, AllMaterialsModule, RouterLink, ScrollToTopComponent],
  templateUrl: './all-avatars.component.html',
  styleUrl: './all-avatars.component.scss',
    providers: [  
    GenericsAllService, GenericsByParamsService,  
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
export class AllAvatarsComponent {

  protected filterData: WritableSignal<FilterData | undefined> = signal(undefined);

  protected readonly avatarServiceAll = inject(GenericsAllService<AvatarPerson>);
  protected readonly avatarServiceByParams = inject(GenericsByParamsService<AvatarPerson>);
  
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