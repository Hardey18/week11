import { AllCars, validateAllCars } from '../models/allCars';
import { PurchasedCars, validatePurchasedCars } from '../models/purchasedCars';
import { Staffs, validateStaffs } from '../models/staffs';
import { 
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull
} from 'graphql';

const PurchasedCarsType = new GraphQLObjectType({
    name: 'PurchasedCars',
    fields: () => ({
        id: { type: GraphQLID },
        type: { type: GraphQLString },
        modelNumber: { type: GraphQLString },
        saleDate: { type: GraphQLString },
        buyer: { type: GraphQLString },
        color: { type: GraphQLString }
    })
})

const AllCarsType = new GraphQLObjectType({
    name: 'AllCars',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        type: { type: GraphQLString },
        productionDate: { type: GraphQLString },
        color: { type: GraphQLList(GraphQLString) },
        amount: { type: GraphQLInt },
        condition: { type: GraphQLString },
        price: { type: GraphQLInt }
    })
})

const StaffsType = new GraphQLObjectType({
    name: 'Staffs',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        position: { type: GraphQLString },
        salary: { type: GraphQLInt },
        homeAddress: { type: GraphQLString }
    })
})

const allDataType = new GraphQLObjectType({
    name: 'AllData',
    fields: () => ({
        purchased: { type: GraphQLList(PurchasedCarsType) },
        allCar: { type: GraphQLList(AllCarsType) },
        staffs: { type: GraphQLList(StaffsType) }
    })
})

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        purchasedCar: {
            type: new GraphQLList(PurchasedCarsType),
            args: {
                type: { type: GraphQLID },
                color: { type: GraphQLID },
            },
            resolve(parent, args) {
                return PurchasedCars.find({
                    $or: [
                        { type: args.type },
                        { color: args.color }
                    ]
                });
            }
        },
        allCar: {
            type: new GraphQLList(AllCarsType),
            args: {
                type: { type: GraphQLID },
                condition: { type: GraphQLID },
                price: { type: GraphQLID }
            },
            resolve(parent, args) {
                return AllCars.find({
                    $or: [
                        { type: args.type },
                        { condition: args.condition },
                        { price: args.price }
                    ]
                });   
            }
        },
        staff: {
            type: new GraphQLList(StaffsType),
            args: { 
                name: { type: GraphQLID },
                position: { type: GraphQLID },
            },
            resolve(parent, args) {
                return Staffs.find({
                    $or: [
                        { name: args.name },
                        { position: args.position }
                    ]
                });   
            }
        },
        purchasedCars: {
            type: new GraphQLList(PurchasedCarsType),
            resolve(parent, args){
                return PurchasedCars.find({});
            }
        },
        allCars: {
            type: new GraphQLList(AllCarsType),
            resolve(parent, args){
                return AllCars.find({})
            }
        },
        staffs: {
            type: new GraphQLList(StaffsType),
            resolve(parent, args){
                return Staffs.find({})
            }
        },
        allDatas: {
            type: allDataType,
            resolve(parent, args){
                const purchased = PurchasedCars.find({});
                const allCar = AllCars.find({});
                const staffs = Staffs.find({})
                const allDetails = { purchased, allCar, staffs }
                return allDetails
            }
        }
    }
})

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addPurchasedCar: {
            type: PurchasedCarsType,
            args: {
                type: { type: new GraphQLNonNull(GraphQLString) },
                modelNumber: { type: new GraphQLNonNull(GraphQLString) },
                saleDate: { type: new GraphQLNonNull(GraphQLString) },
                buyer: { type: new GraphQLNonNull(GraphQLString) },
                color: { type: new GraphQLNonNull(GraphQLString) }
            },
            resolve(parent, args){
                const { error } = validatePurchasedCars(args);
                if (error) throw new Error(error.details[0].message);

                let purchasedCar = new PurchasedCars({
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
                name: { type: new GraphQLNonNull(GraphQLString) },
                type: { type: new GraphQLNonNull(GraphQLString) },
                productionDate: { type: new GraphQLNonNull(GraphQLString) },
                color: { type: new GraphQLNonNull(GraphQLList(GraphQLString)) },
                amount: { type: new GraphQLNonNull(GraphQLInt) },
                condition: { type: new GraphQLNonNull(GraphQLString) },
                price: { type: new GraphQLNonNull(GraphQLInt) },
            },
            resolve(parent, args){
                const { error } = validateAllCars(args);
                if (error) throw new Error(error.details[0].message);

                let allCars = new AllCars({
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
                name: { type: new GraphQLNonNull(GraphQLString) },
                position: { type: new GraphQLNonNull(GraphQLString) },
                salary: { type: new GraphQLNonNull(GraphQLInt) },
                homeAddress: { type: new GraphQLNonNull(GraphQLString) }
            },
            resolve(parent, args){
                const { error } = validateStaffs(args);
                if (error) throw new Error(error.details[0].message);

                let staffs = new Staffs({
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
                id: { type: GraphQLID },
                type: { type: GraphQLString },
                modelNumber: { type: GraphQLString },
                saleDate: { type: GraphQLString },
                buyer: { type: GraphQLString },
                color: { type: GraphQLString },
            },
            async resolve(parent, args){
                let purchasedCar = await PurchasedCars.findById(args.id);
                
                return PurchasedCars.findOneAndUpdate(args.id, {
                    $set: {
                        type: args.type || purchasedCar["type"],
                        modelNumber: args.modelNumber || purchasedCar["modelNumber"],
                        saleDate: args.saleDate || purchasedCar["saleDate"],
                        buyer: args.buyer || purchasedCar["buyer"],
                        color: args.color || purchasedCar["color"]
                    }         
                }, {new: true})
            }
        },
        updateAllCar: {
            type: AllCarsType,
            args: {
                id: { type: GraphQLID },
                name: { type: GraphQLString },
                type: { type: GraphQLString },
                productionDate: { type: GraphQLString },
                color: { type: GraphQLList(GraphQLString) },
                amount: { type: GraphQLInt },
                condition: { type: GraphQLString },
                price: { type: GraphQLInt }
            },
            async resolve(parent, args){
                let allCar = await PurchasedCars.findById(args.id);
                
                return PurchasedCars.findOneAndUpdate(args.id, {
                    $set: {
                        name: args.name || allCar["name"],
                        type: args.type || allCar["type"],
                        productionDate: args.productionDate || allCar["productionDate"],
                        color: args.color || allCar["color"],
                        amount: args.amount || allCar["amount"],
                        condition: args.condition || allCar["condition"],
                        price: args.price || allCar["price"]
                    }         
                }, {new: true})
            }
        },
        updateStaff: {
            type: StaffsType,
            args: {
                id: { type: GraphQLID },
                name: { type: GraphQLString },
                position: { type: GraphQLString },
                salary: { type: GraphQLInt },
                homeAddress: { type: GraphQLString }
            },
            async resolve(parent, args){
                let staff = await Staffs.findById(args.id);
                
                return Staffs.findByIdAndUpdate(args.id, {
                   $set: {
                        name: args.name || staff["name"],
                        position: args.position || staff["position"],
                        salary: args.salary || staff["salary"],
                        homeAddress: args.homeAddress || staff["homeAddress"]
                   }         
                }, {new: true})
            }
        },
    }
})

const schema = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
})

export { schema };