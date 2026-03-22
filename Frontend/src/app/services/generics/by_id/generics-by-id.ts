import { computed, inject, Injectable, ResourceStatus, Signal, signal, WritableSignal } from "@angular/core";
import { GenericsByIdInterface } from "./generics-by-id.interface";
import { GenericsShared } from "../shared/generics-shared.interface";
import { httpResource, HttpResourceRef } from "@angular/common/http";
import { RESOURCE_CONFIG } from "../tokens/resource.config";
import { environment } from "../../../../environments/environment";

@Injectable({
  providedIn: 'root'
})  
export class GenericsByIdService<T> implements GenericsByIdInterface<T>, GenericsShared {

  private _defaultValue: T | undefined = undefined;
  private readonly config = inject(RESOURCE_CONFIG);  
  private readonly api = environment.endpoint;  

  readonly id: WritableSignal<number | undefined> = signal(undefined);

  private readonly getByIdResource: HttpResourceRef<T | undefined> = httpResource<T | undefined>(
    () => (this.config.controller && this.config.methodById && this.id()) ? 
      `${this.api}${this.config.controller}/${ this.config.methodById}?id=${this.id()}` : undefined,
      {
        defaultValue: this._defaultValue
      }
  );

  readonly data: Signal<T | undefined> = this.getByIdResource.value;
  readonly isLoading: Signal<boolean> = this.getByIdResource.isLoading;
  readonly error: Signal<any> = this.getByIdResource.error;
  readonly status: Signal<ResourceStatus> = this.getByIdResource.status;
  readonly statusCode: Signal<number | undefined> = this.getByIdResource.statusCode;
  readonly hasValue: Signal<boolean> = computed(() => this.getByIdResource.hasValue());

  reload(): void {
    this.getByIdResource.reload();
  }

  destroy(): void {
    this.getByIdResource.destroy();
  }

}