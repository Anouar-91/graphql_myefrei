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
        user: User!
      }
      
      type Teacher {
        idteacher: Int!
        isAgreement: Int!
        course: [Course!]!
        user: User!
      }
      type User {
        iduser: ID!
        lastname: String!
        firstname: String!
        email: String!
        password: String!
        role: Role!
        student: [Student!]!
      }  
      type Role {
        idrole: ID!
        name: String!
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
        idrole: Int!
    }
    input studentInput{
        ine: String!
        iduser: Int!
    }
    input teacherInput{
        isAgreement: Int!
        iduser: Int!
    }
    input courseInput{
        name: String!
        idteacher: Int!
    }
    type Mutation {
        insertUser(value: userInput): User
        insertStudent(value: studentInput): Student
        insertTeacher(value: teacherInput): Teacher
        insertCourse(value: courseInput): Course
    }
  
`)

let root = {
    getStudent: async () => {
        return prisma.student.findMany({
            include: {
                user: true
            }
        })
    },
    getUser: async () => {
        return prisma.user.findMany({

        })
    },
    insertUser: async ({ value }) => {
        const role =await prisma.role.findUnique({
            where:{
                idrole: value.idrole
            }
        })
        if(role){
            const userCreate = await prisma.user.create({
                data: {
                    role_idrole: role.idrole,
                    lastname: value.lastname,
                    firstname: value.firstname,
                    email : value.email,
                    password: value.password
                },
                include:{
                    role:true
                }
            })
            return userCreate
        }

    },
    insertStudent: async ({ value }) => {
        const user = await prisma.user.findUnique({
            where: {
                iduser: value.iduser
            }
        })
        if (user && user.role_idrole == 1) {
            const studentCreate = await prisma.student.create({
                data: {
                    user_iduser: value.iduser,
                    ine: value.ine
                },
                include: {
                    user:true
                }
            })
            return studentCreate
        }
        return null;
    },
    insertTeacher: async ({ value }) => {
        const user = await prisma.user.findUnique({
            where: {
                iduser: value.iduser
            }
        })
        if (user && user.role_idrole == 2) {
            const teacherCreate = await prisma.teacher.create({
                data: {
                    user_iduser: value.iduser,
                    isAgreement: value.isAgreement
                },
                include: {
                    user:true
                }
            })
            return teacherCreate
        }
        return null;
    },
    insertCourse: async ({ value }) => {
        const teacher = await prisma.teacher.findUnique({
            where: {
                idteacher: value.idteacher
            }
        })
        if (teacher) {
            const course = await prisma.course.create({
                data: {
                    teacher_idteacher: value.idteacher,
                    name: value.name
                }
            })
            return course
        }
        return null;
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

