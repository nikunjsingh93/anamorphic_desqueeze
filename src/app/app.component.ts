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

  imgSrc = '';

  title = 'anamorphic-desqueeze';

  constructor(public sanitizer: DomSanitizer) {

  }

  onImageChange(event) {

    this.handleImage(event);

  }




  handleImage(e){
    var canvas = <HTMLCanvasElement> document.getElementById("canvas");
    var ctx = canvas.getContext("2d");

    var reader = new FileReader();
    
    reader.onload = (event) => {
        var img = new Image();
        img.onload = () => {
            canvas.width = 3840;
            canvas.height = 1634;
            ctx.drawImage(img,0,0,3840,1634);
            var image = canvas.toDataURL("image/jpg");
            this.fileUrl = image;
        }
        img.src = event.target.result as string;
        this.imgSrc = img.src;
    }
 
    reader.readAsDataURL(e.target.files[0]);  
}



 
}
