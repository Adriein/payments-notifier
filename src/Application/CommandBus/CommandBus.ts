import { CreateAppConfigCommand } from "../../Domain/Commands/AppConfig/CreateAppConfigCommand";
import { ReadAppConfigCommand } from "../../Domain/Commands/AppConfig/ReadAppConfigCommand";
import { RegisterCommand } from "../../Domain/Commands/Auth/RegisterCommand";
import { SignInCommand } from "../../Domain/Commands/Auth/SignInCommand";
import { EarningsChartCommand } from "../../Domain/Commands/Chart/EarningsChartCommand";
import { PricingChartCommand } from "../../Domain/Commands/Chart/PricingChartCommand";
import { UserChartCommand } from "../../Domain/Commands/Chart/UserChartCommand";
import { CheckForDefaultersCommand } from "../../Domain/Commands/Defaulters/CheckForDefaultersCommand";
import { EnsureUsersConsistencyCommand } from "../../Domain/Commands/Defaulters/EnsureUsersConsistencyCommand";
import { GenerateReportCommand } from "../../Domain/Commands/Defaulters/GenerateReportCommand";
import { IngestDefaultersCommand } from "../../Domain/Commands/Defaulters/IngestDefaultersCommand";
import { CreateUserCommand } from "../../Domain/Commands/User/CreateUserCommand";
import { DeleteUserCommand } from "../../Domain/Commands/User/DeleteUserCommand";
import { ReadCalculatedReportCommand } from "../../Domain/Commands/User/ReadCalculatedReportCommand";
import { ReadUserCommand } from "../../Domain/Commands/User/ReadUserCommand";
import { RegisterUserPaymentCommand } from "../../Domain/Commands/User/RegisterUserPaymentCommand";
import { UpdateUserCommand } from "../../Domain/Commands/User/UpdateUserCommand";
import { UpdateUserNotificationsCommand } from "../../Domain/Commands/User/UpdateUserNotificationsCommand";
import { ICommand } from "../../Domain/Interfaces/ICommand";
import { ICommandBus } from "../../Domain/Interfaces/ICommandBus";
import { UserFinder } from "../../Domain/Services/UserFinder";
import { PriceBuilder } from "../../Domain/Services/PriceBuilder";
import { AppConfigMapper } from "../../Infraestructure/Data/Mappers/AppConfigMapper";
import { UserMapper } from "../../Infraestructure/Data/Mappers/UserMapper";
import { AppConfigRepository } from "../../Infraestructure/Data/Repositories/AppConfigRepository";
import { UserRepository } from "../../Infraestructure/Data/Repositories/UserRepository";
import { EmailNotifier } from "../../Infraestructure/Notifiers/EmailNotifier";
import { CreateAppConfigHandler } from "../Handlers/AppConfig/CreateAppConfigHandler";
import { ReadAppConfigHandler } from "../Handlers/AppConfig/ReadAppConfigHandler";
import { RegisterHandler } from "../Handlers/Auth/RegisterHandler";
import { SignInHandler } from "../Handlers/Auth/SignInHandler";
import { CreateUsersChartHandler } from "../Handlers/Chart/CreateUsersChartHandler";
import { CheckForDefaultersHandler } from "../Handlers/Defaulters/CheckForDefaultersHandler";
import { EnsureUsersConsistencyHandler } from "../Handlers/Defaulters/EnsureUsersConsistencyHandler";
import { GenerateReportHandler } from "../Handlers/Defaulters/GenerateReportHandler";
import { IngestDefaultersHandler } from "../Handlers/Defaulters/IngestDefaultersHandler";
import { CreateUserHandler } from "../Handlers/User/CreateUserHandler";
import { DeleteUserHandler } from "../Handlers/User/DeleteUserHandler";
import { ReadCalculatedReportHandler } from "../Handlers/User/ReadCalculatedReportHandler";
import { ReadUserHandler } from "../Handlers/User/ReadUserHandler";
import { RegisterUserPaymentHandler } from "../Handlers/User/RegisterUserPaymentHandler";
import { UpdateUserHandler } from "../Handlers/User/UpdateUserHandler";
import { UpdateUserNotificationsHandler } from "../Handlers/User/UpdateUserNotificationsHandler";
import { CriteriaBuilder } from "../../Domain/Services/CriteriaBuilder";
import { CriteriaMapper } from "../../Infraestructure/Data/Mappers/CriteriaMapper";
import { SubscriptionMapper } from "../../Infraestructure/Data/Mappers/SubscriptionMapper";
import { CreatePricingCommand } from "../../Domain/Commands/AppConfig/CreatePricingCommand";
import { CreatePricingHandler } from "../Handlers/AppConfig/CreatePricingHandler";
import { ModifyAppConfigCommand } from "../../Domain/Commands/AppConfig/ModifyAppConfigCommand";
import { ModifyAppConfigHandler } from "../Handlers/AppConfig/ModifyAppConfigHandler";


