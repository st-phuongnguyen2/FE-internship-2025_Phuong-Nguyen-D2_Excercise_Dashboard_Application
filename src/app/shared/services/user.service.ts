import { StorageKeys } from '@src/app/core/constants/local-storage-keys';
import { PaginationOptions } from '@src/app/core/types/pagination-options';
import { LocalStorage } from '@src/app/core/utils/local-storage';
import { paginate } from '@src/app/core/utils/paginate';
import { User } from '@src/app/shared/models/User';
import { IUserLoginFields } from '@src/app/shared/schema-validations/login-form';

class UserService {
  async getUsers({ page = 1, limit }: PaginationOptions) {
    const list = LocalStorage.get<User[]>(StorageKeys.USERS);

    if (Array.isArray(list) && list.length > 0) {
      const actualLimit = limit != null ? limit : list.length;

      const paginatedList = paginate({ list, page, limit: actualLimit });

      return paginatedList;
    } else return [];
  }

  async registerUser(user: User) {
    let list = LocalStorage.get<User[] | null>(StorageKeys.USERS);

    if (Array.isArray(list) && list.length > 0) {
      const foundUser = list.find((item) => item.email === user.email);

      if (foundUser) {
        throw new Error('User with this email already exists!');
      }

      list.push(user);
    } else {
      list = [user];
    }
    LocalStorage.set(StorageKeys.USERS, list);
  }

  async loginUser(user: IUserLoginFields) {
    const list = LocalStorage.get<User[] | null>(StorageKeys.USERS);

    if (Array.isArray(list) && list.length > 0) {
      const foundItem = list.find(
        (item) => item.email === user.email && item.password === user.password
      );

      if (foundItem) return foundItem;
    }

    throw new Error("User with this email doesn't exist!");
  }
}

export const userService = new UserService();
