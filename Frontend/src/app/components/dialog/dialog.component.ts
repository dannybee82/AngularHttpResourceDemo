import { Component, input, InputSignal, output, OutputEmitterRef } from '@angular/core';
import { Dialog } from '../../models/dialog/dialog.interface';
import { DialogType } from '../../models/dialog/dialog-type.enum';
import { MatIconModule } from '@angular/material/icon'; 
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-dialog',
  imports: [MatIconModule, MatButtonModule],
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.scss'
})
export class DialogComponent {

  dialog: InputSignal<Dialog | null> = input<Dialog | null>(null);

  getConfirmation: OutputEmitterRef<boolean> = output<boolean>()

  closeDialog() : void {
    this.getConfirmation.emit(false);
  }

  cancel() : void {
    this.getConfirmation.emit(false);
  }

  ok() : void {
    this.getConfirmation.emit(true);
  }

  getType(): typeof DialogType {
    return DialogType;
  }

}