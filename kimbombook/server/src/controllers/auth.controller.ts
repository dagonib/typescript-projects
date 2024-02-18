import { Request, Response } from "express"
import RequestWithUser from "../types/express";

import jwt from 'jsonwebtoken'
import UserModel from "../models/UserModel";
import { JWT_SECRET } from "../config";

export async function signupHandler (req: Request, res: Response) {
  // Find if user exist
  const userFound = await UserModel.findOne({
    email: req.body.email
  })

  if (userFound) return res.status(403).json({ message: "This user already exists"})

  // Create a new user
  const newUser = new UserModel({
    email: req.body.email,
    password: req.body.password
  })
  // Hash password
  await newUser.hashPassword()

  const createdUser = await newUser.save()

  // Create token
  const token = jwt.sign(
    {
      _id: createdUser._id,
    },
    JWT_SECRET,
    {
      expiresIn: 60 * 60 * 24
    }
  )

  return res.json({
    token
  })
}

export const loginHandler = async (req: Request, res: Response) => {

  // Find existing user
  const userFound = await UserModel.findOne({ email: req.body.email })
  if (!userFound) return res.status(403).json({ message: "This user doesn't exists"})

  // Compare password
  const validPassword = await userFound.comparePassword(req.body.password)
  if(!validPassword) return res.status(403).json({ message: "Invalid password or email"})

   // Create token
   const token = jwt.sign(
    {
      _id: userFound._id,
    },
    JWT_SECRET,
    {
      expiresIn: 60 * 60 * 24
    }
  )

  return res.json({
    token
  })
}

export const profileHandler = async (req: RequestWithUser, res: Response) => {
  const userProfile = await UserModel.findOne({ _id: req.user._id }).select(
    "-password"
  )
  return res.json(userProfile)
}