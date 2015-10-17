import {inject} from 'aurelia-framework';
import HttpClientConfig from 'paulvanbladel/aurelia-auth/app.httpClient.config';
import {AuthorizeStep} from 'paulvanbladel/aurelia-auth';
import {WebAPI} from 'api';


@inject(HttpClientConfig, WebAPI)

export class App {
  constructor(httpClientConfig, webApi) {
      // Client configuration provided by the aureliauth plugin
      httpClientConfig.http = webApi;
      this.httpClientConfig = httpClientConfig;
  }

  configureRouter(config, router) {
    this.httpClientConfig.configure();
    config.addPipelineStep('authorize', AuthorizeStep);

    config.title = 'Aurelia';
    config.map([
      { route: ['', 'welcome'], name: 'welcome',      moduleId: 'welcome',      nav: true, title: 'Welcome' },
      { route: 'users',         name: 'users',        moduleId: 'users',        nav: true, title: 'Github Users' },
      { route: 'child-router',  name: 'child-router', moduleId: 'child-router', nav: true, title: 'Child Router' },
      { route: 'about',         name: 'about',        moduleId: 'pages/about/index', nav: true, title: 'About' }
    ]);

    this.router = router;
  }
}
