export class App {
  configureRouter(config, router) {
    config.title = 'Aurelia';
    config.map([
      { route: ['', 'welcome'], name: 'welcome',      moduleId: 'welcome',      nav: true, title: 'Welcome' },
      { route: 'users',         name: 'users',        moduleId: 'users',        nav: true, title: 'Github Users' },
      { route: 'child-router',  name: 'child-router', moduleId: 'child-router', nav: true, title: 'Child Router' },
      {    route: 'kendo',   moduleId: './kendo/index',        nav: true,        title: 'kendo'      },
      {    route: 'parallax',   moduleId: './parallax/index',        nav: true,        title: 'parallax'      }
    
    ]);

    this.router = router;
  }
}