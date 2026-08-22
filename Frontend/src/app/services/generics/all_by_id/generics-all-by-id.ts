import { computed, inject, Injectable, ResourceStatus, signal, Signal, WritableSignal } from "@angular/core";
import { GenericsShared } from "../shared/generics-shared.interface";
import { HttpParams, httpResource, HttpResourceRef } from "@angular/common/http";
import { RESOURCE_CONFIG } from "../tokens/resource.config";
import { environment } from "../../../../environments/environment";
import { GenericsAllByIdInterface } from "./generics-all-by-id.interface";

@Injectable({
  providedIn: 'root'
})  
export class GenericsAllByIdService<T> implements GenericsAllByIdInterface<T>, GenericsShared {

    private _defaultValue: T[] | undefined = undefined;
    private readonly config = inject(RESOURCE_CONFIG);  
    private readonly api = environment.endpoint;  

    readonly params: WritableSignal<Record<string, any> | undefined> = signal(undefined);
    
    private readonly getAllByIdResource: HttpResourceRef<T[] | undefined> = httpResource<T[] | undefined>(
        () => (this.config.controller && this.config.methodGetAllById && this.params()) ? 
            {
                method: 'GET',
                url: `${this.api}${this.config.controller}/${this.config.methodGetAllById}`,
                params: this. getHttpParams()
            } :
            undefined,
        {
            defaultValue: this._defaultValue
        }       
    );
    
    readonly data: Signal<T[] | undefined> = this.getAllByIdResource.value;
    readonly isLoading: Signal<boolean> = this.getAllByIdResource.isLoading;
    readonly error: Signal<Error | undefined> = this.getAllByIdResource.error;
    readonly status: Signal<ResourceStatus> = this.getAllByIdResource.status;
    readonly statusCode: Signal<number | undefined> = this.getAllByIdResource.statusCode;
    readonly hasValue: Signal<boolean> = computed(() => this.getAllByIdResource.hasValue());

    reload(): void {
        this.getAllByIdResource.reload();
    }

    destroy(): void {
        this.getAllByIdResource.destroy();
    }

    private getHttpParams(): HttpParams {
        let params: HttpParams = new HttpParams();
            
        if(this.params()) {
        for (const [key, value] of Object.entries(this.params()!)) {
            params = params.append(key, value.toString());
        }
        }    

     return params;
  }

}