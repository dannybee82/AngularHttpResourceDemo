import { httpResource, HttpResourceRef } from "@angular/common/http";
import { ResourceStatus, Signal, signal, WritableSignal } from "@angular/core";
import { GenericsCreateOrUpdateInterface } from "./generics-create-or-update.interface";
import { GenericsShared } from "../shared/generics-shared.interface";

export abstract class GenericsCreateOrUpdateClass<T> implements GenericsCreateOrUpdateInterface<T>, GenericsShared {
    
    apiUrl: WritableSignal<string | undefined> = signal(undefined);

    method: WritableSignal<"POST" | "PUT" | undefined> = signal(undefined);
    
    entity: WritableSignal<T | undefined> = signal(undefined);
    
    createOrUpdateResource: HttpResourceRef<boolean | undefined> = httpResource<boolean | undefined>(() => {
        if(this.apiUrl() && this.entity()) {
            return {
                url: `${this.apiUrl()}`,
                method: this.method(),
                body: this.entity()  
            };
        }

        return undefined;             
    });

    data: WritableSignal<boolean | undefined> = this.createOrUpdateResource.value;
    isLoading: Signal<boolean> = this.createOrUpdateResource.isLoading;
    error: Signal<any> = this.createOrUpdateResource.error;
    status: Signal<ResourceStatus> = this.createOrUpdateResource.status;
    statusCode: Signal<number | undefined> = this.createOrUpdateResource.statusCode;

    onChangeEntity(entity: T): void {
        this.entity.set(entity);
    }

    destroyResource(): void {
        this.createOrUpdateResource.destroy();
    }

}