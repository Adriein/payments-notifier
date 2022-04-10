import { AppFilter } from "../../Domain/Entity/AppFilter.entity";
import { AppFilterField } from "../../Domain/Entity/AppFilterField";
import { Collection } from "../../../../Shared/Domain/Entities/Collection";

export class AppFilterMapper {
  public toDomain(dataModel: any[]): AppFilter[] {
    return dataModel.reduce((acc: AppFilter[], dataModel) => {
      const createdAppFilter: AppFilter | undefined = acc.find((appFilter: AppFilter) => appFilter.entity() === dataModel.entity);

      if (createdAppFilter) {
        createdAppFilter.addField(new AppFilterField(dataModel.field!, dataModel.type!, []));
        return acc;
      }

      const appFilter = new AppFilter(
          dataModel.id!,
          dataModel.entity!,
          new Collection<AppFilterField>([
            new AppFilterField(dataModel.field!, dataModel.type!, [])
          ]),
          dataModel.created_at!,
          dataModel.updated_at!,
        )
      ;

      return [ ...acc, appFilter ];
    }, []);
  }
}