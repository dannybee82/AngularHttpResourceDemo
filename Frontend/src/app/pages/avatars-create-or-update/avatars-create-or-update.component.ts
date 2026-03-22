import { Component, computed, effect, inject, input, InputSignal, ResourceStatus, Signal, signal, WritableSignal } from '@angular/core';
import { AllMaterialsModule } from '../../all-materials.module';
import { OpenFileComponent } from '../../components/open-file/open-file.component';
import { MatDialog } from '@angular/material/dialog';
import { ImageCropperComponent } from '../../components/image-cropper/image-cropper.component';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { AvatarPerson } from '../../models/avatar/avatar-person.interface';
import { Router } from '@angular/router';
import { DialogComponent } from '../../components/dialog/dialog.component';
import { Dialog } from '../../models/dialog/dialog.interface';
import { DialogType } from '../../models/dialog/dialog-type.enum';
import { GenericsByIdService } from '../../services/generics/by_id/generics-by-id';
import { GenericsCreateService } from '../../services/generics/create/generics-create';
import { GenericsUpdateService } from '../../services/generics/update/generics-update';
import { GenericsDeleteService } from '../../services/generics/delete/generics-delete';
import { RESOURCE_CONFIG } from '../../services/generics/tokens/resource.config';
import { form, max, min, required, FormField } from '@angular/forms/signals';

@Component({
  selector: 'app-avatars-create-or-update',
  imports: [AllMaterialsModule, OpenFileComponent, DialogComponent, FormField],
  templateUrl: './avatars-create-or-update.component.html',
  styleUrl: './avatars-create-or-update.component.scss',
    providers: [  
    GenericsByIdService, GenericsCreateService, GenericsUpdateService, GenericsDeleteService,  
    {  
      provide: RESOURCE_CONFIG,  
      useValue: {  
        controller: 'Avatar',  
        methodById: 'GetById',
        methodCreate: 'Create',
        methodUpdate: 'Update',
        methodDelete: 'Delete'
      }  
    }  
  ]
})
export class AvatarsCreateOrUpdateComponent {

  readonly mode: InputSignal<string> = input.required();
  readonly id: InputSignal<number> = input.required();

  private readonly byIdService = inject(GenericsByIdService<AvatarPerson>);  
  private readonly createService = inject(GenericsCreateService<AvatarPerson>);  
  private readonly updateService = inject(GenericsUpdateService<AvatarPerson>);
  private readonly deleteService = inject(GenericsDeleteService);
  protected readonly dialog = inject(MatDialog);
  private readonly toastr = inject(ToastrService);
  private readonly router = inject(Router);

  readonly isUpdateMode: Signal<boolean> = computed(() => this.mode() === 'update');

  readonly avatar = this.byIdService.data;  
  readonly isLoading = this.byIdService.isLoading;  
  readonly error: Signal<Error | undefined> = this.byIdService.error;

  protected previewImageData: WritableSignal<string> = signal('');
  protected showDialog: WritableSignal<boolean> = signal(false);
  
  dialogData: Dialog = {
    dialogType: DialogType.WARNING,
    dialogTitle: 'Delete Avatar',
    dialogMessage: '',
    dialogCancellationText: 'Cancel',
    dialogConfirmationText: 'Delete',
    dialogConfirmationIcon: 'delete'
  };

  protected formModel: WritableSignal<AvatarPerson> = signal({
    name: '',
    age: 18,
    avatarCharacteristic: {
      hairColor: 'blond',
      eyeColor: 'blue',
      hasEarrings: false
    },
    avatarImage: {
      base64: ''
    }
  });
  protected avatarForm = form(this.formModel, (f) => {
    required(f.name),
    required(f.age),
    min(f.age, 18),
    max(f.age, 35)
    required(f.avatarCharacteristic!.hairColor),
    required(f.avatarCharacteristic!.eyeColor)
  });

  constructor() {
    effect(() => {  
      this.byIdService.id.set(this.isUpdateMode() ? this.id() ?? "0" : undefined);  
    });  
  
    effect(() => {  
      const data: AvatarPerson = this.avatar();
      if (data) 
      {
          this.formModel.set(data);
          this.avatarForm().value.set(data);
          this.previewImageData.set(data.avatarImage?.base64 ?? '');
      }  
    });

    effect(() => {
      const resolved: ResourceStatus = 'resolved';
      const error: ResourceStatus = 'error';
      const updateFinished = this.updateService.status();
      const createFinished = this.createService.status();
      const deleteFinished = this.deleteService.status();

      const successMessage: number = updateFinished === resolved ? 0 : createFinished === resolved ? 1 :  deleteFinished === resolved ? 2 : -1;
      const errorMessage: number = updateFinished === error ? 0 : createFinished === error ? 1 :  deleteFinished === error ? 2 : -1;

      switch(successMessage) {
        case 0:
          this.toastr.success('Avatar successfully updated');
          break;
        case 1:
          this.toastr.success('Avatar successfully created');
          break;
        case 2:
          this.toastr.success('Avatar successfully deleted');
          break;
      }

      switch(errorMessage) {
        case 0:
          this.toastr.error('Can\'t update Avatar');
          break;
        case 1:
          this.toastr.error('Can\'t create Avatar');
          break;
        case 2:
          this.toastr.error('Can\'t delete Avatar');
          break;
      }

      if(updateFinished === resolved || createFinished === resolved || deleteFinished === resolved) {
        this.router.navigate(['/']);
      }
    });
  }

  getFile(file: File): void {
    if(file) {
      const _file = URL.createObjectURL(file);

      this.openAvatarEditor(_file).subscribe((result: string) => {
        if (result) {
          this.loadImagePreview(result);
        }
      });
    }
  }

  openAvatarEditor(image: string): Observable<string> {
    const dialogRef = this.dialog.open(ImageCropperComponent, {
      maxWidth: '80vw',
      maxHeight: '80vh',
      data: image,
    });

    return dialogRef.afterClosed();
  }

  removeImage(): void {
    this.previewImageData.set('');
  }  

    submit($event: SubmitEvent): void {    
    $event.preventDefault();

    if(this.avatarForm().valid() && this.previewImageData() !== '') {
      const avatarPerson: AvatarPerson = Object.assign(this.avatarForm().value());
      avatarPerson.avatarImage!.base64 = this.previewImageData();

      if(this.isUpdateMode()) {
        avatarPerson.id = this.byIdService.data().id;
        avatarPerson.avatarCharacteristic!.id = this.byIdService.data().avatarCharacteristic?.id ?? 0;
        avatarPerson.avatarImage!.id = this.byIdService.data().avatarImage?.id ?? 0;
        this.updateService.entity.set(avatarPerson);
      } else {
        this.createService.entity.set(avatarPerson);
      }
    } else {
      this.avatarForm().markAsTouched();
      this.toastr.error('Forms invalid or no image');
    }
  }

  deleteAvatar(): void {
    if(this.isUpdateMode()) {
      this.dialogData.dialogMessage = 'Do you want to delete the Avatar below?';
      this.dialogData.dialogAdditionalText = `Avatar: ${this.byIdService.data().name} - Age: ${this.byIdService.data()!.age}`;
      this.showDialog.set(true);
    }   
  }

  execDelete($event: boolean): void {
    this.dialogData.dialogMessage = '';
    this.dialogData.dialogAdditionalText = '';  
    this.showDialog.set(false);

    if($event) {
      this.deleteService.id.set(this.id());
    }    
  }

  private loadImagePreview(base64string: string): void {
    this.previewImageData.set(base64string);
  }

}