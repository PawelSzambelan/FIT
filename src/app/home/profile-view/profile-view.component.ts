import {Component, OnInit} from '@angular/core';
import {HomeService} from "../../shared/home.service";
import {NavigationEnd, Router} from "@angular/router";
import {NgbCalendar, NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import {DateService} from "../../shared/dateService.service";
import {TargetService} from "../../shared/target.service";
import {NgForm} from "@angular/forms";
import {newTarget} from "../../models/newTarget.model";
import {HttpErrorResponse} from "@angular/common/http";
// import {DateParser} from "../../shared/dateParser.service";
import {any} from "codelyzer/util/function";

@Component({
    selector: 'app-profile-view',
    templateUrl: './profile-view.component.html',
})
export class ProfileViewComponent implements OnInit  {

    user: any;
    activity_level: any = [];
    targets: any = [];
    dateOfTargets: any = [];
    weightOfTargets: any = [];
    weightStates: any = [];
    dateOfWeightStates: any = [];
    weightOfWeightStates: any = [];

    newdates: any = [];
    newweights: any = [];

    model: NgbDateStruct;
    today = this.calendar.getToday();
    newTarget: newTarget;
    // newTarget.date


    isNewTargetError: boolean = false;
    isDeletedTargetError: boolean = false;

    constructor(private homeService: HomeService, private router: Router,private calendar: NgbCalendar, private dateService: DateService,
                private targetService: TargetService,){
        // TO REFRESH THE PAGE AFTER REMOVING TARGET--------------------
        this.router.routeReuseStrategy.shouldReuseRoute = function() {
            return false;
        };

        this.router.events.subscribe((evt) => {
            if (evt instanceof NavigationEnd) {
                // trick the Router into believing it's last link wasn't previously loaded
                this.router.navigated = false;
                // if you need to scroll back to top, here is the right place
                window.scrollTo(0, 0);
            }
        });
        //  ---------------------------------

        // private dateParser: DateParser) {}




        // var ctx = document.getElementById('myChart').getContext('2d');
        // var chart = new Chart(ctx, {
        //     // The type of chart we want to create
        //     type: 'line',
        //
        //     // The data for our dataset
        //     data: {
        //         labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        //         datasets: [{
        //             label: 'My First dataset',
        //             backgroundColor: 'rgb(255, 99, 132)',
        //             borderColor: 'rgb(255, 99, 132)',
        //             data: [0, 10, 5, 2, 20, 30, 45]
        //         }]
        //     },
        //
        //     // Configuration options go here
        //     options: {}
        // });


    }


    ngOnInit() {
        //this.resetForm();
        this.resetTarget();
        this.loadUserData();
        this.loadActivity();
        this.loadTargets();
        this.loadWeightStates();
    }

    resetTarget() {
        this.newTarget = {
            date: '',
            //date: (this.model.day+this.model.month+this.model.year).toString(),
            //date: this.dateParser.format(this.model),
            weight: null
        }
    }

    // resetForm(form?: NgForm) {
    //     if (form != null)
    //         form.reset();
    // }

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
        //console.log(form.value);
        let newDate = form.value.date;
        if(typeof form.value.date === "object"){
            //console.log(JSON.stringify(form.value));
            if (form.value["date"]["day"]  < 10) {
                form.value["date"]["day"]="0"+form.value["date"]["day"]
            }
            if (form.value["date"]["month"] < 10) {
                form.value["date"]["month"]="0"+form.value["date"]["month"]
            }
            newDate=form.value["date"]["day"]+'-'+form.value["date"]["month"]+'-'+form.value["date"]["year"];
            console.log(newDate);
        }
        let newForm = {
            date: newDate,
            weight: form.value.weight
        };
        //console.log(newForm);
        this.targetService.addTarget(localStorage.getItem('userToken'), newForm).subscribe((data: any) => {
                this.router.navigate(['/home/profile']);
            },
            (err: HttpErrorResponse) => {
                this.isNewTargetError = true;
            });
    }

    loadTargets(){
        return this.targetService.getTargets(localStorage.getItem('userToken')).subscribe((data: {}) => {
            this.targets = data;
            //console.log(JSON.stringify(this.targets));
            //console.log(this.targets["date"]);
            for (const date of this.targets){
                console.log(date.date);
                this.dateOfTargets.push(date.date);
            }
            console.log(this.dateOfTargets);

            for (const weight of this.targets){
                console.log(weight.weight);
                this.weightOfTargets.push(weight.weight);
            }
            console.log(this.weightOfTargets);

        })
    }

    deleteTarget(idTarget: number){
        this.targetService.deleteTarget(localStorage.getItem('userToken'), idTarget).subscribe((data: any) => {
                this.router.navigate(['/home/profile']);
            },
            (err: HttpErrorResponse) => {
                this.isDeletedTargetError = true;
            });
    }

    loadWeightStates(){
        return this.targetService.getWeightStates(localStorage.getItem('userToken')).subscribe((data: {}) => {
            this.weightStates = data;

            for (const date of this.weightStates){
                console.log(date.date);
                this.dateOfWeightStates.push(date.date);
            }
            console.log(this.dateOfWeightStates);

            for (const weight of this.weightStates){
                console.log(weight.weight);
                this.weightOfWeightStates.push(weight.weight);
            }
            console.log(this.weightOfWeightStates);
        })
    }


    public lineChartOptions = {
        scaleShowVerticalLines: false,
        responsive: true
    };

    //public lineChartLabels = ['2006', '2007', '2008', '2018', '2019'];
    // public lineChartLabels =  [
    //     this.dateOfTargets,
    //     this.dateOfWeightStates
    // ];


    public lineChartLabels = this.dateOfTargets;
    //public lineChartLabels2 = this.dateOfWeightStates;
    public lineChartType = 'line';
    public lineChartLegend = true;

    public lineChartData = [
        {data: this.weightOfTargets, label: 'Twoje cele'},
        {data: this.weightOfWeightStates, label: 'Odnotowane zmiany wagi'}
    ];


}
