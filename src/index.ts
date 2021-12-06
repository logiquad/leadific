const express = require('express');
const bodyParser = require('body-parser');
const myErrorLogger = require('./utilities/ErrorLogger');
const myRequestLogger = require('./utilities/RequestLogger');
const domainRouter = require('./routes/domainRouter.js')
const cors = require('cors');
const port = 3000;

const app = express();
app.use(cors());

app.use(bodyParser.json());
app.use(myRequestLogger);

app.use("/domain", domainRouter);

app.use(myErrorLogger);

try {
	app.listen(port, (): void => {
		console.log(`Connected successfully on port ${port}`);
	});
} catch (error: any) {
	console.error(`Error occured: ${error.message}`);
}

module.exports = app;