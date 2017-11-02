import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
    selector: '[word-host]',
})
export class WordDirective {
    constructor(public viewContainerRef: ViewContainerRef) {}
}
