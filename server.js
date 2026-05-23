// const express = require('express');
// const app = express();
// app.get('/',(req,res) => {
//     res.send('Hello World');
// });
// app.listen(3000,() => {
//     console.log('Server running on port 3000')
// });

const express = require('express');
const dotenv = require('dotenv');
const cors = require ('cors');
const connectDB = require('./config/db');
dotenv.config();
connectDB();
const app = express();
app.use(express.json());
app.use(cors());
app.get('/', (req,res)=> {
    res.send("E-commerce API running...");
});
app.use('/api/auth',require('./routes/authRoutes'));
app.use('/api/products',require('./routes/productRoutes'));
app.use('/api/cart',require('./routes/cartRoutes'));
app.use('/api/order',require('./routes/OrderRoutes'));
const PORT = process.env.PORT || 5000;
app.listen(PORT,() =>{
    console.log(`Server running on port ${PORT}`);
});