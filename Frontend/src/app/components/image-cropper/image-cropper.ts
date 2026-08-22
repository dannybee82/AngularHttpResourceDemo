import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import Cropper from 'cropperjs';
import { AllMaterialsModule } from '../../all-materials.module';

@Component({
  selector: 'app-image-cropper',
  templateUrl: './image-cropper.html',
  styleUrls: ['./image-cropper.scss'],
  imports: [AllMaterialsModule]
})
export class ImageCropper implements OnInit {

  sanitizedUrl!: SafeUrl;
  cropper!: Cropper;

  private _maxWidth: number = 400;
  private _maxHeight: number = 400;
  private _minSize: number = 100;
  private _boundCheckMaxSize = this.checkMaxSize.bind(this);
  private _selection: any;
  
	constructor(
    public dialogRef: MatDialogRef<ImageCropper>,
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
    this.cropper = new Cropper(image, {});  
    
    const selection = this.cropper.getCropperSelection()!;  
    selection.aspectRatio = 1;  
    selection.resizable = true;  
    selection.zoomable = false;  
    selection.multiple = false;  
    
    this._selection = selection;  
    
    selection.addEventListener('change', this._boundCheckMaxSize);  
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
    const selection = this.cropper.getCropperSelection()!;  
    selection.$reset();  
  }

  private getData(): Promise<string> {  
    const selection = this.cropper.getCropperSelection()!;  
    const size = Math.min(this._maxWidth, this._maxHeight);  
    return selection.$toCanvas({ width: size, height: size })  
      .then(canvas => this.getRoundedCanvas(canvas).toDataURL());  
  }

  private checkMaxSize(event: Event): void {  
    const customEvent = event as CustomEvent;  
    const detail = customEvent.detail as { x: number; y: number; width: number; height: number };  
    
    const max = this._maxWidth;
    const min = this._minSize;
    
    let { x, y, width, height } = detail;  
    
    // Since aspectRatio = 1, keep width === height. Use the larger dimension  
    // as the driver so the user's intent (growing/shrinking) is preserved.  
    let size = Math.max(width, height);  
    const originalSize = size;  
    
    let clamped = false;  
    if (size > max) { size = max; clamped = true; }  
    if (size < min) { size = min; clamped = true; }  
    
    if (!clamped) {  
      return; // allow the change  
    }  
    
    // Reject the change cropperjs wanted to apply...  
    event.preventDefault();  
    
    // ...and apply our clamped version, keeping the selection centered  
    // on the same point as the proposed change.  
    const newX = x + (width - size) / 2;  
    const newY = y + (height - size) / 2;  
    
    // Defer to avoid recursion inside the event handler  
    queueMicrotask(() => {  
      this._selection.$change(newX, newY, size, size, 1);  
    });  
  }

}