import { Signal, WritableSignal } from "@angular/core";

export interface GenericsByParamsInterface<T> {
    params: WritableSignal<any | undefined>;
   
    data: Signal<T[] | undefined>;    

    hasValue: Signal<boolean>;

    reload(): void;
}