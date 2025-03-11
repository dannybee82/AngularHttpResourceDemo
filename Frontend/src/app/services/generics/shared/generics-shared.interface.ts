import { ResourceStatus, Signal, WritableSignal } from "@angular/core";

export interface GenericsShared {    
    apiUrl: WritableSignal<string | undefined>;

    isLoading: Signal<boolean>;
    
    error: Signal<any>;

    status: Signal<ResourceStatus>;

    statusCode: Signal<number | undefined>;

    destroyResource(): void;
}