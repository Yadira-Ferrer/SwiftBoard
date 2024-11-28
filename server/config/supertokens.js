const supertokens = require('supertokens-node');
const Session = require('supertokens-node/recipe/session');
const Passwordless = require('supertokens-node/recipe/passwordless');
const UserMetadata = require('supertokens-node/recipe/usermetadata');
const Dashboard = require('supertokens-node/recipe/dashboard');

const superTokensConfig = {
  framework: 'express',
  supertokens: {
    connectionURI:
      'https://st-dev-43150260-ad1a-11ef-9b49-1b2a60f62614.aws.supertokens.io',
    apiKey: 'SGSGmPiBC4jVQU=NrL9kvdg48p',
  },
  appInfo: {
    appName: 'SwiftBoard',
    apiDomain: 'http://localhost:3000',
    websiteDomain: 'http://localhost:4200',
    apiBasePath: '/auth',
    websiteBasePath: '/auth',
  },
  recipeList: [
    UserMetadata.init(),
    Passwordless.init({
      flowType: 'USER_INPUT_CODE',
      contactMethod: 'EMAIL',
    }),
    Session.init({
      cookieSameSite: 'none',
      exposeAccessTokenToFrontendInCookieBasedAuth: false,
      getTokenTransferMethod: () => 'any',
    }),
    Dashboard.init(),
  ],
};

module.exports = {
  superTokensConfig,
};
