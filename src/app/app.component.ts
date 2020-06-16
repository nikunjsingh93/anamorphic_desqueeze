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

    const fileName = event.target.files[0].name;

    let img = new Image();

    img = event.target.files[0];


    this.handleImage(event);

    //this.compressImage(event.target.files[0],3840,919);


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


  handleImage(e){
    var canvas = <HTMLCanvasElement> document.getElementById("canvas");
    var ctx = canvas.getContext("2d");

    var reader = new FileReader();


    
    reader.onload = (event) => {
    console.log("in reader onload");
        var img = new Image();
        img.onload = () => {
        console.log("in img onload");
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img,0,0);
        }
        console.log("in strr",event.target.result);
        img.src = event.target.result as string;
        this.imgSrc = img.src;
    }
    console.log("in down read",reader);
    reader.readAsDataURL(e.target.files[0]);  
    if (this.imgSrc != ''){
      console.log("Heha")
      this.downloadFile(this.b64toFile(this.imgSrc));
    }
   
    
}




  b64toFile(dataURI): File {
    // convert the data URL to a byte string
    const byteString = atob(dataURI.split(',')[1]);

    // pull out the mime type from the data URL
    const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]

    // Convert to byte array
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }

    // Create a blob that looks like a file.
    const blob = new Blob([ab], { 'type': mimeString });
    blob['lastModifiedDate'] = (new Date()).toISOString();
    blob['name'] = 'file';
        
    // Figure out what extension the file should have
    switch(blob.type) {
        case 'image/jpeg':
            blob['name'] += '.jpg';
            break;
        case 'image/png':
            blob['name'] += '.png';
            break;
    }
    // cast to a File
    return <File>blob;
}



  downloadFile(data) {

    console.log("in down",data);

    const blob = new Blob([data], { type: 'data:image/jpeg;base64' });

    this.fileUrl = this.sanitizer.bypassSecurityTrustResourceUrl(window.URL.createObjectURL(blob));
  }

 
}
