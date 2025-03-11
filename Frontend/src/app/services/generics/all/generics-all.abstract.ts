import { ResourceStatus, signal, Signal, WritableSignal } from "@angular/core";
import { GenericsAllInterface } from "./generics-all.interface";
import { GenericsShared } from "../shared/generics-shared.interface";
import { httpResource, HttpResourceRef } from "@angular/common/http";

export abstract class GenericsAllClass<T> implements GenericsAllInterface<T>, GenericsShared {

    apiUrl: WritableSignal<string | undefined> = signal(undefined);

    getAllResource: HttpResourceRef<T[] | undefined> = httpResource<T[] | undefined>(
        () => this.apiUrl()
    );
    
    data: Signal<T[] | undefined> = this.getAllResource.value;
    isLoading: Signal<boolean> = this.getAllResource.isLoading;
    error: Signal<any> = this.getAllResource.error;
    status: Signal<ResourceStatus> = this.getAllResource.status;
    statusCode: Signal<number | undefined> = this.getAllResource.statusCode;
    hasValue: boolean = this.getAllResource.hasValue();    

    reload(): void {
        this.getAllResource.reload();
    }

    destroyResource(): void {
        this.getAllResource.destroy();
    }

}