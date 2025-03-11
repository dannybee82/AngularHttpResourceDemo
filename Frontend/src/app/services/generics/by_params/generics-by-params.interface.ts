import { HttpResourceRef } from "@angular/common/http";
import { Signal, WritableSignal } from "@angular/core";

export interface GenericsByParamsInterface<T> {
    targetParams: WritableSignal<any | undefined>;

    getByParamsResource: HttpResourceRef<T[] | undefined>;
   
    data: Signal<T[] | undefined>;    

    onParamsChange(params: any): void;

    hasValue: boolean;

    reload(): void;
}