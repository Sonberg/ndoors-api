import { Server } from 'http';
import * as express from 'express';
import * as session from 'express-session';
import * as helmet from 'helmet';
import * as connectRedis from 'connect-redis';
import * as bodyParser from 'body-parser';
import * as cookieParser from 'cookie-parser';
import * as morgan from 'morgan';
import * as cors from 'cors';
import * as socketIo from 'socket.io';

import Authentication from './authentication';

import config from './config';
import routes from './routes';

const app = express();
const server = new Server(app);

const port = process.env.PORT || 3003;
const io = socketIo(server);
const redisStore = connectRedis(session);

app.use(
	cors({
		credentials: true,
		origin: true
	})
);

//app.use(helmet());
app.use(cookieParser());
app.use(
	session({
		store: new redisStore({
			url: config.REDIS_URL
		}),
		secret: 'dcad6f9d-5493-4675-957c-828aae0b67af',
		saveUninitialized: false,
		cookie: {
			maxAge: 3600000 * 24 * 2, // 2 days
			secure: process.env.NODE_ENV === 'production'
		},
		resave: false
	})
);

// Socket
app.set('io', io);

// Logging
app.use(morgan('dev'));

// Authentication
Authentication(app);

// Parse request
app.use(bodyParser.json());
app.use(
	bodyParser.urlencoded({
		extended: true
	})
);

// Routes
app.use('/', routes);

server.listen(port, () => console.log(`App listening on port ${port}!`));
