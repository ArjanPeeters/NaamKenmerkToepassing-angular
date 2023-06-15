import { Directive, EventEmitter, HostListener, Input, Output } from '@angular/core';

@Directive({
    selector: '[appCopyToClipboard]',
})
export class CopyToClipboardDirective {

    @Input('appCopyToClipboard')
    public payload!: string;

    @Output()
    public readonly copied: EventEmitter<string> = new EventEmitter<string>();

    @HostListener('click', ['$event'])
    public async onClick(): Promise<void> {
        await navigator.clipboard.writeText(this.payload);
        this.copied.emit(this.payload);
    }

}
