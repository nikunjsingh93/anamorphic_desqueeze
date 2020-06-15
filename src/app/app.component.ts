import { Component } from '@angular/core';
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

  constructor(public sanitizer: DomSanitizer) {

  }

  onImageChange(event) {

    const fileName = event.target.files[0].name;

    let img = new Image();

    img = event.target.files[0];


    this.downloadFile(img);


  }

  downloadFile(data) {

    const blob = new Blob([data], { type: 'data:image/jpeg;base64' });

    this.fileUrl = this.sanitizer.bypassSecurityTrustResourceUrl(window.URL.createObjectURL(blob));
  }

 
}
