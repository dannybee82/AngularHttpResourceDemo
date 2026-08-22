import { Signal, WritableSignal } from "@angular/core";

export interface GenericsByIdInterface<T> {
    params: WritableSignal<Record<string, any> | undefined>;

    data: Signal<T | undefined>;    

    hasValue: Signal<boolean>;

    reload(): void;
}