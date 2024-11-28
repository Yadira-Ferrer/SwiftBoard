require('dotenv').config();
const { superTokensConfig } = require('./config/supertokens');

const express = require('express');
const app = require('express')();
const morgan = require('morgan');
const cors = require('cors');
const supertokens = require('supertokens-node');

const {
  verifySession,
} = require('supertokens-node/recipe/session/framework/express');
const UserMetadata = require('supertokens-node/recipe/usermetadata');

const server = require('http').Server(app);

const {
  errorHandler,
  middleware,
} = require('supertokens-node/framework/express');

const port = process.env.PORT || 3001;

supertokens.init(superTokensConfig);

app.use(express.json({ limit: '10MB' }));

app.use(
  cors({
    origin: ['http://localhost:4200'],
    allowedHeaders: ['content-type', ...supertokens.getAllCORSHeaders()],
    credentials: true,
  })
);

//OWN ROUTES
app.get('/', (req, res) =>
  res.status(200).json({ api_name: 'SwiftBoard API' })
);

// HTTP LOGS
app.use(morgan('dev'));

// SuperTokens Middleware
app.use(middleware());

// SuperTokens Error Handler
app.use(errorHandler());

console.log('NODE_ENV:', process.env.ENVIRONMENT);

server.listen(port, (err) => {
  if (err) console.log('❌ Error:', err);
  console.log(`🚀 SwiftBoard Server is running on PORT: ${port}`);
});
