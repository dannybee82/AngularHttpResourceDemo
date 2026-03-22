import { computed, inject, ResourceStatus, Signal, signal, WritableSignal } from "@angular/core";
import { GenericsShared } from "../shared/generics-shared.interface";
import { GenericsCreateInterface } from "./generics-create.interface";
import { httpResource, HttpResourceRef } from "@angular/common/http";
import { RESOURCE_CONFIG } from "../tokens/resource.config";
import { environment } from "../../../../environments/environment";

export class GenericsCreateService<T> implements GenericsCreateInterface<T>, GenericsShared {

    readonly entity: WritableSignal<T | undefined> = signal(undefined);

    private readonly config = inject(RESOURCE_CONFIG);  
    private readonly api = environment.endpoint;  

    private readonly createResource: HttpResourceRef<boolean | undefined> = httpResource<boolean | undefined>(
        () => (this.config.controller && this.config.methodCreate && this.entity()) 
        ?
            {
                url: `${this.api}${this.config.controller}/${this.config.methodCreate}`,
                method: 'POST',
                body: this.entity()
            } 
        : 
            undefined
    );

    readonly data: WritableSignal<boolean | undefined> = this.createResource.value;
    readonly isLoading: Signal<boolean> = this.createResource.isLoading;
    readonly error: Signal<any> = this.createResource.error;
    readonly status: Signal<ResourceStatus> = this.createResource.status;
    readonly statusCode: Signal<number | undefined> = this.createResource.statusCode;
    readonly hasValue: Signal<boolean> = computed(() => this.createResource.hasValue());

    destroy(): void {
        this.createResource.destroy();
    }

}