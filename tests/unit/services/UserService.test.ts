import 'reflect-metadata';
import { container } from 'tsyringe';
import { UserService } from '../../../src/services/UserService';
import { IUserRepository } from '../../../src/repositories/interfaces/IUserRepository';
import { User } from '../../../src/entities/User';

// Mock repository
class MockUserRepository implements IUserRepository {
  private users: User[] = [];

  async findById(id: number): Promise<User | null> {
    return this.users.find(u => u.id === id) || null;
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.users.find(u => u.email === email) || null;
  }

  async create(userData: Partial<User>): Promise<User> {
    const user = { id: this.users.length + 1, ...userData } as User;
    this.users.push(user);
    return user;
  }

  async update(id: number, userData: Partial<User>): Promise<User> {
    const index = this.users.findIndex(u => u.id === id);
    if (index === -1) throw new Error('User not found');
    
    this.users[index] = { ...this.users[index], ...userData };
    return this.users[index];
  }

  async delete(id: number): Promise<void> {
    const index = this.users.findIndex(u => u.id === id);
    if (index === -1) throw new Error('User not found');
    this.users.splice(index, 1);
  }
}

describe('UserService', () => {
  let userService: UserService;
  let userRepository: MockUserRepository;

  beforeEach(() => {
    userRepository = new MockUserRepository();
    container.registerInstance<IUserRepository>('UserRepository', userRepository);
    userService = container.resolve(UserService);
  });

  describe('createUser', () => {
    it('should create a new user successfully', async () => {
      const userData = {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        password: 'password123'
      };

      const user = await userService.createUser(userData);

      expect(user).toMatchObject(userData);
      expect(user.id).toBeDefined();
    });

    it('should throw error if user with email already exists', async () => {
      const userData = {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        password: 'password123'
      };

      await userService.createUser(userData);

      await expect(userService.createUser(userData)).rejects.toThrow(
        'User with this email already exists'
      );
    });
  });

});