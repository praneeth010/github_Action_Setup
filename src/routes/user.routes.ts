import { Router } from 'express';
import { UserController } from '../controllers/user.controller';

class UserRoutes {
  public router = Router();
  public userController = new UserController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get('/', this.userController.getAllUsers);
    this.router.get('/:id', this.userController.getUserById);
    this.router.post('/', this.userController.createUser);
    this.router.put('/:id', this.userController.updateUser);
    this.router.delete('/:id', this.userController.deleteUser);
  }
}

export default new UserRoutes().router;
