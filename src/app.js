import express, { json, urlencoded } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import compression from 'compression';
import helmet from 'helmet';
import { graphqlHTTP } from 'express-graphql'
import schema from './graph/schema'
import resolvers from './graph/resolver'
import Ebook from './models/ebookfrontModel'
import User from './models/user'
import EbookPages from './models/ebookPdf'

const app = express();
require('dotenv').config();

// Middleware
app.use(morgan('dev'));
app.use(json());
app.use(urlencoded({ extended: true }));
app.use(cors());
app.use(compression());
app.use(helmet());

// db
const db = require('./loaders/db');

app.use('/graphql', graphqlHTTP({
	schema: schema,
	rootValue: resolvers,
	context: {
		User,
        Ebook,
        EbookPages
	},
	graphiql: true,
}));

export default app;


