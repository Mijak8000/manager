import { UnauthorizedException } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";

import { LogoutUseCase } from "@libs/identity/application/use-cases/auth/logout.use-case";
import { AUTH_SERVICE_TOKEN, IAuthService } from "@libs/identity/domain/auth/contracts/auth.service.contracts";

jest.mock('@kodus/flow', ()=> ({
    createLogger:() => ({
        log: jest.fn(),
        error: jest.fn(),
        warn: jest.fn(),
        debug: jest.fn(),
    }),
}));

const mockAuthService = { logout: jest.fn() };

describe('LogoutUseCase', () => {
    let logoutUseCase: LogoutUseCase;
    let authService: IAuthService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                LogoutUseCase,{
                    provide: AUTH_SERVICE_TOKEN,
                    useValue: mockAuthService,
                },
            ],
        }).compile();

        logoutUseCase = module.get<LogoutUseCase>(LogoutUseCase);
        authService = module.get<IAuthService>(AUTH_SERVICE_TOKEN);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should be defined', () => {
        expect(logoutUseCase).toBeDefined();
    });

    describe('execute', () => {
        it('should successfully logou with valid refresh token', async () => {
            const mockRefreshToken = 'valid-refresh-token';
            const mockResult = { success: true };

            mockAuthService.logout.mockResolvedValue(mockResult);
            const result = await logoutUseCase.execute(mockRefreshToken);
            expect(authService.logout).toHaveBeenCalledWith(mockRefreshToken);
            expect(result).toEqual(mockResult);
        });
        it('should throw UnauthorizedException when logout fails', async () => {
            const mockRefreshToken = 'invalid-refresh-token';
            mockAuthService.logout.mockRejectedValue(new Error('Invalid token'));
            await expect(logoutUseCase.execute(mockRefreshToken)).rejects.toThrow(
                UnauthorizedException,
            );
        });
    });
});
