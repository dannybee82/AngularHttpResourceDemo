import { Component, inject, OnInit, output, OutputEmitterRef, signal, WritableSignal } from '@angular/core';
import { AllMaterialsModule } from '../../all-materials.module';
import { FormGroup, UntypedFormGroup, FormsModule, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { FilterData } from '../../models/filter/filter-data.interface';
import { FilterItem } from '../../models/filter/filter-item.interface';
import { TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-filters',
  imports: [
    AllMaterialsModule,
    FormsModule,
    ReactiveFormsModule,
    TitleCasePipe
  ],
  templateUrl: './filters.component.html',
  styleUrl: './filters.component.scss',
  providers: [TitleCasePipe]
})
export class FiltersComponent implements OnInit {
 
  filterForm: UntypedFormGroup = new FormGroup({});

  filterValues: OutputEmitterRef<FilterData | undefined> = output<FilterData | undefined>();

  isFilterOn: WritableSignal<boolean> = signal(false);

  private fb = inject(FormBuilder);
  private titleCasePipe = inject(TitleCasePipe);

  ngOnInit(): void {
    this.filterForm = this.fb.group({
      hairColor: [],
      eyeColor: [],
      hasEarrings: [false]
    });

    this.filterForm.valueChanges.subscribe(() => {
      this.filter();
    });
  }

  private filter(): void {
    const filterData: FilterData = this.getCurrentFilters();

    if(filterData.hairColor || filterData.eyeColor || filterData.hasEarrings === true) {
      this.isFilterOn.set(true);
      this.filterValues.emit(filterData);
    } else {
      this.isFilterOn.set(false);
      this.filterValues.emit(undefined);
    }
  }

  getActiveFilters(): FilterItem[] {
    let arr: FilterItem[] = [];

    const filterData: FilterData = this.getCurrentFilters();

    const keys: string[] = Object.keys(filterData);
    const values: (string[] | boolean)[] = Object.values(filterData);

    for(let i = 0; i < keys.length; i++) {
      if(keys[i] === 'hairColor' || keys[i] === 'eyeColor') {
        if(Array.isArray(values[i])) {
          const valuesArr: string[] = (values[i] as string[]);

          for(let j = 0; j < valuesArr.length; j++) {
            arr.push({ name: keys[i], value: valuesArr[j], title: this.titleCasePipe.transform(keys[i]).replace('color', ' Color') });
          }
        }
      } else {
          arr.push({ name: keys[i], value: 'Yes', title: this.titleCasePipe.transform(keys[i]).replace('earrings', ' Earrings') });
      }
    }

    return arr;
  }

  reset(): void {
    this.filterForm.reset();
    this.isFilterOn.set(false);
    this.filterValues.emit(undefined);
  }

  removeFilter(name: string, value: string): void {
    const filterData: FilterData = this.getCurrentFilters();

    const keys: string[] = Object.keys(filterData);

    const index: number = keys.indexOf(name);

    if(index > -1) {
      const property = keys[index] as keyof typeof filterData;
      const targetValues: (string[] | boolean) | undefined = filterData[property];
      
      if(targetValues) { 
        if(Array.isArray(targetValues)) { 
          let arr: string[] = (targetValues as string[]).filter(item => item !== value);
          
          //@ts-ignore
          filterData[property] = arr.length === 0 ? undefined : arr;
        } else {
          filterData[property] = undefined;
        }
      }

      if(filterData.hairColor || filterData.eyeColor || filterData.hasEarrings === true) {
        this.filterForm.patchValue(filterData);
        this.filter();
      } else {
        this.reset();
      }
    }
  }

  private getCurrentFilters() : FilterData {
    const filterData: FilterData = Object.assign(this.filterForm.value);

    if(!filterData.hairColor) {
      delete filterData.hairColor;      
    }

    if(!filterData.eyeColor) {
      delete filterData.eyeColor;      
    }

    if(!filterData.hasEarrings) {
      delete filterData.hasEarrings;      
    }

    return filterData;
  }

}
