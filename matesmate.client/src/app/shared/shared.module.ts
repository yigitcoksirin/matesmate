import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { NavbarComponent } from "./navbar/navbar.component";
import { SidebarComponent } from './sidebar/sidebar.component';

@NgModule({
    declarations: [
        NavbarComponent,
        SidebarComponent,
    ],
    imports: [
        RouterModule,
        CommonModule,
        FormsModule,
    ],
    exports: [
        NavbarComponent,
        SidebarComponent
    ],
})
export class SharedModule {

}