import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import Cropper from 'cropperjs';
import { AllMaterialsModule } from '../../all-materials.module';

export interface CropBoxData {
  left: number,
  top: number,
  width: number,
  height: number
}

@Component({
  selector: 'app-image-cropper',
  templateUrl: './image-cropper.component.html',
  styleUrls: ['./image-cropper.component.scss'],
  imports: [AllMaterialsModule]
})
export class ImageCropperComponent implements OnInit {

  sanitizedUrl!: SafeUrl;
  cropper!: Cropper;

  private _maxWidth: number = 500;
  private _maxHeight: number = 500;
  
	constructor(
    public dialogRef: MatDialogRef<ImageCropperComponent>,
    @Inject(MAT_DIALOG_DATA) public image: string,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.sanitizedUrl = this.sanitizer.bypassSecurityTrustUrl(this.image);
  }

  ngAfterViewInit(): void {
    this.initCropper();
  }

  initCropper(): void {    
    const image = document.getElementById('image_to_crop') as HTMLImageElement;
    this.cropper = new Cropper(image, {
      aspectRatio: 1,
      viewMode: 1,
      guides: false,
      zoomOnTouch: false,
      zoomOnWheel: false,
      restore: false,
      minCropBoxWidth: 150,
      minCropBoxHeight: 500,
      crop: () => {
        this.checkMaxSize();
      }
    });
  }

  getRoundedCanvas(sourceCanvas: any): HTMLCanvasElement {
    var canvas = document.createElement('canvas');
    var context: any = canvas.getContext('2d');
    var width = sourceCanvas.width;
    var height = sourceCanvas.height;

    canvas.width = width;
    canvas.height = height;
    context.imageSmoothingEnabled = true;
    context.drawImage(sourceCanvas, 0, 0, width, height);
    context.globalCompositeOperation = 'destination-in';
    context.beginPath();
    context.arc(
      width / 2,
      height / 2,
      Math.min(width, height) / 2,
      0,
      2 * Math.PI,
      true
    );
    context.fill();
    return canvas;
  }

  crop(): Promise<void> | undefined {
    let roundedImage = document.createElement('img');

    if (roundedImage) {
      return this.getData().then(result => {
        if(result) {
          this.dialogRef.close(result);
        } else {
          this.dialogRef.close('');
        }
      });
    } else {
      this.dialogRef.close(null);
    }

    return undefined;
  }

  close(): void {
    this.dialogRef.close(null);
  }

  reset(): void {
    this.cropper.clear();
    this.cropper.crop();
  }

  private getData(): Promise<string> {
    const croppedCanvas = this.cropper.getCroppedCanvas({width: this._maxWidth, height: this._maxHeight});
    const roundedCanvas = this.getRoundedCanvas(croppedCanvas);

    return new Promise<string>((resolve, reject) => {
      try {
        resolve( roundedCanvas.toDataURL() ); 
      } catch {
        reject;
      }
    });
  }

  private checkMaxSize(): void {
    let sizes: CropBoxData = this.cropper.getCropBoxData();

    if(sizes.width > this._maxWidth || sizes.height > this._maxHeight) {
      sizes.width = sizes.width > this._maxWidth ? this._maxWidth : sizes.width;
      sizes.height = sizes.height > this._maxHeight ? this._maxHeight : sizes.height;

      this.cropper.setCropBoxData(sizes);
    }
  }

}