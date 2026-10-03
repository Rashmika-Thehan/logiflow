import { Body, Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import type { Request, Response } from 'express';
import { JwtAuthGuard } from '@app/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { GoogleAuthGuard } from './guards/google-auth.guard';
import { Public } from '@app/common';

const COOKIE_OPTIONS = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax' as const,
};

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    private setAuthCookies(res: Response, tokens: { accessToken: string; refreshToken: string }) {
        res.cookie('accessToken', tokens.accessToken, {
            ...COOKIE_OPTIONS,
            maxAge: 15 * 60 * 1000, // 15 mins
        });
        res.cookie('refreshToken', tokens.refreshToken, {
            ...COOKIE_OPTIONS,
            maxAge: 5 * 24 * 60 * 60 * 1000, // 5 days
        });
    }

    @Public()
    @Post('register')
    async register(@Body() dto: RegisterDto, @Res({ passthrough: true }) res: Response) {
        const tokens = await this.authService.register(dto);
        this.setAuthCookies(res, tokens);
        return { message: 'Registration successful' };
    }

    @Public()
    @Post('login')
    async login(@Body() dto: LoginDto, @Res({ passthrough: true }) res: Response) {
        const tokens = await this.authService.login(dto);
        this.setAuthCookies(res, tokens);
        return { message: 'Login successful' };
    }

    @Public()
    @Post('refresh')
    async refresh(
        @Req() req: Request,
        @Body('refreshToken') bodyRefreshToken: string | undefined,
        @Res({ passthrough: true }) res: Response,
    ) {
        const refreshToken = req.cookies?.refreshToken || bodyRefreshToken;
        const tokens = await this.authService.refresh(refreshToken);
        this.setAuthCookies(res, tokens);
        return { message: 'Token refreshed successfully' };
    }

    @UseGuards(JwtAuthGuard)
    @Post('logout')
    async logout(@Req() req: any, @Res({ passthrough: true }) res: Response) {
        await this.authService.logout(req.user, req.cookies?.refreshToken);
        res.clearCookie('accessToken');
        res.clearCookie('refreshToken');
        return { success: true };
    }

    @Public()
    @UseGuards(GoogleAuthGuard)
    @Get('google')
    googleAuth() {
    }

    @Public()
    @UseGuards(GoogleAuthGuard)
    @Get('google/callback')
    async googleCallback(@Req() req: any, @Res() res: Response) {
        const tokens = await this.authService.validateOAuthLogin(req.user);
        this.setAuthCookies(res, tokens);
        const frontendUrl = process.env.FRONTEND_URL ?? 'http://localhost:3000';
        res.redirect(`${frontendUrl}/dashboard`);
    }

    @Get('me')
    me(@Req() req: any) {
        return { userId: req.user.userId, tenantId: req.user.tenantId, role: req.user.role };
    }
}
