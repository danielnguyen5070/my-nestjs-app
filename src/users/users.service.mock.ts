import { Injectable } from '@nestjs/common';

@Injectable()
export class MockUsersService {
  createUserWithPosts() {
    return { id: 1, name: 'mock-user' };
  }

  findAll() {
    return {
      data: [],
      total: 20,
      page: 1,
      lastPage: 1,
    };
  }

  updateUser() {
    return { success: true };
  }
}
