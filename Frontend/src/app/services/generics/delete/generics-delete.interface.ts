import { Signal, WritableSignal } from "@angular/core";

export interface GenericsDeleteInterface {
    id: WritableSignal<number | undefined>;

    data: WritableSignal<boolean | undefined>;

    hasValue: Signal<boolean>;
}