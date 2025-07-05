import { Component, InputSignal, input, OutputEmitterRef, output } from '@angular/core';
import { AllMaterialsModule } from '../../all-materials.module';

@Component({
  selector: 'app-open-file',
  templateUrl: './open-file.component.html',
  styleUrls: ['./open-file.component.scss'],
  imports: [
    AllMaterialsModule
  ]
})
export class OpenFileComponent {

  readonly buttonText: InputSignal<string> = input<string>('');
  readonly buttonClass: InputSignal<string> = input<string>('');
  readonly fileExtensions: InputSignal<string> = input<string>('');
  readonly allowMultipleSelection: InputSignal<boolean> = input<boolean>(false);
  readonly isDisabled: InputSignal<boolean> = input<boolean>(false);

  readonly selectedFile: OutputEmitterRef<File> = output<File>();
  readonly selectedFiles: OutputEmitterRef<File[]> = output<File[]>();

  onFileSelected(event: Event) {    
    if(event) {
      if(event.target instanceof HTMLInputElement) {
        const input: HTMLInputElement = (event.target as HTMLInputElement);
        
        if(input.files) {
          const files:  FileList = input.files;

          if(!this.allowMultipleSelection()) {
            this.selectedFile.emit(files[0]);
          } else {
            this.selectedFiles.emit(Array.from(files));
          }
        }
      }  
    }
  }

}