import { ID } from '../../VO/Id.vo';
import { BaseEntity } from '../BaseEntity';

export class Macros extends BaseEntity {
  constructor(
    _id: ID,
    private _ch: number,
    private _fat: number,
    private _protein: number
  ) {
    super(_id, new Date(), new Date());
  }

  public serialize(): Object {
    return {};
  }
}
