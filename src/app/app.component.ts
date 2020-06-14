import { Component } from '@angular/core';
import { Ng2ImgMaxService } from 'ng2-img-max';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  fileUrl;
  uploadedImage: Blob;

  title = 'anamorphic-desqueeze';

  constructor(private ng2ImgMax: Ng2ImgMaxService,public sanitizer: DomSanitizer) {

  }

  onImageChange(event) {
    let image = event.target.files[0];
  
    this.ng2ImgMax.resizeImage(image, 400, 300).subscribe(
      result => {
        this.uploadedImage = new File([result], result.name);
        this.downloadFile(this.uploadedImage);
        console.log("IMG",this.uploadedImage)
      },
      error => {
        console.log('😢 Oh no!', error);
      }
    );
  }

  downloadFile(data) {

    const blob = new Blob([data], { type: 'data:image/jpeg;base64' });

    this.fileUrl = this.sanitizer.bypassSecurityTrustResourceUrl(window.URL.createObjectURL(blob));
  }

}
