import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder, ValidatorFn, AbstractControl } from "@angular/forms";
import {
    contains,
    digit, email, hexColor, lowerCase, maxDate, maxLength, maxNumber, minDate, minNumber, password, pattern, range, upperCase, propObject, propArray, ReactiveFormConfig, RxFormBuilder, FormBuilderConfiguration, prop, required, alpha, alphaNumeric, compare, url, json, greaterThan, greaterThanEqualTo, lessThan, lessThanEqualTo, creditCard, CreditCardType, minLength
} from "@rxweb/reactive-form-validators";
import { time } from "packages/reactive-form-validators/decorators";
import { ApplicationConfiguration } from "@rx/core";
import { CLIENT_SETTINGS } from './client-setting'
export class Attendance {
    @prop() @required({ conditionalExpressions: "x => x.firstName == 'john' && x.employeeDetail.areaName == 'ahmedabad'" }) startTime: number;
}
export class EmployeeDetail {
    @prop() @required() areaName: string;
}
export class Employee {
    @prop() firstName: string;
    @alphaNumeric({ allowWhiteSpace: false, message: "test message" }) lastName: string;
    @contains({ value: "radix", conditionalExpressions: (current, root) => { return current.firstName == 'ajay'; }, message: "validation failed contains" }) contains: string;
    //@digit({ conditionalExpressions: "x => x.firstName == 'john' && x.employeeDetail.areaName == 'ahmedabad'", message: "digit required" })
    @prop()
    digit: string;
    @email({ message: "email", conditionalExpressions: "x =>x.firstName == 'john'" }) email: string;
    @hexColor({ message: "hex", conditionalExpressions: "x => x.firstName == 'john'" }) hexColor: string;
    @lowerCase({ message: "lowercase", conditionalExpressions: "x => x.firstName == 'john'" }) lowerCase: string;
    @maxDate({ value: new Date(2000, 1, 1) }) maxDate: string; // do some work
    @minDate({ value: new Date(2000, 0, 1) }) minDates: string; // do some work
    @maxLength({ value: 20, message: "length exceed", conditionalExpressions: "x => x.firstName == 'john'" }) maxLength: string;
    @maxNumber({ value: 100000000 }) maxNumber: string;
    @minLength({ value: 10 }) minLength: number;
    @minNumber({ value: 20, message: "minimum number {{0}}", conditionalExpressions: "x => x.firstName == 'john'" }) minNumber: string;
    @password({ validation: { maxLength: 10, minLength: 5, digit: true, specialCharacter: true } }) password: string;
    @pattern({ pattern: { 'onlyDigit': /^[0-9]+$/ }, conditionalExpressions: "x => x.firstName == 'john'" }) pattern: string;
    @range({ minimumNumber: 5, maximumNumber: 10 }) range: string;
    @required({ message: "minimum number {{0}}", conditionalExpressions: "x => x.firstName == 'john'" }) required: string;
    @upperCase({ message: "minimum number {{0}}", conditionalExpressions: "x => x.firstName == 'john'" }) upperCase: string;
    @propObject(EmployeeDetail) employeeDetail: EmployeeDetail;
    @propArray(Attendance) attendances: Attendance[]
    @compare({ fieldName: 'country' }) state: string;
    @prop() country: string;
    @time({ allowSeconds: true, message: "time" }) time: string;
    @url() url: string;
    @json() json: string;
    @greaterThan({ fieldName: 'minNumber' }) greaterThan: string;
    @greaterThanEqualTo({ fieldName: 'minNumber' }) greaterThanEqualTo: string;
    @lessThan({ fieldName: 'minNumber' }) lessThan: string;
    @lessThanEqualTo({ fieldName: 'minNumber' }) lessThanEqualTo: string;
    @creditCard({ creditCardTypes: [CreditCardType.AmericanExpress,] }) creditCard: string;
}
@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    title = 'app';
    sampleFormGroup: FormGroup;

    constructor(private formBuilder: FormBuilder, private validation: RxFormBuilder) {
    }

    ngOnInit() {
        ApplicationConfiguration.set(CLIENT_SETTINGS);
        var employee = new Employee();
        employee.employeeDetail = new EmployeeDetail();
        //employee.employeeDetail.areaName = "";
        employee.attendances = new Array<Attendance>();
        var employeeDetail = new Attendance()
        //employeeDetail.startTime = undefined
        employee.attendances.push(employeeDetail)
        ReactiveFormConfig.set({
            "internationalization": {
                "dateFormat": "dmy",
                "seperator": "/"
            },
            "validationMessage": {
                "alpha": "only alpha value you enter",
                "alphaNumeric": "only alpha Numeric value you enter",
                "contains": "you should contains ",
                "onlyDigit": "abc"
            }
        });
        employee.lastName = "john";
        var formBuilderConfiguration = new FormBuilderConfiguration();
        formBuilderConfiguration.validations = {
            'firstName': {
                alpha: true
            },
            'digit': {
                digit: {
                    conditionalExpressions:"x => x.firstName == 'john'"
                }
            }
        };
        this.sampleFormGroup = this.validation.formGroup<Employee>(Employee, employee, formBuilderConfiguration);
        console.log(this.sampleFormGroup);
    }

    customValidator(abstractControl: AbstractControl): { [key: string]: any } {
        var t = this.sampleFormGroup;
        return null;
    }
}
