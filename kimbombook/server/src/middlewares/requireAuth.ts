import { Response, NextFunction } from "express";
import RequestWithUser from "../types/express";
import jwt from 'jsonwebtoken';

const requireAuth = (req: RequestWithUser, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization

  if (!authHeader) return res.status(401).json({
    message: "Unauthorized"
  })

  const token = authHeader.split(' ')[1]

  if (!token) return res.status(401).json({
    message: "Not Authorized"
  })
  
  
  jwt.verify(token, 'secret', (err, user) => {
    if (err) return res.status(403).json({
      message: "Forbidden"
    })
    req.user = user
    next()
    return
  })

  return
}

export default requireAuth 