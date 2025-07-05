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

  readonly filterValues: OutputEmitterRef<FilterData | undefined> = output<FilterData | undefined>();

  protected isFilterOn: WritableSignal<boolean> = signal(false);

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
      if(this.hasContent(filterData)) {
        this.isFilterOn.set(true);
        this.filterValues.emit(this.sanitizeContent(filterData));
      } else {
        this.isFilterOn.set(false);
        this.filterValues.emit(undefined);
      }      
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
      const property = keys[index] as keyof FilterData;  
      const targetValues = filterData[property];  
        
      if (targetValues) {  
        if (typeof targetValues === 'boolean') {  
          filterData[property] = undefined;  
        } else {  
          // For string array properties  
          // Use a type assertion to tell TypeScript this is a string[] property  
          const stringArrayProperty = property as keyof Pick<FilterData, 'hairColor' | 'eyeColor'>;  
          const workValues = targetValues as string[];  
          let arr = workValues.filter(item => item !== value);  
          filterData[stringArrayProperty] = arr.length === 0 ? [] : arr;  
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

  private hasContent(filterData: FilterData): boolean {
    if(filterData.hairColor || filterData.eyeColor || filterData.hasEarrings === true) {
      if(filterData.hairColor?.length ?? 0 > 0) {
          return true;
      }

      if(filterData.eyeColor?.length ?? 0 > 0) {
        return true;
      }

      return filterData.hasEarrings === true;
    }

    return false;
  }

  private sanitizeContent(filterData: FilterData): FilterData {
    if(filterData.hairColor) {
      if(filterData.hairColor.length === 0) {
        delete filterData.hairColor;
      }
    }

    if(filterData.eyeColor) {
      if(filterData.eyeColor.length === 0) {
        delete filterData.eyeColor;
      }
    }

    return filterData;
  }

}