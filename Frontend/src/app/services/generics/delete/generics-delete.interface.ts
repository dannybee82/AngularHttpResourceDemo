import { HttpResourceRef } from "@angular/common/http";
import { WritableSignal } from "@angular/core";

export interface GenericsDeleteInterface {
    targetId: WritableSignal<number>;

    deleteResource: HttpResourceRef<boolean | undefined>;

    data: WritableSignal<boolean | undefined>;

    onTargetIdChange(id: number): void;
}