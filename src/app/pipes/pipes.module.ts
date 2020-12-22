import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImagePipe } from './image.pipe';
import { DomSanitizerPipe } from './dom-sanitizer.pipe';



@NgModule({
  declarations: [
    ImagePipe,
    DomSanitizerPipe
  ],
  imports: [
    CommonModule
  ],
  exports:[
    ImagePipe,
    DomSanitizerPipe
  ]
  
})
export class PipesModule { }
