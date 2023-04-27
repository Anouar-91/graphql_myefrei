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
        getAllStudent: [Student]
        getAllUser: [User]
        getAllTeacher: [Teacher]
        getAllCourse: [Course]
        getAllGrade: [Grade]
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
    input gradeInput{
        result: Float!
        idcourse: Int!
        idstudent: Int!
    }
    input updateUserInput{
        lastname: String
        firstname: String
        password: String
        iduser: Int!
    }
    input updateStudentInput{
        ine: String!
        idstudent: Int!
    }
    input updateTeacherInput{
        isAgreement: Int!
        idteacher: Int!
    }
    input updateCourseInput{
        name: String!
        idcourse: Int!
    }
    input updateGradeInput{
        result: Float!
        idgrade: Int!
    }
    type Mutation {
        insertUser(value: userInput): User
        insertStudent(value: studentInput): Student
        insertTeacher(value: teacherInput): Teacher
        insertCourse(value: courseInput): Course
        insertGrade(value: gradeInput): Grade
        updateUser(value: updateUserInput): User
        updateStudent(value: updateStudentInput): Student
        updateTeacher(value: updateTeacherInput): Teacher
        updateCourse(value: updateCourseInput): Course
        updateGrade(value: updateGradeInput): Grade
        deleteGrade(id: Int): [Grade]
        deleteCourse(id: Int): [Course]
        deleteStudent(id: Int): [Student]
        deleteTeacher(id: Int): [Teacher]
    }
  
`);
let root = {
  getAllStudent: async () => {
    return prisma.student.findMany({
      include: {
        user: true
      }
    });
  },
  getAllUser: async () => {
    return prisma.user.findMany({});
  },
  getAllTeacher: async () => {
    return prisma.teacher.findMany({
      include: {
        user: true
      }
    });
  },
  getAllCourse: async () => {
    return prisma.course.findMany({});
  },
  getAllGrade: async () => {
    console.log("jes uis la");
    return prisma.grade.findMany({
      include: {
        student: {
          select: {
            user: true
          }
        },
        course: true
      }
    });
  },
  insertUser: async ({
    value
  }) => {
    const role = await prisma.role.findUnique({
      where: {
        idrole: value.idrole
      }
    });
    if (role) {
      const userCreate = await prisma.user.create({
        data: {
          role_idrole: role.idrole,
          lastname: value.lastname,
          firstname: value.firstname,
          email: value.email,
          password: value.password
        },
        include: {
          role: true
        }
      });
      return userCreate;
    }
  },
  insertStudent: async ({
    value
  }) => {
    const user = await prisma.user.findUnique({
      where: {
        iduser: value.iduser
      }
    });
    if (user && user.role_idrole == 1) {
      const studentCreate = await prisma.student.create({
        data: {
          user_iduser: value.iduser,
          ine: value.ine
        },
        include: {
          user: true
        }
      });
      return studentCreate;
    }
    return null;
  },
  insertTeacher: async ({
    value
  }) => {
    const user = await prisma.user.findUnique({
      where: {
        iduser: value.iduser
      }
    });
    if (user && user.role_idrole == 2) {
      const teacherCreate = await prisma.teacher.create({
        data: {
          user_iduser: value.iduser,
          isAgreement: value.isAgreement
        },
        include: {
          user: true
        }
      });
      return teacherCreate;
    }
    return null;
  },
  insertCourse: async ({
    value
  }) => {
    const teacher = await prisma.teacher.findUnique({
      where: {
        idteacher: value.idteacher
      }
    });
    if (teacher) {
      const course = await prisma.course.create({
        data: {
          teacher_idteacher: value.idteacher,
          name: value.name
        }
      });
      return course;
    }
    return null;
  },
  insertGrade: async ({
    value
  }) => {
    const student = await prisma.student.findUnique({
      where: {
        idstudent: value.idstudent
      }
    });
    const course = await prisma.course.findUnique({
      where: {
        idcourse: value.idcourse
      }
    });
    if (student && course) {
      const grade = await prisma.grade.create({
        data: {
          course_idcourse: value.idcourse,
          student_idstudent: value.idstudent,
          result: value.result
        },
        include: {
          student: {
            select: {
              user: true
            }
          },
          course: true
        }
      });
      return grade;
    }
    return null;
  },
  updateUser: async ({
    value
  }) => {
    const editor = await prisma.user.update({
      where: {
        iduser: value.iduser
      },
      data: {
        lastname: value.lastname,
        firstname: value.firstname,
        password: value.password
      }
    });
    return editor;
  },
  updateStudent: async ({
    value
  }) => {
    const update = await prisma.student.update({
      where: {
        idstudent: value.idstudent
      },
      data: {
        ine: value.ine
      }
    });
    return update;
  },
  updateTeacher: async ({
    value
  }) => {
    const update = await prisma.teacher.update({
      where: {
        idteacher: value.idteacher
      },
      data: {
        isAgreement: value.isAgreement
      }
    });
    return update;
  },
  updateCourse: async ({
    value
  }) => {
    const update = await prisma.course.update({
      where: {
        idcourse: value.idcourse
      },
      data: {
        name: value.name
      }
    });
    return update;
  },
  updateGrade: async ({
    value
  }) => {
    const update = await prisma.grade.update({
      where: {
        idgrade: value.idgrade
      },
      data: {
        result: value.result
      }
    });
    return update;
  },
  deleteGrade: async ({
    id
  }) => {
    const deleteGrade = await prisma.grade.deleteMany({
      where: {
        idgrade: id
      }
    });
    const grades = await prisma.grade.findMany({});
    return grades;
  },
  deleteCourse: async ({
    id
  }) => {
    const grades = await prisma.grade.deleteMany({
      where: {
        course_idcourse: id
      }
    });
    await prisma.course.deleteMany({
      where: {
        idcourse: id
      }
    });
    const courses = await prisma.course.findMany({});
    return courses;
  },
  deleteStudent: async ({
    id
  }) => {
    const grades = await prisma.grade.deleteMany({
      where: {
        student_idstudent: id
      }
    });
    await prisma.student.deleteMany({
      where: {
        idstudent: id
      }
    });
    const students = await prisma.student.findMany({});
    return students;
  },
  deleteTeacher: async ({
    id
  }) => {
    const courses = await prisma.course.deleteMany({
      where: {
        teacher_idteacher: id
      }
    });
    await prisma.teacher.deleteMany({
      where: {
        idteacher: id
      }
    });
    const teachers = await prisma.teacher.findMany({});
    return teachers;
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