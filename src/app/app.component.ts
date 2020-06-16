import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  fileUrl = '';
  showDownload;
  fileName;

  title = 'anamorphic-desqueeze';

  constructor(public sanitizer: DomSanitizer) {

  }

  onImageChange(event) {
    this.showDownload = false;
    this.fileUrl = '';

    var removeExtension = event.target.files[0].name;
    removeExtension = removeExtension.substring(0, removeExtension.indexOf('.'));

    this.fileName = removeExtension + "_converted.jpg";

    this.handleImage(event);

  }




  handleImage(e) {
    var canvas = <HTMLCanvasElement>document.createElement("canvas");
    var ctx = canvas.getContext("2d");

    var reader = new FileReader();

    reader.onload = (event) => {
      var img = new Image();
      img.onload = () => {
        let newheight =  parseInt((img.width / 2.35).toFixed(0));
        canvas.width = img.width;
        canvas.height = newheight;
        ctx.drawImage(img, 0, 0, img.width, newheight);
        var image = canvas.toDataURL("image/jpg");
        this.fileUrl = image;
        if (this.fileUrl != '') {
          this.showDownload = true;
        }
      }
      img.src = event.target.result as string;
    }

    reader.readAsDataURL(e.target.files[0]);
  }




}
