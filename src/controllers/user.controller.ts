import { Request, Response, NextFunction } from 'express';
import { UserService } from '../services/user.service';
import { User } from '../models/user.model';


const userService = new UserService();

export class UserController {
  public getAllUsers = (req: Request, res: Response, next: NextFunction) => {
    try {
      const users: User[] = userService.findAll();
      res.status(200).json({ data: users, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public getUserById = (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId: string = req.params.id as string;
      const findUser: User | undefined = userService.findById(userId);

      if (findUser) {
        res.status(200).json({ data: findUser, message: 'findOne' });
      } else {
        res.status(404).json({ message: 'User not found' });
      }
    } catch (error) {
      next(error);
    }
  };

  public createUser = (req: Request, res: Response, next: NextFunction) => {
    try {
      const userData: User = req.body;
      // Simple ID generation if not provided
      if (!userData.id) {
         userData.id = Date.now().toString();
      }
      const createUserData: User = userService.create(userData);
      res.status(201).json({ data: createUserData, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  public updateUser = (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId: string = req.params.id as string;
      const userData: User = req.body;
      const updateUserData: User | null = userService.update(userId, userData);

      if (updateUserData) {
        res.status(200).json({ data: updateUserData, message: 'updated' });
      } else {
         res.status(404).json({ message: 'User not found' });
      }
    } catch (error) {
      next(error);
    }
  };

  public deleteUser = (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId: string = req.params.id as string;
      const deleteUser: boolean = userService.delete(userId);

      if (deleteUser) {
        res.status(200).json({ message: 'deleted' });
      } else {
        res.status(404).json({ message: 'User not found' });
      }
    } catch (error) {
      next(error);
    }
  };
}
