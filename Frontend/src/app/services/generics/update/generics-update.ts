import { computed, inject, ResourceStatus, Signal, signal, WritableSignal } from "@angular/core";
import { GenericsShared } from "../shared/generics-shared.interface";
import { GenericsUpdateInterface } from "./generics-update.interface";
import { httpResource, HttpResourceRef } from "@angular/common/http";
import { RESOURCE_CONFIG } from "../tokens/resource.config";
import { environment } from "../../../../environments/environment";

export class GenericsUpdateService<T> implements GenericsUpdateInterface<T>, GenericsShared {

    readonly entity: WritableSignal<T | undefined> = signal(undefined);

    private readonly config = inject(RESOURCE_CONFIG);  
    private readonly api = environment.endpoint;  

    private readonly updateResource: HttpResourceRef<boolean | undefined> = httpResource<boolean | undefined>(
        () => (this.config.controller && this.config.methodUpdate && this.entity()) 
        ?
            {
                url: `${this.api}${this.config.controller}/${this.config.methodUpdate}`,
                method: 'PUT',
                body: this.entity()
            } 
        : 
            undefined
    );

    readonly data: WritableSignal<boolean | undefined> = this.updateResource.value;
    readonly isLoading: Signal<boolean> = this.updateResource.isLoading;
    readonly error: Signal<any> = this.updateResource.error;
    readonly status: Signal<ResourceStatus> = this.updateResource.status;
    readonly statusCode: Signal<number | undefined> = this.updateResource.statusCode;    
    readonly hasValue: Signal<boolean> = computed(() => this.updateResource.hasValue());

    destroy(): void {
        this.updateResource.destroy();
    }  

}