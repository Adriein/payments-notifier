import { User } from '../../../Domain/Entities/User.entity';
import { ICommand, IHandler } from '../../../Domain/Interfaces';
import { UserFinder } from '../../../Domain/Services/UserFinder';
import { OPERATORS, USER_ROLE } from '../../../Domain/constants';
import { Log } from '../../../Domain/Decorators/Log';
import { ReadCalculatedReportCommand } from '../../../Domain/Commands/User/ReadCalculatedReportCommand';
import { Criteria } from '../../../Domain/Entities/Criteria.entity';
import { Filter } from '../../../Domain/Entities/Filter.entity';
import { CriteriaObject } from '../../../Domain/types';

export class ReadCalculatedReportHandler implements IHandler<User[]> {
  constructor(private finder: UserFinder) {}

  @Log(process.env.LOG_LEVEL)
  public async handle(comm: ICommand): Promise<User[]> {
    const command = comm as ReadCalculatedReportCommand;

    if (command.criteria) {
      let filteredUsers: User[] = [];
      const [filters, postprocessFilters] = this.buildFilters(command);

      if (filters.length) {
        const criteria = new Criteria(filters);

        const users = (await this.finder.find(
          undefined,
          undefined,
          criteria
        )) as User[];

        filteredUsers.push(...users);
      }

      if (postprocessFilters.length) {
        if (!filteredUsers.length) {
          const users = (await this.finder.find()) as User[];
          filteredUsers.push(...users);
        }

        const postFilteredUsers = this.postFiltering(
          postprocessFilters,
          filteredUsers
        );

        filteredUsers = [...postFilteredUsers];
      }

      return filteredUsers;
    }

    return (await this.finder.find()) as User[];
  }

  private buildFilters(command: ReadCalculatedReportCommand): Filter[][] {
    const criteriaObj: CriteriaObject = command.criteria!;
    const filters: Filter[] = [];
    const postprocessFilters: Filter[] = [];
    
    for (let key of Object.keys(criteriaObj)) {
      if (key === 'pricing') {
        filters.push(new Filter(key, `%${criteriaObj[key].value}%`, OPERATORS.like));
        continue;
      }
      if (key !== 'defaulter') {
        filters.push(new Filter(key, criteriaObj[key].value, criteriaObj[key].operation));
        continue;
      }

      postprocessFilters.push(
        new Filter(key, criteriaObj[key].value, criteriaObj[key].operation)
      );
    }
    return [filters, postprocessFilters];
  }

  private postFiltering(postprocessFilters: Filter[], users: User[]) {
    const postFilteredUsers: User[] = [];
    for (const filter of postprocessFilters) {
      switch (filter.field) {
        case 'defaulter':
          postFilteredUsers.push(
            ...users.filter(
              (user) =>
                user.isDefaulter() === (filter.value === 'true' ? true : false)
            )
          );
      }
    }

    return postFilteredUsers;
  }
}
