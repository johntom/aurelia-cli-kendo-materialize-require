//import {computedFrom} from 'aurelia-framework';
// import materialize from 'materialize-css';
import { autoinject } from "aurelia-framework";
import { MdToastService, MdModal } from "aurelia-materialize-bridge";
import {  AppRouter} from 'aurelia-router';
import {  inject,  bindable} from 'aurelia-framework';
@inject(MdToastService, AppRouter)//,  AuthServiceGTZ, ApiService)

export class Modal {
  heading = 'Welcome to Parallax!';
  firstName = 'John';
  lastName = 'Doe';
  previousValue = this.fullName;

}
