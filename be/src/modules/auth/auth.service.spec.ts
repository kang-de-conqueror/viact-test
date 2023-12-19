import { AuthService } from './auth.service';
import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

describe('AuthService', () => {
  let service: AuthService;

  const mockedUserService = {
    validateUsernamePassword: jest.fn(),
    createUser: jest.fn(),
  };

  const mockedJwtService = {
    sign: jest.fn(),
  };

  const mockedConfigService = {
    get: jest.fn(),
  };

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: UserService, useValue: mockedUserService },
        { provide: JwtService, useValue: mockedJwtService },
        { provide: ConfigService, useValue: mockedConfigService },
      ],
    }).compile();

    service = moduleRef.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('login', () => {
    it('should throw error if username or password is invalid', () => {
      const input = {
        username: 'test',
        password: 'test',
      };
      mockedUserService.validateUsernamePassword.mockResolvedValue(null);
      expect(service.login(input)).rejects.toThrowError(
        'Invalid username or password',
      );
    });

    it('should return access token if username and password are valid', async () => {
      const input = {
        username: 'test',
        password: 'test',
      };
      const user = {
        id: 1,
        username: 'test',
        password: 'test',
      };
      const accessToken = 'test';
      mockedUserService.validateUsernamePassword.mockResolvedValue(user);
      mockedJwtService.sign.mockReturnValue(accessToken);
      expect(await service.login(input)).toEqual({ accessToken });
    });
  });

  describe('register', () => {
    it('should return access token after creating new user', () => {
      const input = {
        username: 'test',
        password: 'test',
        name: 'test',
      };
      const user = {
        id: 1,
        username: 'test',
        password: 'test',
      };
      const accessToken = 'test';
      mockedUserService.createUser.mockResolvedValue(user);
      mockedJwtService.sign.mockReturnValue(accessToken);
      expect(service.register(input)).resolves.toEqual({ accessToken });
    });

    afterEach(() => {
      jest.resetAllMocks();
    });
  });

  describe('getAuthToken', () => {
    const accessTokenExpiry = 100;
    const user = { id: 1, username: 'username' };

    const payload = {
      username: user.username,
      sub: user.id,
    };

    beforeEach(() => {
      jest.spyOn(mockedConfigService, 'get').mockImplementation((key) => {
        let value = null;
        switch (key) {
          case 'jwt.accessTokenExpiresInSeconds':
            value = accessTokenExpiry;
            break;
        }
        return value;
      });

      jest
        .spyOn(mockedJwtService, 'sign')
        .mockImplementation(() => 'signed-response');
    });

    it('should generate access token with payload', () => {
      const result = service.getAuthToken(user);

      expect(mockedJwtService.sign).toBeCalledWith(
        { ...payload },
        { expiresIn: accessTokenExpiry },
      );

      expect(result).toMatchObject({
        accessToken: 'signed-response',
      });
    });

    afterEach(() => {
      jest.resetAllMocks();
    });
  });
});
