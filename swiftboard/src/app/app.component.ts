import { Component } from '@angular/core';

import SuperTokens from 'supertokens-web-js';
import Session from 'supertokens-web-js/recipe/session';
import Passwordless from 'supertokens-web-js/recipe/passwordless';

SuperTokens.init({
  appInfo: {
    apiDomain: 'http://localhost:3000',
    apiBasePath: '/auth',
    appName: 'SwiftBoard',
  },
  recipeList: [Session.init(), Passwordless.init()],
});

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'swiftboard';
}
