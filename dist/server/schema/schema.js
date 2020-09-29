"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.firstSchema = void 0;
var organization_1 = require("../models/organization");
var users_1 = require("../models/users");
var bcrypt_1 = __importDefault(require("bcrypt"));
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var graphql_1 = require("graphql");
var OrganizationType = new graphql_1.GraphQLObjectType({
    name: 'Organization',
    fields: function () { return ({
        id: { type: graphql_1.GraphQLID },
        organization: { type: graphql_1.GraphQLString },
        products: { type: graphql_1.GraphQLList(graphql_1.GraphQLString) },
        marketValue: { type: graphql_1.GraphQLString },
        address: { type: graphql_1.GraphQLString },
        ceo: { type: graphql_1.GraphQLString },
        country: { type: graphql_1.GraphQLString },
        noOfEmployees: { type: graphql_1.GraphQLString },
        employees: { type: graphql_1.GraphQLList(graphql_1.GraphQLString) }
    }); }
});
var UserType = new graphql_1.GraphQLObjectType({
    name: 'User',
    fields: function () { return ({
        id: { type: graphql_1.GraphQLID },
        name: { type: graphql_1.GraphQLString },
        email: { type: graphql_1.GraphQLString },
        password: { type: graphql_1.GraphQLString }
    }); }
});
var RootQuery = new graphql_1.GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        organization: {
            type: OrganizationType,
            args: { id: { type: graphql_1.GraphQLID } },
            resolve: function (parent, args, context) {
                return __awaiter(this, void 0, void 0, function () {
                    var value;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, context];
                            case 1:
                                value = _a.sent();
                                if (!value.headers.authorization) {
                                    throw Error("Error here!");
                                }
                                return [2 /*return*/, organization_1.Organization.findById(args.id)];
                        }
                    });
                });
            }
        },
        organizations: {
            type: new graphql_1.GraphQLList(OrganizationType),
            resolve: function (parent, args, context) {
                return __awaiter(this, void 0, void 0, function () {
                    var value;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, context];
                            case 1:
                                value = _a.sent();
                                if (!value.headers.authorization) {
                                    throw Error("Error here!");
                                }
                                return [2 /*return*/, organization_1.Organization.find({})];
                        }
                    });
                });
            }
        }
    }
});
var Mutation = new graphql_1.GraphQLObjectType({
    name: 'Mutation',
    fields: {
        register: {
            type: UserType,
            args: {
                name: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
                email: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
                password: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) }
            },
            resolve: function (parent, args) {
                return __awaiter(this, void 0, void 0, function () {
                    var error, hashPass, register;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                error = users_1.validateUser(args).error;
                                if (error)
                                    throw new Error(error.details[0].message);
                                return [4 /*yield*/, bcrypt_1.default.hashSync(args.password, 10)];
                            case 1:
                                hashPass = _a.sent();
                                register = new users_1.User({
                                    name: args.name,
                                    email: args.email,
                                    password: hashPass
                                });
                                return [2 /*return*/, register.save()];
                        }
                    });
                });
            }
        },
        login: {
            type: UserType,
            args: {
                email: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
                password: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) }
            },
            resolve: function (parent, args) {
                return __awaiter(this, void 0, void 0, function () {
                    var email, password, user, hashPassword, validPass, id, payload, token, err_1;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                _a.trys.push([0, 3, , 4]);
                                users_1.validateLogin(args);
                                email = args.email, password = args.password;
                                return [4 /*yield*/, users_1.User.findOne({ email: email })];
                            case 1:
                                user = _a.sent();
                                if (!user) {
                                    throw new Error("User does not exists");
                                }
                                hashPassword = user["password"];
                                return [4 /*yield*/, bcrypt_1.default.compare(password, hashPassword)];
                            case 2:
                                validPass = _a.sent();
                                if (!validPass) {
                                    throw new Error("Incorrect email or password");
                                }
                                id = user.id;
                                payload = { email: email, id: id };
                                token = jsonwebtoken_1.default.sign(payload, process.env.JWT_SECRET, {
                                    expiresIn: "10m"
                                });
                                console.log(token, "<<<<<<<<<<Password>>>>>>>>>>>>>>");
                                user["token"] = token;
                                return [2 /*return*/, user];
                            case 3:
                                err_1 = _a.sent();
                                return [2 /*return*/, err_1];
                            case 4: return [2 /*return*/];
                        }
                    });
                });
            }
        },
        addOrganization: {
            type: OrganizationType,
            args: {
                organization: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
                products: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLList(graphql_1.GraphQLString)) },
                marketValue: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
                address: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
                ceo: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
                country: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
                employees: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLList(graphql_1.GraphQLString)) },
            },
            resolve: function (parent, args, context) {
                return __awaiter(this, void 0, void 0, function () {
                    var value, error, organization;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, context];
                            case 1:
                                value = _a.sent();
                                if (!value.headers.authorization) {
                                    throw Error("Error here!");
                                }
                                error = organization_1.validateOrganization(args).error;
                                if (error)
                                    throw new Error(error.details[0].message);
                                organization = new organization_1.Organization({
                                    organization: args.organization,
                                    products: args.products,
                                    marketValue: args.marketValue,
                                    address: args.address,
                                    ceo: args.ceo,
                                    country: args.country,
                                    noOfEmployees: args.employees.length,
                                    employees: args.employees,
                                });
                                return [2 /*return*/, organization.save()];
                        }
                    });
                });
            }
        },
        updateOrganization: {
            type: OrganizationType,
            args: {
                organization: { type: graphql_1.GraphQLString },
                products: { type: graphql_1.GraphQLList(graphql_1.GraphQLString) },
                marketValue: { type: graphql_1.GraphQLString },
                address: { type: graphql_1.GraphQLString },
                ceo: { type: graphql_1.GraphQLString },
                country: { type: graphql_1.GraphQLString },
                noOfEmployees: { type: graphql_1.GraphQLString },
                employees: { type: graphql_1.GraphQLList(graphql_1.GraphQLString) }
            },
            resolve: function (parent, args, context) {
                return __awaiter(this, void 0, void 0, function () {
                    var value, organization, id;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, context];
                            case 1:
                                value = _a.sent();
                                if (!value.headers.authorization) {
                                    throw Error("Error here!");
                                }
                                return [4 /*yield*/, organization_1.Organization.findOne({ organization: args.organization })];
                            case 2:
                                organization = _a.sent();
                                id = organization.id;
                                return [2 /*return*/, organization_1.Organization.findByIdAndUpdate(id, {
                                        $set: {
                                            organization: args.organization || organization["organization"],
                                            products: args.products || organization["products"],
                                            marketValue: args.marketValue || organization["marketValue"],
                                            address: args.address || organization["address"],
                                            ceo: args.ceo || organization["ceo"],
                                            country: args.country || organization["country"],
                                            employees: args.employees || organization["employees"]
                                        }
                                    }, { new: true })];
                        }
                    });
                });
            }
        },
        deleteOrganization: {
            type: OrganizationType,
            args: { organization: { type: graphql_1.GraphQLString }, },
            resolve: function (parent, args, context) {
                return __awaiter(this, void 0, void 0, function () {
                    var value;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, context];
                            case 1:
                                value = _a.sent();
                                if (!value.headers.authorization) {
                                    throw Error("Error here!");
                                }
                                return [2 /*return*/, organization_1.Organization.findOneAndDelete({ organization: args.organization })];
                        }
                    });
                });
            }
        },
        deleteUser: {
            type: UserType,
            args: { id: { type: graphql_1.GraphQLID }, },
            resolve: function (parent, args, context) {
                return __awaiter(this, void 0, void 0, function () {
                    var value;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, context];
                            case 1:
                                value = _a.sent();
                                if (!value.headers.authorization) {
                                    throw Error("Error here!");
                                }
                                return [2 /*return*/, users_1.User.findByIdAndDelete(args.id)];
                        }
                    });
                });
            }
        }
    }
});
var firstSchema = new graphql_1.GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});
exports.firstSchema = firstSchema;
