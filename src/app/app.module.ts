import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {ChartsModule} from "ng2-charts";

import {AppRoutingModule, routingComponents} from './app-routing.module';
import {AppComponent} from './app.component';
import {UserService} from './shared/user.service';
import {HomeService} from './shared/home.service';
import {MealService} from './shared/meal.service';
import {TargetService} from "./shared/target.service";
import {AuthGuard} from './auth/auth.guard';

@NgModule({
    declarations: [
        AppComponent,
        routingComponents
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        AppRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        NgbModule,
        ChartsModule
    ],
    providers: [
        UserService,
        HomeService,
        MealService,
        TargetService,
        AuthGuard,

    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
