import { Request, Response } from "express"
import RequestWithUser from "../types/express";

import jwt from 'jsonwebtoken'

export const loginHandler = (_req: Request, res: Response) => {
  const token = jwt.sign({
    test: "test",
  }, 'secret', {
    expiresIn: 60 * 60 * 24
  })

  return res.json({
    token
  })
}

export const profileHandler = (req: RequestWithUser, res: Response) => {
  return res.json({
    profile: req.user,
    message: 'Hola2'
  })
}