import { GenericsDeleteInterface } from "./generics-delete.interface";
import { GenericsShared } from "../shared/generics-shared.interface";
import { computed, inject, ResourceStatus, Signal, signal, WritableSignal } from "@angular/core";
import { httpResource, HttpResourceRef } from "@angular/common/http";
import { RESOURCE_CONFIG } from "../tokens/resource.config";
import { environment } from "../../../../environments/environment";

export class GenericsDeleteService implements GenericsDeleteInterface, GenericsShared {

  private readonly config = inject(RESOURCE_CONFIG);  
  private readonly api = environment.endpoint;  

  readonly id: WritableSignal<number | undefined> = signal(undefined);  

  deleteResource: HttpResourceRef<boolean | undefined> = httpResource<boolean | undefined>(
    () => (this.config.controller && this.config.methodDelete && this.id())
      ?
        {
          url: `${this.api}${this.config.controller}/${this.config.methodDelete}?id=${this.id()}`,
          method: 'DELETE'
        }
      :
        undefined    
  );

  readonly data: WritableSignal<boolean | undefined> = this.deleteResource.value;
  readonly isLoading: Signal<boolean> = this.deleteResource.isLoading;
  readonly error: Signal<any> = this.deleteResource.error;
  readonly status: Signal<ResourceStatus> = this.deleteResource.status;
  readonly statusCode: Signal<number | undefined> = this.deleteResource.statusCode;
  readonly hasValue: Signal<boolean> = computed(() => this.deleteResource.hasValue());

  destroy(): void {
    this.deleteResource.destroy();
  }

}