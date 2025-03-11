import { ResourceStatus, Signal, signal, WritableSignal } from "@angular/core";
import { GenericsShared } from "../shared/generics-shared.interface";
import { GenericsCreateInterface } from "./generics-create.interface";
import { httpResource, HttpResourceRef } from "@angular/common/http";

export abstract class GenericsCreateClass<T> implements GenericsCreateInterface<T>, GenericsShared {

    apiUrl: WritableSignal<string | undefined> = signal(undefined);

    entity: WritableSignal<T | undefined> = signal(undefined);

    createResource: HttpResourceRef<boolean | undefined> = httpResource<boolean | undefined>(() => {
        if(this.apiUrl() && this.entity()) {
            return {
                url: `${this.apiUrl()}`,
                method: 'POST',
                body: this.entity()   
            };
        }

        return undefined;             
    });

    data: WritableSignal<boolean | undefined> = this.createResource.value;
    isLoading: Signal<boolean> = this.createResource.isLoading;
    error: Signal<any> = this.createResource.error;
    status: Signal<ResourceStatus> = this.createResource.status;
    statusCode: Signal<number | undefined> = this.createResource.statusCode;

    onChangeEntity(entity: T): void {
        this.entity.set(entity);
    }

    destroyResource(): void {
        this.createResource.destroy();
    }

}