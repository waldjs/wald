import { AbstractEntityCreatorDecorator } from ".";
import { EntityCreatorInterface } from ".";
import {
  BlueprintEntity,
  Blueprint,
  BlueprintCreateFunctionOptions
} from "../blueprint";
import { CreatorOptions } from ".";

type MultitonMap = {
  [key: string]: Object;
  [key: number]: Object;
};
export class MultitonEntityCreatorDecorator
  extends AbstractEntityCreatorDecorator
  implements EntityCreatorInterface {
  _multitons: MultitonMap = {};
  create<
    B extends Blueprint,
    CO extends CreatorOptions,
    BCO extends BlueprintCreateFunctionOptions
  >(options: { blueprint: B; creator: CO; create: BCO }): BlueprintEntity<B> {
    let blueprint = options.blueprint;
    let multitonId = options.creator.multitonId;
    let multiton: Object | null = null;
    let isMultiton =
      blueprint.meta.multiton && options.creator.noMultiton !== true;

    if (isMultiton && !multitonId) {
      throw "Ioc.get multiton requires multitonId in options";
    }

    if (isMultiton) {
      multiton =
        this._multitons[blueprint.id] || (this._multitons[blueprint.id] = {});
      let entity = multiton[multitonId];
      if (entity !== undefined) {
        return entity;
      }
    }

    const entity = this.entityCreator.create(options);
    if (multiton) {
      multiton[multitonId] = entity;
    }

    return entity;
  }
}
