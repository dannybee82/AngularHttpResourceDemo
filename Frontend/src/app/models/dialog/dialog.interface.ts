import { DialogType } from "./dialog-type.enum"

export interface DialogInterface {
    dialogType: DialogType,
    dialogTitle: string,
    dialogMessage: string,
    dialogAdditionalText?: string,
    dialogCancellationText: string,
    dialogConfirmationText: string,
    dialogConfirmationIcon?: string
}