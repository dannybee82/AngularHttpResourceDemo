import { HttpParams, httpResource, HttpResourceRef } from "@angular/common/http";
import { WritableSignal, Signal, signal, ResourceStatus } from "@angular/core";
import { GenericsShared } from "../shared/generics-shared.interface";
import { GenericsByParamsInterface } from "./generics-by-params.interface";

export abstract class GenericsByParamsClass<T> implements GenericsByParamsInterface<T>, GenericsShared {

    apiUrl: WritableSignal<string | undefined> = signal(undefined);

    targetParams: WritableSignal<any | undefined> = signal(undefined);

    getByParamsResource: HttpResourceRef<T[] | undefined> = httpResource<T[] | undefined>(
        (): any => {
            if(this.apiUrl() && !this.targetParams()) {
                return this.apiUrl();
            }

            if(this.apiUrl() && this.targetParams()) {
                return {
                    url: this.apiUrl(),
                    body: this.targetParams,
                    params: new HttpParams({ fromObject: {...this.targetParams()} })
                };
            }
                
            return undefined;
        }
    );

    isLoading: Signal<boolean> = this.getByParamsResource.isLoading;
    data: Signal<T[] | undefined> = this.getByParamsResource.value;    
    error: Signal<any> = this.getByParamsResource.error;
    status: Signal<ResourceStatus> = this.getByParamsResource.status;
    statusCode: Signal<number | undefined> = this.getByParamsResource.statusCode;    
    hasValue: boolean = this.getByParamsResource.hasValue();
    
    onParamsChange(params: any): void {
        this.targetParams.set(params);
    }
    
    reload(): void {
        this.getByParamsResource.reload();
    }   

    destroyResource(): void {
        this.getByParamsResource.destroy();
    }

}