import * as express from 'express';
import * as morgan from 'morgan';
import * as bodyParser from 'body-parser';
import * as session from 'express-session';
import * as helmet from 'helmet';
import { api } from './api';

const app = express();

// Logger
app.use(morgan('dev'));

// Helmet
app.use(helmet());
app.use(helmet.noCache());

// Body-parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Express-session
const store = new session.MemoryStore();
app.use(session({
  secret: 'shhhh, very secret',
  cookie: {},
  name: 'QSESSIONID',
  resave: false,
  saveUninitialized: false,
  store: store,
}));

// Middleware for showing total sessions
app.use('/', (req, res, next) => {
  store.length((err, len) => {
    console.log(`===> Total Sessions: ${len}`);
    next();
  });
});

// API router
app.use('/api', api());

// Set port and listen
app.set('port', process.env.PORT || 8080);
app.listen(app.get('port'), () => {
  console.log(`Started on port ${app.get('port')}`);
});

