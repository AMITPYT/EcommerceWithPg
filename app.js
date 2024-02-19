const express = require("express");
const userRoutes = require('./modules/auth/routes/auth.routes');
const userDetailsRoutes = require('./modules/userDetails/routes/userDetails.routes');
const productsRoutes = require('./modules/products/routes/products.routes');
const cartRoutes = require('./modules/carts/routes/carts.routes');

const app = express();
app.use(express.json());

app.use(userRoutes, userDetailsRoutes, productsRoutes, cartRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));