import { GenericsDeleteInterface } from "./generics-delete.interface";
import { GenericsShared } from "../shared/generics-shared.interface";
import { ResourceStatus, Signal, signal, WritableSignal } from "@angular/core";
import { httpResource, HttpResourceRef } from "@angular/common/http";

export class GenericsDeleteClass implements GenericsDeleteInterface, GenericsShared {
    
  apiUrl: WritableSignal<string | undefined> = signal(undefined);

  targetId: WritableSignal<number> = signal(0);

  deleteResource: HttpResourceRef<boolean | undefined> = httpResource<boolean | undefined>(() => {
    if(this.apiUrl() && this.targetId() > 0) {
      return {
        url: `${this.apiUrl()}?id=${this.targetId()}`,
        method: 'DELETE'
      };
    }

    return undefined
  });

  data: WritableSignal<boolean | undefined> = this.deleteResource.value;
  isLoading: Signal<boolean> = this.deleteResource.isLoading;
  error: Signal<any> = this.deleteResource.error;
  status: Signal<ResourceStatus> = this.deleteResource.status;
  statusCode: Signal<number | undefined> = this.deleteResource.statusCode;

  onTargetIdChange(id: number): void {
      this.targetId.set(id);
  }

  destroyResource(): void {
    this.deleteResource.destroy();
  }

}