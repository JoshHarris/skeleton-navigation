import {HttpClient} from 'aurelia-http-client';
import {LogManager} from 'aurelia-framework';
import config from './configuration';

//var logger = LogManager.getLogger('API');

/**
 * Extends the HttpClient to add errorHandling specific to this app
 */
export class WebAPI extends HttpClient {

  _endPoint = null;

  constructor() {
    super();

    this.endPoint = config.apiUrl;
    this.config = config;
  }

  //---------------------------- getters/setters

  set content(data) {
    this.configure(x => {
      x.withContent(data);
    });
  }

  set contentType(v) {
    this.configure(x => {
      x.withHeader('Content-Type', v);
    });
  }

  set endPoint(v) {
    this._endPoint = v;
    this.configure(x => {
      x.withBaseUrl(this._endPoint);
    });
  }

  get endPoint() {
    return this._endPoint;
  }
  //---------------------------- Http methods with built-in error and auth handling specific to this app.

  delete(url, options = {}) {
    return this.runHttpMethod(super.delete, [url], options);
  }

  get(url, options = {}) {
    return this.runHttpMethod(super.get, [url], options);
  }

  head(url, options = {}) {
    return this.runHttpMethod(super.head, [url], options);
  }

  put(url, content = {}, options = {}) {
    return this.runHttpMethod(super.put, [url, content], options);
  }

  patch(url, content = {}, options = {}) {
    return this.runHttpMethod(super.patch, [url, content], options);
  }

  post(url, content = {}, options = {}) {
    return this.runHttpMethod(super.post, [url, content], options);
  }

  runHttpMethod(func, args, options, content) {
    this.options = options;

    this.contentType = 'application/json';
    if(content) this.content = content;

    //use mock endpoint
    if(options.debug){
      var endPointCached = this.endPoint;
      this.endPoint = this.config.mockUrl;
    }

    if(options.debug) args[0] = args[0] + '.json';

    return new Promise((resolve, reject) => {
      func.apply(this, args).then(result=> {
        if(options.debug){
          this.endPoint = endPointCached;
        }

        if(result.content.result === "ok") {
          resolve(result.content.data);
        }else{
          var e = { result: result.content.code, errors: [result.content] };
          reject(e);
        }
      }, (e)=> {
        console.log(e)
        reject(e.content);
      });
    });
  }

}
