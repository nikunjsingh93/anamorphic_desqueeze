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


    this.compressImage(event.target.files[0],3840,919);


  }

   compressImage(src, newX, newY) {
   
      const img = new Image();
      img.src = src;
      console.log("in compp",img)
      
      setTimeout( () => {
        const elem = document.createElement('canvas');
        elem.width = newX;
        elem.height = newY;
        const ctx = elem.getContext('2d');
        ctx.drawImage(img, 0, 0, newX, newY);
        const data = ctx.canvas.toDataURL("image/jpeg");
        console.log("in load",data)
        var image = new Image();
        image.src = data;
        this.downloadFile(image);

      }, 1000);
      
    
  }



  downloadFile(data) {

    console.log("in down",data);

    const blob = new Blob([data], { type: 'data:image/jpeg;base64' });

    this.fileUrl = this.sanitizer.bypassSecurityTrustResourceUrl(window.URL.createObjectURL(blob));
  }

 
}
