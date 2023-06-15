import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { MaterialFormComponent } from '@app-components';

@NgModule({
    declarations: [
        MaterialFormComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
    ],
    exports: [
        MaterialFormComponent,
    ],
})
export class FormComponentsModule {
    //
}
