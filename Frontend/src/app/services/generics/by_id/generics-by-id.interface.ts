import { Signal, WritableSignal } from "@angular/core";

export interface GenericsByIdInterface<T> {
    id: WritableSignal<number | undefined>;

    data: Signal<T | undefined>;    

    hasValue: Signal<boolean>;

    reload(): void;
}