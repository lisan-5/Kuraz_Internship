const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan');
const passport = require('passport');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');

const app = express();
const swaggerDoc = YAML.load('./swagger.yaml');

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan('combined'));
app.use(passport.initialize());

// Routes
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/tasks', require('./routes/tasks'));

// Error handling
app.use(require('./middlewares/error'));

module.exports = app;
