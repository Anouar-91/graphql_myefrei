import { Prisma } from "@prisma/client"
import express from "express"
import { graphqlHTTP } from "express-graphql"
import { buildSchema } from "graphql"
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
const app = express()

let schema = buildSchema(`
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
  
`)

let root = {
    getStudent: async () => {
        return prisma.student.findMany({

        })
    },
    getUser: async () => {
        return prisma.user.findMany({

        })
    },
    insertUser: async ({value}) => {
        console.log(value)
       const userCreate =  await prisma.user.create({
            data:{
                email : value.email,
                firstname : value.firstname,
                lastname  : value.lastname,
                password: value.password
            }
        })
        console.log(userCreate, "create")
        return await prisma.user.findMany({
           
        })
    },
}

app.use("/graphql", graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true
}))

app.listen(3400, () => {
    console.log("API GRAPHQL listening on 3400")
})

