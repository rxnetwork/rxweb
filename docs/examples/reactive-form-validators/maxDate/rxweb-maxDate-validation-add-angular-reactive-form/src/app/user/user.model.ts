import {  maxDate, } from "@rxweb/reactive-form-validators"
export class user {

	@maxDate({value:new Date(2018,7,30) }) 
	registrationDate: Date;

}