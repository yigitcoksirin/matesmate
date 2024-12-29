import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { NavbarComponent } from "./navbar/navbar.component";

@NgModule({
    declarations: [
        NavbarComponent,
    ],
    imports: [
        RouterModule,
        CommonModule,
        FormsModule,
    ],
    exports: [
        NavbarComponent
    ],
})
export class SharedModule {

}