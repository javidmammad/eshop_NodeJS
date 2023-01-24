require('dotenv/config');
const app = require('express')();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
const productsRouter = require('./routers/products');
const categoriesRouter = require('./routers/categories');
const ordersRouter = require('./routers/orders');
const usersRouter = require('./routers/users');
const cors = require('cors');

const api = process.env.API_URL;

app.use(cors());
app.options('*', cors());
//middleware
app.use(bodyParser.json());
app.use(morgan('tiny'));
app.use(`${api}/products`, productsRouter);
app.use(`${api}/categories`, categoriesRouter);
app.use(`${api}/orders`, ordersRouter);
app.use(`${api}/users`, usersRouter);

mongoose.connect('mongodb://localhost:27017/eshop', (err) => {
    if (err) {
        console.log('LOG:  ~ mongoose.connect ~ err', err);
    }
});\

app.listen(3000, () => {
    console.log('api', api);
});
