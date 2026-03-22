import { Signal } from "@angular/core";

export interface GenericsAllInterface<T> {   
    data: Signal<T[] | undefined>;

    hasValue: Signal<boolean>;

    reload(): void;
}