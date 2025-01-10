import 'reflect-metadata';
import { container } from 'tsyringe';
import { TYPES } from './types';
import { UserController } from '../controllers/UserController';
import { UserService } from '../services/UserService';
import { UserRepository } from '../repositories/UserRepository';
import { IUserService } from '../services/interfaces/IUserService';
import { IUserRepository } from '../repositories/interfaces/IUserRepository';
import { UserTypeController } from '../controllers/UserTypeController';
import { UserTypeService } from '../services/UserTypeService';
import { UserTypeRepository } from '../repositories/UserTypeRepository';
import { IUserTypeService } from '../services/interfaces/IUserTypeService';
import { IUserTypeRepository } from '../repositories/interfaces/IUserTypeRepository';
import { UserProfileController } from '../controllers/UserProfileController';
import { UserProfileService } from '../services/UserProfileService';
import { UserProfileRepository } from '../repositories/UserProfileRepository';
import { IUserProfileService } from '../services/interfaces/IUserProfileService';
import { IUserProfileRepository } from '../repositories/interfaces/IUserProfileRepository';

// Register all dependencies
container.register(TYPES.UserRepository, {
    useClass: UserRepository
});

container.register(TYPES.UserService, {
    useClass: UserService
});

container.register(TYPES.UserController, {
    useClass: UserController
});

container.register(TYPES.UserTypeRepository, {
    useClass: UserTypeRepository
});

container.register(TYPES.UserTypeService, {
    useClass: UserTypeService
});

container.register(TYPES.UserTypeController, {
    useClass: UserTypeController
});

container.register(TYPES.UserProfileRepository, {
    useClass: UserProfileRepository
});

container.register(TYPES.UserProfileService, {
    useClass: UserProfileService
});

container.register(TYPES.UserProfileController, {
    useClass: UserProfileController
});

export { container };