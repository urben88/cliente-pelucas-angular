import { Pipe, PipeTransform } from "@angular/core";
import { DomSanitizer, SafeHtml, SafeResourceUrl, SafeScript, SafeStyle, SafeUrl } from '@angular/platform-browser';

@Pipe({
  name: 'sanitizeHtml'
})
//? Este pipe me sirve para sanear código que añado a la página desde un sitio externo como una base de datos
//?En particular me ha servido para imprimir las notificaciones con estilo
export class SanitizeHtmlPipe implements PipeTransform {

 constructor(private sanitizer:DomSanitizer) { }

 public transform(value: any, type: string): SafeHtml | SafeStyle | SafeScript | SafeUrl | SafeResourceUrl {
  switch (type) {
     case 'html': return this.sanitizer.bypassSecurityTrustHtml(value);
     case 'style': return this.sanitizer.bypassSecurityTrustStyle(value);
     case 'script': return this.sanitizer.bypassSecurityTrustScript(value);
     case 'url': return this.sanitizer.bypassSecurityTrustUrl(value);
     case 'resourceUrl': return this.sanitizer.bypassSecurityTrustResourceUrl(value);
     default: throw new Error(`Invalid safe type specified: ${type}`);
  }
}
}