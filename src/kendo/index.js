//import {computedFrom} from 'aurelia-framework';
// import materialize from 'materialize-css';
import { autoinject } from "aurelia-framework";
import { MdToastService, MdModal } from "aurelia-materialize-bridge";
import {  AppRouter} from 'aurelia-router';
import {  inject,  bindable} from 'aurelia-framework';
@inject(MdToastService, AppRouter)//,  AuthServiceGTZ, ApiService)

export class Kendo {
  heading = 'Welcome to the Aurelia Navigation-Kendo-Systemjs-Cli App!';
  firstName = 'John';
  lastName = 'Doe';
  previousValue = this.fullName;

  //Getters can't be directly observed, so they must be dirty checked.
  //However, if you tell Aurelia the dependencies, it no longer needs to dirty check the property.
  //To optimize by declaring the properties that this getter is computed from, uncomment the line below
  //as well as the corresponding import above.
  //@computedFrom('firstName', 'lastName')

  pageable = {
    refresh: true,
    pageSizes: true,
    buttonCount: 10
  };

  resizable = {
    content: true,
    toolbar: true
  }

	constructor(toast,router) {
		this.modal= MdModal;
		this.toast=toast

    // this.message = 'Hello World!--';
    this.datasource = {
      type: 'odata',
      transport: {
        read: '//demos.telerik.com/kendo-ui/service/Northwind.svc/Customers'
      },
      pageSize: 5
    };

  }

	agree(e) {
		this.toast.show("You agreed!", 4000);
	}

	disagree(e) {
		this.toast.show("You disagreed!", 4000);
	}

	openModal() {
		this.modal.open();
  }
  

  testToast(){
    // Materialize.toast('record saved!', 4000) // 4000 is the duration of the toast
		this.toast.show("You disagreed!", 4000);
  
  }
  get fullName() {
    return `${this.firstName} ${this.lastName}`;
  }

  submit() {
    this.previousValue = this.fullName;
    // eslint-disable-next-line no-alert
    alert(`Welcome, ${this.fullName}!`);
  }

  canDeactivate() {
    if (this.fullName !== this.previousValue) {
      // eslint-disable-next-line no-alert
      return confirm('Are you sure you want to leave?');
    }
  }
}

export class UpperValueConverter {
  toView(value) {
    return value && value.toUpperCase();
  }
}
