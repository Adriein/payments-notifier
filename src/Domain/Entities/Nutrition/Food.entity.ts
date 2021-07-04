import { ID } from '../../VO/Id.vo';
import { BaseEntity } from '../BaseEntity';
import { Macros } from './Macros.entity';

export class Food extends BaseEntity {
  constructor(_id: ID, private _name: string, private _macros: Macros) {
    super(_id, new Date(), new Date());
  }

  public serialize(): Object {
    return {};
  }

}
