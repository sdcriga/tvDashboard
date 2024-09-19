import { Directive, ElementRef, HostListener, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appCopyLink]',
})
export class CopyLinkDirective {
  @Input() public copyText = '';

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  @HostListener('click', ['$event'])
  public onClick(event: MouseEvent): void {
    event.preventDefault();
    if (!this.copyText) {
      return;
    }
    if (navigator.clipboard && navigator.clipboard.writeText) {
      // If the clipboard API is supported
      navigator.clipboard.writeText(this.copyText.toString())
        .then(() => this.showCopiedMessage())
        .catch(err => console.error('Failed to copy text: ', err));
    } else {
      // Fallback for environments where clipboard API is not supported
      this.copyToClipboardFallback(this.copyText.toString());
    }
  }

  private copyToClipboardFallback(text: string): void {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy'); // Fallback API
    document.body.removeChild(textarea);
    this.showCopiedMessage();
  }

  private showCopiedMessage() {
    const copiedMessage = this.renderer.createElement('span');
    const text = this.renderer.createText('Copied!');
    this.renderer.appendChild(copiedMessage, text);
    this.renderer.addClass(copiedMessage, 'copied-message');

    const parentElement = this.el.nativeElement.parentElement;
    this.renderer.appendChild(parentElement, copiedMessage);

    setTimeout(() => {
      this.renderer.removeChild(parentElement, copiedMessage);
    }, 5000);
  }

  // @HostListener('click', ['$event'])
  // public onClick(event: MouseEvent): void {
  //   event.preventDefault();
  //   if (!this.copyText) {
  //     return;
  //   }
  //   navigator.clipboard.writeText(this.copyText.toString());
  //   this.showCopiedMessage();
  // }

  // private showCopiedMessage() {
  //   const copiedMessage = this.renderer.createElement('span');
  //   const text = this.renderer.createText('Copied!');
  //   this.renderer.appendChild(copiedMessage, text);
  //   this.renderer.addClass(copiedMessage, 'copied-message');

  //   const parentElement = this.el.nativeElement.parentElement;
  //   this.renderer.appendChild(parentElement, copiedMessage);

  //   setTimeout(() => {
  //     this.renderer.removeChild(parentElement, copiedMessage);
  //   }, 5000);
  // }

}
