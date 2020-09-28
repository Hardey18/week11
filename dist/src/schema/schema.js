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
Object.defineProperty(exports, "__esModule", { value: true });
exports.schema = void 0;
var allCars_1 = require("../models/allCars");
var purchasedCars_1 = require("../models/purchasedCars");
var staffs_1 = require("../models/staffs");
var graphql_1 = require("graphql");
var PurchasedCarsType = new graphql_1.GraphQLObjectType({
    name: 'PurchasedCars',
    fields: function () { return ({
        id: { type: graphql_1.GraphQLID },
        type: { type: graphql_1.GraphQLString },
        modelNumber: { type: graphql_1.GraphQLString },
        saleDate: { type: graphql_1.GraphQLString },
        buyer: { type: graphql_1.GraphQLString },
        color: { type: graphql_1.GraphQLString }
    }); }
});
var AllCarsType = new graphql_1.GraphQLObjectType({
    name: 'AllCars',
    fields: function () { return ({
        id: { type: graphql_1.GraphQLID },
        name: { type: graphql_1.GraphQLString },
        type: { type: graphql_1.GraphQLString },
        productionDate: { type: graphql_1.GraphQLString },
        color: { type: graphql_1.GraphQLList(graphql_1.GraphQLString) },
        amount: { type: graphql_1.GraphQLInt },
        condition: { type: graphql_1.GraphQLString },
        price: { type: graphql_1.GraphQLInt }
    }); }
});
var StaffsType = new graphql_1.GraphQLObjectType({
    name: 'Staffs',
    fields: function () { return ({
        id: { type: graphql_1.GraphQLID },
        name: { type: graphql_1.GraphQLString },
        position: { type: graphql_1.GraphQLString },
        salary: { type: graphql_1.GraphQLInt },
        homeAddress: { type: graphql_1.GraphQLString }
    }); }
});
var allDataType = new graphql_1.GraphQLObjectType({
    name: 'AllData',
    fields: function () { return ({
        purchased: { type: graphql_1.GraphQLList(PurchasedCarsType) },
        allCar: { type: graphql_1.GraphQLList(AllCarsType) },
        staffs: { type: graphql_1.GraphQLList(StaffsType) }
    }); }
});
var RootQuery = new graphql_1.GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        purchasedCar: {
            type: new graphql_1.GraphQLList(PurchasedCarsType),
            args: {
                type: { type: graphql_1.GraphQLID },
                color: { type: graphql_1.GraphQLID },
            },
            resolve: function (parent, args) {
                return purchasedCars_1.PurchasedCars.find({
                    $or: [
                        { type: args.type },
                        { color: args.color }
                    ]
                });
            }
        },
        allCar: {
            type: new graphql_1.GraphQLList(AllCarsType),
            args: {
                type: { type: graphql_1.GraphQLID },
                condition: { type: graphql_1.GraphQLID },
                price: { type: graphql_1.GraphQLID }
            },
            resolve: function (parent, args) {
                return allCars_1.AllCars.find({
                    $or: [
                        { type: args.type },
                        { condition: args.condition },
                        { price: args.price }
                    ]
                });
            }
        },
        staff: {
            type: new graphql_1.GraphQLList(StaffsType),
            args: {
                name: { type: graphql_1.GraphQLID },
                position: { type: graphql_1.GraphQLID },
            },
            resolve: function (parent, args) {
                return staffs_1.Staffs.find({
                    $or: [
                        { name: args.name },
                        { position: args.position }
                    ]
                });
            }
        },
        purchasedCars: {
            type: new graphql_1.GraphQLList(PurchasedCarsType),
            resolve: function (parent, args) {
                return purchasedCars_1.PurchasedCars.find({});
            }
        },
        allCars: {
            type: new graphql_1.GraphQLList(AllCarsType),
            resolve: function (parent, args) {
                return allCars_1.AllCars.find({});
            }
        },
        staffs: {
            type: new graphql_1.GraphQLList(StaffsType),
            resolve: function (parent, args) {
                return staffs_1.Staffs.find({});
            }
        },
        allDatas: {
            type: allDataType,
            resolve: function (parent, args) {
                var purchased = purchasedCars_1.PurchasedCars.find({});
                var allCar = allCars_1.AllCars.find({});
                var staffs = staffs_1.Staffs.find({});
                var allDetails = { purchased: purchased, allCar: allCar, staffs: staffs };
                return allDetails;
            }
        }
    }
});
var Mutation = new graphql_1.GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addPurchasedCar: {
            type: PurchasedCarsType,
            args: {
                type: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
                modelNumber: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
                saleDate: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
                buyer: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
                color: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) }
            },
            resolve: function (parent, args) {
                var error = purchasedCars_1.validatePurchasedCars(args).error;
                if (error)
                    throw new Error(error.details[0].message);
                var purchasedCar = new purchasedCars_1.PurchasedCars({
                    type: args.type,
                    modelNumber: args.modelNumber,
                    saleDate: args.saleDate,
                    buyer: args.buyer,
                    color: args.color,
                });
                return purchasedCar.save();
            }
        },
        addAllCar: {
            type: AllCarsType,
            args: {
                name: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
                type: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
                productionDate: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
                color: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLList(graphql_1.GraphQLString)) },
                amount: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLInt) },
                condition: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
                price: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLInt) },
            },
            resolve: function (parent, args) {
                var error = allCars_1.validateAllCars(args).error;
                if (error)
                    throw new Error(error.details[0].message);
                var allCars = new allCars_1.AllCars({
                    name: args.name,
                    type: args.type,
                    productionDate: args.productionDate,
                    color: args.color,
                    amount: args.amount,
                    condition: args.condition,
                    price: args.price
                });
                return allCars.save();
            }
        },
        addStaffs: {
            type: StaffsType,
            args: {
                name: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
                position: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
                salary: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLInt) },
                homeAddress: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) }
            },
            resolve: function (parent, args) {
                var error = staffs_1.validateStaffs(args).error;
                if (error)
                    throw new Error(error.details[0].message);
                var staffs = new staffs_1.Staffs({
                    name: args.name,
                    position: args.position,
                    salary: args.salary,
                    homeAddress: args.homeAddress
                });
                return staffs.save();
            }
        },
        updatePurchasedCar: {
            type: PurchasedCarsType,
            args: {
                id: { type: graphql_1.GraphQLID },
                type: { type: graphql_1.GraphQLString },
                modelNumber: { type: graphql_1.GraphQLString },
                saleDate: { type: graphql_1.GraphQLString },
                buyer: { type: graphql_1.GraphQLString },
                color: { type: graphql_1.GraphQLString },
            },
            resolve: function (parent, args) {
                return __awaiter(this, void 0, void 0, function () {
                    var purchasedCar;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, purchasedCars_1.PurchasedCars.findById(args.id)];
                            case 1:
                                purchasedCar = _a.sent();
                                return [2 /*return*/, purchasedCars_1.PurchasedCars.findOneAndUpdate(args.id, {
                                        $set: {
                                            type: args.type || purchasedCar["type"],
                                            modelNumber: args.modelNumber || purchasedCar["modelNumber"],
                                            saleDate: args.saleDate || purchasedCar["saleDate"],
                                            buyer: args.buyer || purchasedCar["buyer"],
                                            color: args.color || purchasedCar["color"]
                                        }
                                    }, { new: true })];
                        }
                    });
                });
            }
        },
        updateAllCar: {
            type: AllCarsType,
            args: {
                id: { type: graphql_1.GraphQLID },
                name: { type: graphql_1.GraphQLString },
                type: { type: graphql_1.GraphQLString },
                productionDate: { type: graphql_1.GraphQLString },
                color: { type: graphql_1.GraphQLList(graphql_1.GraphQLString) },
                amount: { type: graphql_1.GraphQLInt },
                condition: { type: graphql_1.GraphQLString },
                price: { type: graphql_1.GraphQLInt }
            },
            resolve: function (parent, args) {
                return __awaiter(this, void 0, void 0, function () {
                    var allCar;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, purchasedCars_1.PurchasedCars.findById(args.id)];
                            case 1:
                                allCar = _a.sent();
                                return [2 /*return*/, purchasedCars_1.PurchasedCars.findOneAndUpdate(args.id, {
                                        $set: {
                                            name: args.name || allCar["name"],
                                            type: args.type || allCar["type"],
                                            productionDate: args.productionDate || allCar["productionDate"],
                                            color: args.color || allCar["color"],
                                            amount: args.amount || allCar["amount"],
                                            condition: args.condition || allCar["condition"],
                                            price: args.price || allCar["price"]
                                        }
                                    }, { new: true })];
                        }
                    });
                });
            }
        },
        updateStaff: {
            type: StaffsType,
            args: {
                id: { type: graphql_1.GraphQLID },
                name: { type: graphql_1.GraphQLString },
                position: { type: graphql_1.GraphQLString },
                salary: { type: graphql_1.GraphQLInt },
                homeAddress: { type: graphql_1.GraphQLString }
            },
            resolve: function (parent, args) {
                return __awaiter(this, void 0, void 0, function () {
                    var staff;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, staffs_1.Staffs.findById(args.id)];
                            case 1:
                                staff = _a.sent();
                                return [2 /*return*/, staffs_1.Staffs.findByIdAndUpdate(args.id, {
                                        $set: {
                                            name: args.name || staff["name"],
                                            position: args.position || staff["position"],
                                            salary: args.salary || staff["salary"],
                                            homeAddress: args.homeAddress || staff["homeAddress"]
                                        }
                                    }, { new: true })];
                        }
                    });
                });
            }
        },
    }
});
var schema = new graphql_1.GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});
exports.schema = schema;
