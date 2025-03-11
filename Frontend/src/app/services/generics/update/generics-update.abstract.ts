import { ResourceStatus, Signal, signal, WritableSignal } from "@angular/core";
import { GenericsShared } from "../shared/generics-shared.interface";
import { GenericsUpdateInterface } from "./generics-update.interface";
import { httpResource, HttpResourceRef } from "@angular/common/http";

export abstract class GenericsUpdateClass<T> implements GenericsUpdateInterface<T>, GenericsShared {

    apiUrl: WritableSignal<string | undefined> = signal(undefined);

    entity: WritableSignal<T | undefined> = signal(undefined);

    updateResource: HttpResourceRef<boolean | undefined> = httpResource<boolean | undefined>(() => {
        if(this.apiUrl() && this.entity()) {
            return {
                url: `${this.apiUrl()}`,
                method: 'PUT',
                body: this.entity()  
            };
        }

        return undefined;             
    });

    data: WritableSignal<boolean | undefined> = this.updateResource.value;
    isLoading: Signal<boolean> = this.updateResource.isLoading;
    error: Signal<any> = this.updateResource.error;
    status: Signal<ResourceStatus> = this.updateResource.status;
    statusCode: Signal<number | undefined> = this.updateResource.statusCode;

    onChangeEntity(entity: T): void {
        this.entity.set(entity);
    }

    destroyResource(): void {
        this.updateResource.destroy();
    }  

}