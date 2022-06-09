import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from "./loader.component";
import {MatIconModule} from '@angular/material/icon';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
@NgModule({
    imports: [
        CommonModule,
        MatIconModule,
        MatProgressSpinnerModule
    ],
    exports: [LoaderComponent],
    declarations: [LoaderComponent],
    providers: [],
})
export class LoaderModule {
}