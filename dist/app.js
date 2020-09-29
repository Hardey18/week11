"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var http_errors_1 = __importDefault(require("http-errors"));
var express_1 = __importDefault(require("express"));
var auth_1 = __importDefault(require("./server/middleware/auth"));
// import path from 'path';
var cookie_parser_1 = __importDefault(require("cookie-parser"));
var morgan_1 = __importDefault(require("morgan"));
var express_graphql_1 = require("express-graphql");
var schema_1 = require("./src/schema/schema");
var schema_2 = require("./server/schema/schema");
var mongoose_1 = __importDefault(require("mongoose"));
var app = express_1.default();
mongoose_1.default.connect('mongodb+srv://dbnurudeen:nurudeen992@cluster0.89qyi.mongodb.net/week9', {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true
});
mongoose_1.default.connection.once('open', function () {
    console.log('connected to database');
});
app.use(morgan_1.default('dev'));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use(cookie_parser_1.default());
app.use("/graphql", express_graphql_1.graphqlHTTP({
    schema: schema_1.schema,
    graphiql: true
}));
app.use("/graphql2", express_graphql_1.graphqlHTTP(function (req) { return ({
    schema: schema_2.firstSchema,
    context: auth_1.default(req),
    graphiql: true
}); }));
// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(http_errors_1.default(404));
});
// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    // render the error page
    res.status(err.status || 500);
    res.render('error');
});
exports.default = app;
