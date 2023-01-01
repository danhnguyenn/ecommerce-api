const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const userRoute = require('./routes/user');
const authRoute = require('./routes/auth');
const productRoute = require('./routes/product');
const categoryRoute = require('./routes/category');
const orderRoute = require('./routes/order');
const brandRoute = require('./routes/brand');
const addressRoute = require('./routes/address');
const welcomeRoute = require('./routes/welcome');
const cookies = require('cookie-parser');
const path = require('path');
dotenv.config();

mongoose
	.connect(process.env.MONGO_URL, {
		useNewUrlParser: true,
		useUnifiedTopology: true
	})
	.then(() => console.log('DB Connection Successfull!'))
	.catch((err) => {
		console.log(err);
	});

app.use(cookies());

const cors = require('cors');
// const corsOptions = {
// 	origin: 'https://ecommerce-oslo.vercel.app',
// 	credentials: true, //access-control-allow-credentials:true
// 	optionSuccessStatus: 200
// };
app.use(cors());

app.use(express.json());
app.use('/api', welcomeRoute);
app.use('/api/auth', authRoute);
app.use('/api/users', userRoute);
app.use('/api/products', productRoute);
app.use('/api/categories', categoryRoute);
app.use('/api/orders', orderRoute);
app.use('/api/brands', brandRoute);
app.use('/api/address', addressRoute);

app.use(
	'/public/uploads',
	express.static(path.join(__dirname, '/public/uploads'))
);

app.listen(process.env.PORT || 5000, () => {
	console.log('Backend server is running!');
});
