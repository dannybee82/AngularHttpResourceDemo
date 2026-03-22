import { ResourceStatus, Signal, WritableSignal } from "@angular/core";

export interface GenericsShared {
    isLoading: Signal<boolean>;
    
    error: Signal<Error | undefined>;

    status: Signal<ResourceStatus>;

    statusCode: Signal<number | undefined>;
    
    hasValue: Signal<boolean>;

    destroy(): void;
}