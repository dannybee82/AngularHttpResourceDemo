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

  buttonText: InputSignal<string> = input<string>('');
  buttonClass: InputSignal<string> = input<string>('');
  fileExtensions: InputSignal<string> = input<string>('');
  allowMultipleSelection: InputSignal<boolean> = input<boolean>(false);
  isDisabled: InputSignal<boolean> = input<boolean>(false);

  selectedFile: OutputEmitterRef<File> = output<File>();
  selectedFiles: OutputEmitterRef<File[]> = output<File[]>();

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