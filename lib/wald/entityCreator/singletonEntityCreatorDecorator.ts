import {
  AbstractEntityCreatorDecorator,
  EntityCreatorInterface,
  CreatorOptions
} from ".";
import {
  Blueprint,
  BlueprintCreateFunctionOptions,
  BlueprintEntity
} from "../blueprint";
import { EntityStorageInterface, EntityStorage } from "../entityStorage";

export class SingletonEntityCreatorDecorator
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
    let isSingleton =
      blueprint.meta.singleton && options.creator.noSingleton !== true;

    if (isSingleton) {
      let entity = this._entityStorage.getEntity({
        blueprint,
        entityId: blueprint.id
      });
      if (entity !== undefined) {
        return entity;
      }

      options.create.clearSingleton = () => {
        this._entityStorage.unsetEntity(blueprint.id);
      };
    }

    const entity = this.entityCreator.create(options);
    if (isSingleton) {
      this._entityStorage.setEntity({
        blueprint,
        entityId: blueprint.id,
        entity
      });
    }

    return entity;
  }
}
