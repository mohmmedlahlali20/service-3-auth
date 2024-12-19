import { Injectable } from '@nestjs/common';


@Injectable()
export class UsersService {
  getStringOne() {
    try {
        return 'hey from get function one'
    } catch (error) {
        throw new Error('failed to create user')
    }
}
 getStringTwo() {
    try {
        return 'hey from get function two'
    } catch (error) {
        throw new Error('failed to create user')
    }
}
}
