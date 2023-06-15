import { Component } from '@angular/core';

import { DatabaseService } from '@app-services';
import { Kenmerk, MaterialSelectOptions, Naam, Toepassing } from '@app-models';

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})
export class HomePage {

    public selectOptions: MaterialSelectOptions;

    constructor(
        private readonly databaseService: DatabaseService,
    ) {
        this.databaseService.ready.subscribe(() => {
            this.selectOptions = {
                naam: this.databaseService.findAll<Naam>('naam'),
                kenmerk: this.databaseService.findAll<Kenmerk>('kenmerk'),
                toepassing: this.databaseService.findAll<Toepassing>('toepassing'),
            };
        });
    }

}
