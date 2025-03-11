import { ResourceStatus, Signal, signal, WritableSignal } from "@angular/core";
import { GenericsByIdInterface } from "./generics-by-id.interface";
import { GenericsShared } from "../shared/generics-shared.interface";
import { httpResource, HttpResourceRef } from "@angular/common/http";

export abstract class GenericsByIdClass<T> implements GenericsByIdInterface<T>, GenericsShared {

  apiUrl: WritableSignal<string | undefined> = signal(undefined);

  targetId: WritableSignal<number> = signal(0);

  getByIdResource: HttpResourceRef<T | undefined> = httpResource<T | undefined>(
    () => {
      if(this.apiUrl() && this.targetId() > 0) {
        return `${this.apiUrl()}?id=${this.targetId()}`
      }

      return undefined;
    }    
  );

  data: Signal<T | undefined> = this.getByIdResource.value;
  isLoading: Signal<boolean> = this.getByIdResource.isLoading;
  error: Signal<any> = this.getByIdResource.error;
  status: Signal<ResourceStatus> = this.getByIdResource.status;
  statusCode: Signal<number | undefined> = this.getByIdResource.statusCode;
  hasValue: boolean = this.getByIdResource.hasValue();

  reload(): void {
    this.getByIdResource.reload();
  }

  onTargetIdChange(id: number): void {
    this.targetId.set(id);
  }

  destroyResource(): void {
    this.getByIdResource.destroy();
  }

}