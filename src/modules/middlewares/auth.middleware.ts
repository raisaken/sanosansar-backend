import {
    Injectable,
    Logger,
    NestMiddleware,
    UnauthorizedException,
} from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
    private logger = new Logger();

    async use(req: any, res: any, next: () => void) {
        try {
            const tokenPrefix = 'Bearer ';
            const { authorization } = req.headers;
            if (authorization) {
                console.log({authorization})
                const token = authorization.replace(tokenPrefix, '');
                console.log({authorization, token})

                const decodedInfo = await jwt.verify(token, process.env['JWT_SECRET']);
                this.logger.log(`claim confirmed from ${decodedInfo.user.email}`)
                req.auth = decodedInfo;
                return next();
            } else {
                res.status(401).send('invalid header');
            }
        } catch (err) {
            throw new Error(err);
        }
    }
}

