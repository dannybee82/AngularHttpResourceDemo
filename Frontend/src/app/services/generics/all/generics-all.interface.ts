import { HttpResourceRef } from "@angular/common/http";
import { Signal } from "@angular/core";

export interface GenericsAllInterface<T> {
    getAllResource: HttpResourceRef<T[] | undefined>;
   
    data: Signal<T[] | undefined>;

    hasValue: boolean;

    reload(): void;
}