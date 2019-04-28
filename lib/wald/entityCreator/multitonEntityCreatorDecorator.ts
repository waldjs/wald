import { AbstractEntityCreatorDecorator } from ".";
import { EntityCreatorInterface } from ".";
import {
  BlueprintEntity,
  Blueprint,
  BlueprintCreateFunctionOptions
} from "../blueprint";
import { CreatorOptions } from ".";
import { EntityStorageInterface, EntityStorage } from "../entityStorage";

export class MultitonEntityCreatorDecorator
  extends AbstractEntityCreatorDecorator
  implements EntityCreatorInterface {
  _entityStorage: EntityStorageInterface;

  constructor(options: {
    entityCreator: EntityCreatorInterface;
    entityStorage?: EntityStorageInterface;
  }) {
    super(options);

    this._entityStorage = options.entityStorage || new EntityStorage();
  }

  create<
    B extends Blueprint,
    CO extends CreatorOptions,
    BCO extends BlueprintCreateFunctionOptions
  >(options: { blueprint: B; creator: CO; create: BCO }): BlueprintEntity<B> {
    let blueprint = options.blueprint;
    let multitonId = options.creator.multitonId;
    let isMultiton =
      blueprint.meta.multiton && options.creator.noMultiton !== true;

    if (isMultiton && multitonId == null) {
      throw "Ioc.get multiton requires multitonId in options";
    }

    const entityId = multitonId + "-" + blueprint.id;

    if (isMultiton) {
      const entity = this._entityStorage.getEntity({ entityId, blueprint });
      if (entity !== undefined) {
        return entity;
      }

      options.create.clearMultiton = () => {
        this._entityStorage.unsetEntity(entityId);
      };
    }

    const entity = this.entityCreator.create(options);
    if (isMultiton) {
      this._entityStorage.setEntity({ entityId, entity, blueprint });
    }

    return entity;
  }
}
