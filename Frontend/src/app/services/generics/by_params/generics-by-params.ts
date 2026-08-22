import { HttpParams, httpResource, HttpResourceRef } from "@angular/common/http";
import { WritableSignal, Signal, signal, ResourceStatus, inject, computed } from "@angular/core";
import { GenericsShared } from "../shared/generics-shared.interface";
import { GenericsByParamsInterface } from "./generics-by-params.interface";
import { RESOURCE_CONFIG } from "../tokens/resource.config";
import { environment } from "../../../../environments/environment";

export class GenericsByParamsService<T> implements GenericsByParamsInterface<T>, GenericsShared {

    private readonly config = inject(RESOURCE_CONFIG);  
    private readonly api = environment.endpoint;  

    readonly params: WritableSignal<any | undefined> = signal(undefined);
    readonly additionalParams: WritableSignal<Record<string, any> | undefined> = signal(undefined);

    private readonly getByParamsResource: HttpResourceRef<T | undefined> = httpResource<T | undefined>(        
        () => (this.config.controller && this.config.methodByParams) 
            ? 
                {
                    method: 'GET',
                    url: `${this.api}${this.config.controller}/${this.config.methodByParams}`,
                    params: this.getHttpParams()
                }                
            : 
                undefined
    );

    readonly isLoading: Signal<boolean> = this.getByParamsResource.isLoading;
    readonly data: Signal<T | undefined> = this.getByParamsResource.value;    
    readonly error: Signal<any> = this.getByParamsResource.error;
    readonly status: Signal<ResourceStatus> = this.getByParamsResource.status;
    readonly statusCode: Signal<number | undefined> = this.getByParamsResource.statusCode;    
    readonly hasValue: Signal<boolean> = computed(() => this.getByParamsResource.hasValue());
        
    reload(): void {
        this.getByParamsResource.reload();
    }   

    destroy(): void {
        this.getByParamsResource.destroy();
    }

    private getHttpParams(): HttpParams {
        let params: HttpParams = this.params() ? new HttpParams({ fromObject: {...this.params()} }) : new HttpParams();
        
        if(this.additionalParams()) {
            for (const [key, value] of Object.entries(this.additionalParams()!)) {
                params = params.append(key, value.toString());
            }
        }

        return params;
    }

}