import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DirectivesModule } from '@app-directives/directives.module';
import { FormComponentsModule } from '@app-components/forms/form-components.module';
import { HomePage } from '@app-pages';

@NgModule({
    declarations: [
        HomePage,
    ],
    imports: [
        CommonModule,
        DirectivesModule,
        FormComponentsModule,
    ],
})
export class PagesModule {
}
