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

export class SingletonEntityCreatorDecorator
  extends AbstractEntityCreatorDecorator
  implements EntityCreatorInterface {
  _singletons = {};
  create<
    B extends Blueprint,
    CO extends CreatorOptions,
    BCO extends BlueprintCreateFunctionOptions
  >(options: { blueprint: B; creator: CO; create: BCO }): BlueprintEntity<B> {
    let blueprint = options.blueprint;
    let isSingleton =
      blueprint.meta.singleton && options.creator.noSingleton !== true;

    if (isSingleton) {
      let singleton = this._singletons[blueprint.id];
      if (singleton !== undefined) {
        return singleton;
      }
    }

    const entity = this.entityCreator.create(options);
    if (isSingleton) {
      this._singletons[blueprint.id] = entity;
    }

    return entity;
  }
}
