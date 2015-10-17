import {App} from '../../src/app';

class RouterStub {
  constructor() {
    this.steps = [];
  }

  configure(handler) {
    handler(this);
  }

  addPipelineStep(step) {
    this.steps.push(step);
  }

  map(routes) {
    this.routes = routes;
  }
}

class WebAPIStub {

};

class HttpClientConfigStub {
  configured = false;
  configure() {
    this.configured = true;
  }
};


describe('the App module', () => {
  var sut
    , mockedRouter
    , mockedClientConfig
    , mockedWebAPI;

  beforeEach(() => {
    mockedRouter = new RouterStub();
    mockedClientConfig = new HttpClientConfigStub();
    mockedWebAPI = new WebAPIStub();
    sut = new App(mockedClientConfig, mockedWebAPI);
    sut.configureRouter(mockedRouter, mockedRouter);
  });

  it('contains a router property', () => {
    expect(sut.router).toBeDefined();
  });

  it('configures the router title', () => {
    expect(sut.router.title).toEqual('Aurelia');
  });

  it('should have a welcome route', () => {
    expect(sut.router.routes).toContain({ route: ['','welcome'], name: 'welcome',  moduleId: 'welcome', nav: true, title:'Welcome' });
  });

  it('should have a users route', () => {
     expect(sut.router.routes).toContain({ route: 'users', name: 'users', moduleId: 'users', nav: true, title:'Github Users' });
  });

  it('should have a child router route', () => {
    expect(sut.router.routes).toContain({ route: 'child-router', name: 'child-router', moduleId: 'child-router', nav: true, title:'Child Router' });
  });
});
