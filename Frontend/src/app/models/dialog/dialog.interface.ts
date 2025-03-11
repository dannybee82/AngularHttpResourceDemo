import { DialogType } from "./dialog-type.enum"

export interface Dialog {
    dialogType: DialogType,
    dialogTitle: string,
    dialogMessage: string,
    dialogAdditionalText?: string,
    dialogCancellationText: string,
    dialogConfirmationText: string,
    dialogConfirmationIcon?: string
}