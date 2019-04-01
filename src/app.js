export class App {
  configureRouter(config, router) {
    config.title = 'Aurelia';
    config.map([
      { route: ['', 'welcome'], name: 'welcome',      moduleId: 'welcome',      nav: true, title: 'Welcome' },
      { route: 'users',         name: 'users',        moduleId: 'users',        nav: true, title: 'Github Users' },
      { route: 'child-router',  name: 'child-router', moduleId: 'child-router', nav: true, title: 'Child Router' }
    ]);

    this.router = router;
  }
}




// import materialize from 'materialize-css';
  

// export class App {
//   configureRouter(config, router) {
//     config.title = 'Aurelia';
//     config.map([
//       { route: ['', 'welcome'], name: 'welcome',      moduleId: 'welcome',      nav: true, title: 'Welcome' },
//       { route: 'users',         name: 'users',        moduleId: 'users',        nav: true, title: 'Github Users' },
//       { route: 'child-router',  name: 'child-router', moduleId: 'child-router', nav: true, title: 'Child Router' }
//     ]);

//     this.router = router;
//   }
//   attached() {
//     // using ref="modal" in html template
//     materialize.Modal.init(this.modal);
//     // for better reuse, wrap materialize js features
//     // behind Aurelia custom elements or attributes.
//   }
//   detached() {
//     const ins = materialize.Modal.getInstance(this.modal);
//     if (ins) ins.destroy();
//   }
// }