export class CommandBus implements ICommandBus {
  //repos
  private usersRepository = new UserRepository('users', new UserMapper(), new CriteriaMapper(), new SubscriptionMapper());
  private appConfigRepository = new AppConfigRepository('app_config', new AppConfigMapper(), new CriteriaMapper());

  //services
  private notifier = new EmailNotifier();
  private userFinder = new UserFinder(this.usersRepository);
  private priceBuilder = new PriceBuilder(this.appConfigRepository);
  private criteriaBuilder = new CriteriaBuilder();
  
  constructor() {}

  public async execute(command: ICommand): Promise<any> {
    return await this.resolveHandler(command).handle(command);
  }

  private resolveHandler(command: ICommand) {
    if (command instanceof CheckForDefaultersCommand) {
      return new CheckForDefaultersHandler(this.notifier, this.usersRepository, this.appConfigRepository, this.userFinder);
    }

    if (command instanceof IngestDefaultersCommand) {
      return new IngestDefaultersHandler(this.usersRepository);
    }

    if (command instanceof GenerateReportCommand) {
      return new GenerateReportHandler(this.notifier, this.userFinder, this.appConfigRepository);
    }

    if (command instanceof EnsureUsersConsistencyCommand) {
      return new EnsureUsersConsistencyHandler(this.usersRepository, this.userFinder);
    }

    if (command instanceof RegisterCommand) {
      return new RegisterHandler(this.usersRepository, this);
    }

    if (command instanceof SignInCommand) {
      return new SignInHandler(this.userFinder);
    }

    if (command instanceof ReadUserCommand) {
      return new ReadUserHandler(this.userFinder);
    }

    if (command instanceof ReadCalculatedReportCommand) {
      return new ReadCalculatedReportHandler(this.userFinder);
    }

    if (command instanceof UpdateUserNotificationsCommand) {
      return new UpdateUserNotificationsHandler(this.userFinder, this.usersRepository);
    }

    if (command instanceof CreateUserCommand) {
      return new CreateUserHandler(this.usersRepository, this.priceBuilder);
    }

    if(command instanceof DeleteUserCommand) {
      return new DeleteUserHandler(this.userFinder, this.usersRepository);
    }

    if(command instanceof RegisterUserPaymentCommand) {
      return new RegisterUserPaymentHandler(this.userFinder, this.usersRepository);
    }

    if(command instanceof UpdateUserCommand) {
      return new UpdateUserHandler(this.userFinder, this.usersRepository, this.priceBuilder);
    }

    if(command instanceof CreateAppConfigCommand) {
      return new CreateAppConfigHandler(this.appConfigRepository);
    }

    if(command instanceof ModifyAppConfigCommand) {
      return new ModifyAppConfigHandler(this.appConfigRepository);
    }

    if(command instanceof ReadAppConfigCommand) {
      return new ReadAppConfigHandler(this.appConfigRepository);
    }

    if(command instanceof CreatePricingCommand) {
      return new CreatePricingHandler(this.appConfigRepository);
    }

    if (command instanceof EarningsChartCommand) {
      throw new Error();
    }

    if (command instanceof PricingChartCommand) {
      throw new Error();
    }

    if (command instanceof UserChartCommand) {
      return new CreateUsersChartHandler(this.userFinder);
    }

    throw new Error();
  }
}
