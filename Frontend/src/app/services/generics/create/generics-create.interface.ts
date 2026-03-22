import { Signal, WritableSignal } from "@angular/core";

export interface GenericsCreateInterface<T> {
    entity: WritableSignal<T | undefined>;

    data: WritableSignal<boolean | undefined>;

    hasValue: Signal<boolean>;
}