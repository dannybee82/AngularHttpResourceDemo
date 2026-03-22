import { computed, inject, Injectable, ResourceStatus, Signal } from "@angular/core";
import { GenericsAllInterface } from "./generics-all.interface";
import { GenericsShared } from "../shared/generics-shared.interface";
import { httpResource, HttpResourceRef } from "@angular/common/http";
import { RESOURCE_CONFIG } from "../tokens/resource.config";
import { environment } from "../../../../environments/environment";

@Injectable({
  providedIn: 'root'
})  
export class GenericsAllService<T> implements GenericsAllInterface<T>, GenericsShared {

    private _defaultValue: T[] | undefined = undefined;
    private readonly config = inject(RESOURCE_CONFIG);  
    private readonly api = environment.endpoint;  
    
    private readonly getAllResource: HttpResourceRef<T[] | undefined> = httpResource<T[] | undefined>(
        () => (this.config.controller && this.config.methodGetAll) ? `${this.api}${this.config.controller}/${this.config.methodGetAll}` : undefined,
        {
            defaultValue: this._defaultValue
        }       
    );
    
    readonly data: Signal<T[] | undefined> = this.getAllResource.value;
    readonly isLoading: Signal<boolean> = this.getAllResource.isLoading;
    readonly error: Signal<Error | undefined> = this.getAllResource.error;
    readonly status: Signal<ResourceStatus> = this.getAllResource.status;
    readonly statusCode: Signal<number | undefined> = this.getAllResource.statusCode;
    readonly hasValue: Signal<boolean> = computed(() => this.getAllResource.hasValue());

    reload(): void {
        this.getAllResource.reload();
    }

    destroy(): void {
        this.getAllResource.destroy();
    }

}