import { Request } from "express";

declare namespace Express {
  export interface RequestWithUser extends Request {
    user: string
  }  
}

export default RequestWithUser