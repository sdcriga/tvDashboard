import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appInputSize]',
  standalone: true
})
export class InputSizeDirective {

  constructor(private el: ElementRef) { }

  @HostListener('keyup') onKeyUp() {
    this.resize();
  }

  @HostListener('focus') onFocus() {
    this.resize();
  }

  private resize() {
    this.el.nativeElement.setAttribute('size', this.el.nativeElement.value.length);
  }

}
