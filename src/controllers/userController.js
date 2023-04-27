import generateToken from '../utils/generateToken';
import { PrismaClient } from '@prisma/client'
import bcrypt from "bcryptjs";
import { ErrorNotFound } from "../errors/NotFound.error"
import { ErrorBadRequest } from "../errors/BadRequest.error";

const prisma = new PrismaClient()

// @desc Auth user & get token
// @route GET /api/users/login
// @access Public
const authUser = async (req, res) => {
    const { email, password } = req.body;
    console.log(email, password);
    if (email && password) {
      const user = await prisma.user.findUnique({
        where: {
          email: email,
        },
      });
      if (user) {
        const isValid = await bcrypt.compare(password, user.password);
        if (isValid) {
          res.json({
            token: generateToken(user._id),
          });
        } else {
          throw new Error("Invalid email or password");
        }
      } else {
        throw new Error("Invalid email or password");
      }
    } else {
      throw new Error("Email and password are required");
    }
  };


export {
    authUser,
}