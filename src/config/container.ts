import { container } from 'tsyringe';
import { UserService } from '../services/UserService';
import { UserRepository } from '../repositories/UserRepository';
import { IUserService } from '../services/interfaces/IUserService';
import { IUserRepository } from '../repositories/interfaces/IUserRepository';

// Register repositories
container.registerSingleton<IUserRepository>(
    'UserRepository',
    UserRepository
  );
  
  // Register services
  container.registerSingleton<IUserService>(
    'UserService',
    UserService
  );
  
  export { container };