import { EntityRepository, Repository } from 'typeorm';
import { User } from './user.entity';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async getNextId(): Promise<number> {
    const nextId = await this.query("SELECT nextval('user_id_seq')");
    return nextId[0].nextval;
  }
}
