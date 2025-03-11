import { HttpResourceRef } from "@angular/common/http";
import { WritableSignal } from "@angular/core";

export interface GenericsUpdateInterface<T> {
    entity: WritableSignal<T | undefined>;

    updateResource: HttpResourceRef<boolean | undefined>;

    data: WritableSignal<boolean | undefined>;

    onChangeEntity(entity: T): void;    
}