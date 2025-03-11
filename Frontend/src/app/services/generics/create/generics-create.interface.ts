import { HttpResourceRef } from "@angular/common/http";
import { WritableSignal } from "@angular/core";

export interface GenericsCreateInterface<T> {
    entity: WritableSignal<T | undefined>;

    createResource: HttpResourceRef<boolean | undefined>;

    data: WritableSignal<boolean | undefined>;

    onChangeEntity(entity: T): void;
}