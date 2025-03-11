import { HttpResourceRef } from "@angular/common/http";
import { Signal, WritableSignal } from "@angular/core";

export interface GenericsByIdInterface<T> {
    targetId: WritableSignal<number>;

    getByIdResource: HttpResourceRef<T | undefined>;
   
    data: Signal<T | undefined>;    

    onTargetIdChange(id: number): void;

    hasValue: boolean;

    reload(): void;
}