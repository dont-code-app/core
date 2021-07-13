import { Change, ChangeType} from "../change/change";
import { DontCodeModelPointer } from "../model/dont-code-schema";

export class DontCodeTestManager {
  public static createDeleteChange (containerSchema: string, containerItemId: string|null, schema: string|null, itemId: string|null, property?:string) {
    return DontCodeTestManager.createAnyChange(ChangeType.DELETE, containerSchema, containerItemId, schema, itemId, null, property);
  }

  public static createMoveChange (oldPosition:string, beforeIdOrProperty:string|null, containerSchema: string, containerItemId: string|null, schema: string, itemId: string, property?:string) {
    const ret = DontCodeTestManager.createAnyChange(ChangeType.MOVE, containerSchema, containerItemId, schema, itemId, null, property);
    ret.oldPosition=oldPosition;
    if( beforeIdOrProperty)
      ret.beforeKey=beforeIdOrProperty;
    return ret;
  }

  public static createTestChange(containerSchema: string, containerItemId: string|null, schema: string|null, itemId: string|null, value: any, property?:string) {
    return DontCodeTestManager.createAnyChange(ChangeType.ADD, containerSchema, containerItemId, schema, itemId, value, property);
  }

  public static createAnyChange(type:ChangeType, containerSchema: string, containerItemId: string|null, schema: string|null, itemId: string|null, value: any, property?:string) {
    let calcContainerItemId=containerItemId?'/'+containerItemId:'';
    let calcItemId=itemId?'/'+itemId:'';
    let calcSchema=schema?'/'+schema:'';
    let calcProperty=property?'/'+property:'';
    let calcPropertySchemaItem = (property)?calcSchema + calcItemId:'';
    let calcPropertySchema = (property)?calcSchema:'';

    return new Change(type,
      containerSchema + calcContainerItemId + calcSchema + calcItemId + calcProperty,
      value, new DontCodeModelPointer(
        containerSchema + calcContainerItemId + calcSchema + calcItemId + calcProperty,
        containerSchema + calcSchema + calcProperty,
        containerSchema + calcContainerItemId+ calcPropertySchemaItem,
        containerSchema + calcPropertySchema,
        property?property:null,
        property?null:itemId
      ));
  };

}
