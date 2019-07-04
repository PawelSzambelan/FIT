import {Component, OnInit} from '@angular/core';
import {HomeService} from "../../shared/home.service";
import {Router} from "@angular/router";
import {NgForm} from '@angular/forms';
import {HttpErrorResponse} from "@angular/common/http";

@Component({
    selector: 'app-profile-view',
    templateUrl: './profile-view-edit.component.html'
})
export class ProfileViewEditComponent implements OnInit {

    user: any;
    activity_level: any = [

    ]
    error: boolean = false;
    genders: any = [
        {
            gender: 'FEMALE',
            name: 'Kobieta'
        },
        {
            gender: 'MALE',
            name: 'Mężczyzna'
        }
    ];


    constructor(private homeService: HomeService, private router: Router) {
    }

    ngOnInit() {
        this.loadUserData();
        this.loadActivity();
    }

    loadUserData() {
        return this.homeService.getUserData(localStorage.getItem('userToken')).subscribe((data => {
            this.user = data;
        }))
    }

    loadActivity() {
        return this.homeService.getActivityLevel().subscribe((data: {}) => {
            this.activity_level = data;
        })
    }

    OnSubmit(form: NgForm) {
        this.homeService.editUserData(localStorage.getItem('userToken'), form.value).subscribe((data: any) => {
                this.router.navigate(['/home/profile']);
            },
            (err: HttpErrorResponse) => {
                this.error = true;
            });
    }
}
