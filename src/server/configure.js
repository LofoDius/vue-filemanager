const bodyParser = require('body-parser')
const api = require('./api/api')

module.exports = async (app) => {
    app.use(bodyParser.json());
    app.use('/api/', api);
}