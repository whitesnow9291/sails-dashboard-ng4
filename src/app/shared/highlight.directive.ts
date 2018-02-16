/* tslint:disable:member-ordering */
import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appHighlight]'
})
export class HighlightDirective {

  constructor(private el: ElementRef) { }

   @HostListener('click') onMouseEnter() {
    this.highlight('red');
  }
  private highlight(color: string) {
    const element = this.el.nativeElement;
    if (element.classList.contains('btn-primary')) {
      element.classList.remove('btn-primary')
      element.classList.add('btn-outline-primary')
    } else {
      element.classList.add('btn-primary')
      element.classList.remove('btn-outline-primary')
    }
  }
}


/*
Copyright 2017-2018 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/
