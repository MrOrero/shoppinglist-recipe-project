import {
  Directive,
  ElementRef,
  HostBinding,
  HostListener,
  OnInit,
  Renderer2,
} from '@angular/core';

@Directive({
  selector: '[appDropdown]',
})
export class DropdownDirective implements OnInit {
  @HostBinding('class.open') clicked = false;
  // clicked = false;
  constructor(private elementRef: ElementRef, private renderer: Renderer2) {}

  ngOnInit() {
    this.clicked = false;
  }

  // @HostListener('click') openDropdown(eventData: Event) {
  //   this.clicked = !this.clicked;
  //   // if (this.clicked) {
  //   //   this.renderer.addClass(this.elementRef.nativeElement, 'open');
  //   // } else {
  //   //   this.renderer.removeClass(this.elementRef.nativeElement, 'open');
  //   // }
  // }
  @HostListener('document:click', ['$event']) toggleOpen(event: Event) {
    this.clicked = this.elementRef.nativeElement.contains(event.target)
      ? !this.clicked
      : false;
  }
}
