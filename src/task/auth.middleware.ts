import { Body, Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction,Request,Response } from "express";
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthMiddleWare implements NestMiddleware {
    use(req: any, res: any, next: NextFunction) {
        const token  = req.headers['authorization'];
        try {
            const secretKey = "secretKey"
            const decoded = jwt.verify(token, secretKey);
            const userId = decoded.user_id;
            req.id = userId;
            console.log("Token Valid");
            next();
        } catch (error) {
            console.log("Token Invalid")
            if (error.name === 'TokenExpiredError') {
                return res.status(500).json({error: 'Token has expired.'});
            } else {
                return res.status(500).json({error: 'Token is invalid'});
            }  
        }
   }
}