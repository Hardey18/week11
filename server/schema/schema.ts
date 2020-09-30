import { Organization, validateOrganization } from '../models/organization';
import { User, validateUser, validateLogin } from '../models/users'
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'
import { 
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull
} from 'graphql';

const OrganizationType = new GraphQLObjectType({
    name: 'Organization',
    fields: () => ({
        id: { type: GraphQLID },
        organization: { type: GraphQLString },
        products: { type: GraphQLList(GraphQLString) },
        marketValue: { type: GraphQLString },
        address: { type: GraphQLString },
        ceo: { type: GraphQLString },
        country: { type: GraphQLString },
        noOfEmployees: { type: GraphQLString },
        employees: { type: GraphQLList(GraphQLString) }
    })
})

const UserType = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        email: { type: GraphQLString },
        password: { type: GraphQLString }
    })
})

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        organization: {
            type: OrganizationType,
            args: { id: { type: GraphQLID } },
            async resolve(parent, args, context){
                const value = await context;
                if (!value.headers.authorization) {
                    throw Error("Error here!")
                }
                return Organization.findById(args.id);
            }
        },
        organizations: {
            type: new GraphQLList(OrganizationType),
            async resolve(parent, args, context){
                const value = await context;
                if (!value.headers.authorization) {
                    throw Error("Error here!")
                }
                return Organization.find({});
            }
        }
    }
})

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        register: {
            type: UserType,
            args: {
                name: { type: new GraphQLNonNull(GraphQLString) },
                email: { type: new GraphQLNonNull(GraphQLString) },
                password: { type: new GraphQLNonNull(GraphQLString) }
            },
            async resolve(parent, args){
                const { error } = validateUser(args);
                if (error) throw new Error(error.details[0].message);
                let hashPass = await bcrypt.hashSync(args.password, 10);
                let register = new User({
                    name: args.name,
                    email: args.email,
                    password: hashPass
                });
                return register.save();
            }
        },
        login: {
            type: UserType,
            args: {
                email: { type: new GraphQLNonNull(GraphQLString) },
                password: { type: new GraphQLNonNull(GraphQLString) }
            },
            async resolve(parent, args){
                try {
                    validateLogin(args)
                    const { email, password } = args;
              
                    const user = await User.findOne({email});
              
                    if (!user) {
                      throw new Error("User does not exists");
                    }
              
                    const hashPassword = user["password"];
                    const validPass = await bcrypt.compare(password, hashPassword);
                    if (!validPass) {
                        throw new Error("Incorrect email or password");
                    }
                    
                    const id = user.id;
                    const payload = { email: email, id: id };
                    const token = jwt.sign(payload, process.env.JWT_SECRET!, {
                        expiresIn: "10m"
                    });
              
                    user["token"] = token;
                    return user;
                  } catch (err) {
                    return err;
                  }
            }
        },
        addOrganization: {
            type: OrganizationType,
            args: {
                organization: { type: new GraphQLNonNull(GraphQLString) },
                products: { type: new GraphQLNonNull(GraphQLList(GraphQLString)) },
                marketValue: { type: new GraphQLNonNull(GraphQLString) },
                address: { type: new GraphQLNonNull(GraphQLString) },
                ceo: { type: new GraphQLNonNull(GraphQLString) },
                country: { type: new GraphQLNonNull(GraphQLString) },
                employees: { type: new GraphQLNonNull(GraphQLList(GraphQLString)) },
            },
            async resolve(parent, args, context){
                const value = await context;
                if (!value.headers.authorization) {
                    throw Error("Error here!")
                }
                const { error } = validateOrganization(args);
                if (error) throw new Error(error.details[0].message);
                
                let organization = new Organization({
                    organization: args.organization,
                    products: args.products,
                    marketValue: args.marketValue,
                    address: args.address,
                    ceo: args.ceo,
                    country: args.country,
                    noOfEmployees: args.employees.length,
                    employees: args.employees,
                });
                return organization.save();
            }
        },
        updateOrganization: {
            type: OrganizationType,
            args: {
                organization: { type: GraphQLString },
                products: { type: GraphQLList(GraphQLString) },
                marketValue: { type: GraphQLString },
                address: { type: GraphQLString },
                ceo: { type: GraphQLString },
                country: { type: GraphQLString },
                noOfEmployees: { type: GraphQLString },
                employees: { type: GraphQLList(GraphQLString) }
            },
            async resolve(parent, args, context){
                const value = await context;
                if (!value.headers.authorization) {
                    throw Error("Error here!")
                }
                let organization = await Organization.findOne({ organization: args.organization });
                let id = organization.id;

                return Organization.findByIdAndUpdate(id, {
                    $set: {
                        organization: args.organization || organization["organization"],
                        products: args.products || organization["products"],
                        marketValue: args.marketValue || organization["marketValue"],
                        address: args.address || organization["address"],
                        ceo: args.ceo || organization["ceo"],
                        country: args.country || organization["country"],
                        employees: args.employees || organization["employees"]
                    }         
                }, {new: true})
            }
        },
        deleteOrganization: {
            type: OrganizationType,
            args: { organization: { type: GraphQLString }, },
            async resolve(parent, args, context){
                const value = await context;
                if (!value.headers.authorization) {
                    throw Error("Error here!")
                }
                return Organization.findOneAndDelete({ organization: args.organization });
            }
        },
        deleteUser: {
            type: UserType,
            args: { id: { type: GraphQLID }, },
            async resolve(parent, args, context){
                const value = await context;
                if (!value.headers.authorization) {
                    throw Error("Error here!")
                }
                return User.findByIdAndDelete(args.id);
            }
        }
    }
})

const firstSchema = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
})

export { firstSchema };