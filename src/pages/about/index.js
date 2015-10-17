import {inject} from 'aurelia-framework';
import {WebAPI} from 'api'


@inject(WebAPI)
export class AboutPage {
  heading = 'About';
  api_version = null;

  constructor(webApi) {
    this.api = webApi;
  }

  activate() {
    this.api.get('/').then(data => {
      this.api_version = data.version;
    }).catch(() => {
      this.api_version = 'Unknown';
    });
  }
}

