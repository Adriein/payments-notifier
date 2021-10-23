import { TABLE_RELATION_METADATA } from "../../../Domain/constants";

export function OneToOne(refTable: string, refPropName: string) {
  return function (target: Object, propName: string) {
    const storedMetadata = Reflect.getMetadata(TABLE_RELATION_METADATA, target);
    const metaData = { prop: propName, refTable, refPropName };

    if (storedMetadata?.length) {
      Reflect.defineMetadata(TABLE_RELATION_METADATA, [ ...storedMetadata, metaData ], target);
      return;
    }

    Reflect.defineMetadata(TABLE_RELATION_METADATA, [ metaData ], target);
  }
}

