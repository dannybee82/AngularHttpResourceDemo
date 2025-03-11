import { AvatarCharacteristic } from "./avatar-characteristic.interface";
import { AvatarImage } from "./avatar-image.interface";

export interface AvatarPerson {
	id?: number,
	name: string,
	age: number,
	avatarImage?: AvatarImage,
	avatarCharacteristic?: AvatarCharacteristic
}
