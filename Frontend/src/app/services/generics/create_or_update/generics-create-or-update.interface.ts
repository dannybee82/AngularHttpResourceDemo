import { HttpResourceRef } from "@angular/common/http";
import { signal, WritableSignal } from "@angular/core";

export interface GenericsCreateOrUpdateInterface<T> {
    method: WritableSignal<'POST' | 'PUT' | undefined>;
    
    entity: WritableSignal<T | undefined>;

    createOrUpdateResource: HttpResourceRef<boolean | undefined>;

    data: WritableSignal<boolean | undefined>;

    onChangeEntity(entity: T): void;
}