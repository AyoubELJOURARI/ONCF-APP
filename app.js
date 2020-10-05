const path = require('path');
const express = require('express');
const AppError = require('./utils/appError');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const globalErrorHandler = require('./controllers/errorController');
const cookieParser = require('cookie-parser');
//for logging middleware
const morgan = require('morgan');

const contractRoutes = require('./routes/contractRoutes');
const userRouter = require('./routes/userRoutes');
const viewRouter = require('./routes/viewRoutes');

const app = express();

//set a view engine(pug)
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// 1) MIDDLEWARES
//serving static file
app.use(express.static(path.join(__dirname, 'public')));
//securtiy http headers
app.use(helmet());
//console.log(process.env.NODE_ENV);
//Developpement logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
//limit 1000 request for the same IP in 1h
const limiter = rateLimit({
  max: 1000,
  windowMs: 60 * 60 * 1000,
  message: 'Too many request from this IP, Please try again in 1 hour !',
});
app.use('/api', limiter);
//middleware that can modify the incoming request data form body to req.body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
// DAta sanitization against NoSql query injection(like: {email: {$gt: ''}})
app.use(mongoSanitize());
//Data sanitization against xss
app.use(xss());
//prevent parameter pollution
app.use(
  hpp({
    whitelist: ['numMarche', 'status', 'name'],
  })
);

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  //console.log(req.cookies);
  next();
});
//ROUTES
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'", 'https://*.mapbox.com', 'https://*.stripe.com'],
      baseUri: ["'self'"],
      fontSrc: ["'self'", 'https:', 'data:'],
      scriptSrc: ["'self'", 'https://*.cloudflare.com'],
      imgSrc: ["'self'", 'https://www.gstatic.com'],
      scriptSrc: [
        "'self'",
        'https://*.stripe.com',
        'https://cdnjs.cloudflare.com',
        'https://api.mapbox.com',
        'https://js.stripe.com',
        "'blob'",
      ],
      frameSrc: ["'self'", 'https://*.stripe.com'],
      objectSrc: ["'none'"],
      styleSrc: ["'self'", 'https:', 'unsafe-inline'],
      upgradeInsecureRequests: [],
    },
  })
);
app.use('/', viewRouter);
app.use('/api/v1/contracts', contractRoutes);
app.use('/api/v1/users', userRouter);

//middelware for bad urls
app.all('*', (req, res, next) => {
  next(new AppError(`can't find this URL: ${req.originalUrl} !`, 404));
});
//middleware for handelling errors
app.use(globalErrorHandler);

// 4) start a server
module.exports = app;
