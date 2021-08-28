import { BaseEntity } from '../../Domain/Entities/BaseEntity';
import { ID } from '../../Domain/VO/Id.vo';
import { Macros } from './Macros.entity';

export class Food extends BaseEntity {
  constructor(_id: ID, private _name: string, private _macros: Macros) {
    super(_id, new Date(), new Date());
  }

  public serialize(): Object {
    return {};
  }

}
