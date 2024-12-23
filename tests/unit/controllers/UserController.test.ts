
import 'reflect-metadata';
import { container } from 'tsyringe';
import { Request, Response } from 'express';
import { UserController } from '../../../src/controllers/UserController';
import { IUserService } from '../../../src/services/interfaces/IUserService';
import { User } from '../../../src/entities/User';

// Mock service
class MockUserService implements IUserService {
  async createUser(data: any): Promise<User> {
    return { id: 1, ...data } as User;
  }

  async updateUser(id: number, data: any): Promise<User> {
    return { id, ...data } as User;
  }

  async getUserById(id: number): Promise<User> {
    return { id, firstName: 'John', lastName: 'Doe' } as User;
  }

  async deleteUser(id: number): Promise<void> {
    // Implementation not needed for this test
  }
}

describe('UserController', () => {
  let userController: UserController;
  let mockUserService: MockUserService;

  beforeEach(() => {
    mockUserService = new MockUserService();
    container.registerInstance<IUserService>('UserService', mockUserService);
    userController = container.resolve(UserController);
  });

  describe('createUser', () => {
    it('should create user and return 201 status', async () => {
      const mockRequest = {
        body: {
          firstName: 'John',
          lastName: 'Doe',
          email: 'john@example.com',
          password: 'password123'
        }
      } as Request;

      const mockResponse = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      } as unknown as Response;

      await userController.createUser(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(201);
      expect(mockResponse.json).toHaveBeenCalledWith(
        expect.objectContaining({
          id: expect.any(Number),
          firstName: 'John',
          lastName: 'Doe',
          email: 'john@example.com'
        })
      );
    });
  });

});