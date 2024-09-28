import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { FirebaseService } from "../../firebase/firebase.service";
import { Reflector } from "@nestjs/core";
import { IS_PUBLIC_KEY } from "../decorators/public.decorator";

@Injectable()
export class AuthGuardService implements CanActivate {
    constructor(
        private readonly firebaseService: FirebaseService,
        private readonly reflector: Reflector // Inject Reflector
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        // Use Reflector to get metadata for the route
        const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);
        console.log("public value: ", isPublic);

        // If the route is public, bypass the guard
        if (isPublic) {
            return true;
        }

        const request = context.switchToHttp().getRequest();
        const authorization = request.headers['authorization'];

        if (!authorization) {
            throw new UnauthorizedException('No token provided');
        }

        const token = authorization.split(' ')[1];
        if (!token) {
            throw new UnauthorizedException('Malformed token');
        }

        try {
            const decodedToken = await this.firebaseService.verifyToken(token);
            request.user = decodedToken;
            return true;
        } catch (err) {
            throw new UnauthorizedException('Unauthorized access');
        }
    }
}
