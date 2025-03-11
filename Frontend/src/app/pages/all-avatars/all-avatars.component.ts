import { Component, OnInit } from '@angular/core';
import { AvatarPerson } from '../../models/avatar/avatar-person.interface';
import { environment } from '../../../environments/environment';
import { FiltersComponent } from '../../components/filters/filters.component';
import { FilterData } from '../../models/filter/filter-data.interface';
import { GenericsByParamsClass } from '../../services/generics/by_params/generics-by-params.abstract';
import { AllMaterialsModule } from '../../all-materials.module';
import { RouterLink } from '@angular/router';
import { ScrollToTopComponent } from '../../components/scroll-to-top/scroll-to-top.component';

const api: string = environment.endpoint;

@Component({
  selector: 'app-all-avatars',
  imports: [
    FiltersComponent,
    AllMaterialsModule,
    RouterLink,
    ScrollToTopComponent
  ],
  templateUrl: './all-avatars.component.html',
  styleUrl: './all-avatars.component.scss'
})
export class AllAvatarsComponent extends GenericsByParamsClass<AvatarPerson> implements OnInit {

  constructor() {
    super();
  }

  ngOnInit(): void {
    this.apiUrl.set(`${api}Avatar/GetAll`);

    if(this.data()) {
      this.reload();
    }
    
    //this.getByParamsResource.reload();
  }
  
  filterAvatars($event: FilterData | undefined): void {
    if($event) {
      this.targetParams.set($event);
      this.apiUrl.set(`${api}Avatar/Filter`);
    } else {
      this.targetParams.set(undefined);
      this.apiUrl.set(`${api}Avatar/GetAll`);
    }
  }

}
