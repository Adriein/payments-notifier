import { ONE_TO_ONE_RELATION, TABLE_RELATION_METADATA } from "../../../Domain/constants";
import { ConstructorFunc, RelationMetadata } from "../../../Domain/types";

export function OneToOne(refTable: string, refPropName: string, constructor: ConstructorFunc) {
  return function (target: Object, propName: string) {
    const storedMetadata = Reflect.getMetadata(TABLE_RELATION_METADATA, target);
    const metaData: RelationMetadata = {
      prop: propName,
      refTable,
      refPropName,
      dao: constructor,
      type: ONE_TO_ONE_RELATION
    };

    if (storedMetadata?.length) {
      Reflect.defineMetadata(TABLE_RELATION_METADATA, [ ...storedMetadata, metaData ], target);
      return;
    }

    Reflect.defineMetadata(TABLE_RELATION_METADATA, [ metaData ], target);
  }
}

