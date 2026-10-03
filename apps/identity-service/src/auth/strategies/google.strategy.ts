import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
    constructor() {
        super({
            clientID: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
            callbackURL: process.env.GOOGLE_CALLBACK_URL!,
            scope: ['email', 'profile'],
        });
    }

    async validate(
        accessToken: string,
        refreshToken: string,
        profile: any,
        done: VerifyCallback,
    ) {
        const email = profile.emails?.[0]?.value;
        const emailVerified = profile.emails?.[0]?.verified ?? profile._json?.email_verified;

        if (!email) {
            return done(new Error('Google account has no email'), undefined);
        }
        if (emailVerified !== true && emailVerified !== 'true') {
            return done(new UnauthorizedException('Google email is not verified'), undefined);
        }

        done(null, {
            googleId: profile.id,
            email,
            displayName: profile.displayName,
        });
    }
}