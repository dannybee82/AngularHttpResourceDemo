import { Signal, WritableSignal } from "@angular/core";

export interface GenericsAllByIdInterface<T> {   
    data: Signal<T[] | undefined>;

    params: WritableSignal<Record<string, any> | undefined>;

    hasValue: Signal<boolean>;

    reload(): void;
}