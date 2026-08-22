import { InjectionToken } from '@angular/core';  
  
export interface ResourceConfig {  
  controller: string;  
  methodGetAll?: string;  
  methodGetAllById?: string;
  methodByParams?: string;  
  methodById?: string;
  methodCreate?: string;
  methodUpdate?: string;
  methodDelete?: string;
}  
  
export const RESOURCE_CONFIG = new InjectionToken<ResourceConfig>('RESOURCE_CONFIG');