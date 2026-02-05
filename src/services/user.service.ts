import { User } from '../models/user.model';

export class UserService {
  private users: User[] = [];

  public findAll(): User[] {
    return this.users;
  }

  public findById(id: string): User | undefined {
    return this.users.find((user) => user.id === id);
  }

  public create(user: User): User {
    this.users.push(user);
    return user;
  }

  public update(id: string, userUpdate: Partial<User>): User | null {
    const index = this.users.findIndex((user) => user.id === id);
    if (index === -1) {
      return null;
    }
    this.users[index] = { ...this.users[index], ...userUpdate };
    return this.users[index];
  }

  public delete(id: string): boolean {
    const index = this.users.findIndex((user) => user.id === id);
    if (index === -1) {
      return false;
    }
    this.users.splice(index, 1);
    return true;
  }
}
