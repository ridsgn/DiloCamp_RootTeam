const express = require('express');
const app = express();
require('./db');

// const index_routes = require("./routes/index")
// const buah = require("./routes/buah.routes")
// const stok = require("./routes/stok.routes")

app.use(express.urlencoded({ extended: true }));

require('./routes/main.routes')(app);

// app.use("/index", index_routes)
// app.use("/buah", buah)
// app.use("/stok", stok)

app.listen(process.env.PORT, () => {
	console.log(`Example port to 5000`);
});
