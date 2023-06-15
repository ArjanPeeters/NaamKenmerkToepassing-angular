import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';

import { MaterialSelection, MaterialSelectOptions } from '@app-models';

@Component({
    selector: 'app-material-form',
    styleUrls: ['./material-form.component.scss'],
    templateUrl: './material-form.component.html',
})
export class MaterialFormComponent implements OnChanges {

    @Input()
    public selectOptions: MaterialSelectOptions = {
        naam: [],
        kenmerk: [],
        toepassing: [],
    }

    @Input()
    public value: MaterialSelection = {
        naam: null,
        kenmerk: null,
        toepassing: null,
        reference: 'ntb_ntb_ntb',
    };

    @Output()
    public materialChanged = new EventEmitter<MaterialSelection>();

    public ngOnChanges(): void {

        // Set initial values
        if (this.selectOptions?.naam?.length) {
            this.value.naam = this.value.naam || this.selectOptions.naam[0];
            this.value.kenmerk = this.value.kenmerk || this.selectOptions.kenmerk[0];
            this.value.toepassing = this.value.toepassing || this.selectOptions.toepassing[0];
            this.updateReference();
        }
    }

    public handleChange(): void {
        this.updateReference();
        this.materialChanged.emit(this.value);
    }

    private updateReference(): void {
        this.value.reference = [
            this.value.naam?.naam || 'ntb',
            this.value.kenmerk?.kenmerk || 'ntb',
            this.value.toepassing?.toepassing || 'ntb',
        ].join('_');
    }

}
