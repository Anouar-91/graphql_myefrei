"use strict";

var _client = require("@prisma/client");
var _express = _interopRequireDefault(require("express"));
var _expressGraphql = require("express-graphql");
var _graphql = require("graphql");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const prisma = new _client.PrismaClient();
const app = (0, _express.default)();
let schema = (0, _graphql.buildSchema)(`
    type Course {
        idcourse: Int!
        name: String!
        teacher: Teacher!
        grade: [Grade!]!
    }
    type Grade {
        idgrade: Int!
        result: Float!
        course: Course!
        student: Student!
      }
      
      type Student {
        idstudent: Int!
        ine: String
        grade: [Grade!]!
      }
      
      type Teacher {
        idteacher: Int!
        isAgreement: Int!
        course: [Course!]!
      }
      type User {
        iduser: ID!
        lastname: String!
        firstname: String!
        email: String!
        password: String!
        student: [Student!]!
      }   
      
      type Query {
        getStudent: [Student]
        getUser: [User]
    }
    input userInput{
        lastname: String!
        firstname: String!
        email: String!
        password: String!
    }
    type Mutation {
        insertUser(value: userInput): [User]
    }
  
`);
let root = {
  getStudent: async () => {
    return prisma.student.findMany({});
  },
  getUser: async () => {
    return prisma.user.findMany({});
  },
  insertUser: async ({
    value
  }) => {
    console.log(value);
    const userCreate = await prisma.user.create({
      data: {
        email: value.email,
        firstname: value.firstname,
        lastname: value.lastname,
        password: value.password
      }
    });
    console.log(userCreate, "create");
    return await prisma.user.findMany({});
  }
};
app.use("/graphql", (0, _expressGraphql.graphqlHTTP)({
  schema: schema,
  rootValue: root,
  graphiql: true
}));
app.listen(3400, () => {
  console.log("API GRAPHQL listening on 3400");
});