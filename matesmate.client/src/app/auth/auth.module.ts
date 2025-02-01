import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";
import { RegisterComponent } from "./register/register.component";
import { LoginComponent } from "./login/login.component";

const routes: Routes = [{
    path: "",
    children: [
        { path: 'login', component: LoginComponent,},
        { path: 'register', component: RegisterComponent},
    ]
}]

@NgModule({
    declarations: [
        LoginComponent,
        RegisterComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        RouterModule,
        RouterModule.forChild(routes)
    ],
    exports: [
        LoginComponent,
        RegisterComponent
    ],
})
export class AuthModule {

}