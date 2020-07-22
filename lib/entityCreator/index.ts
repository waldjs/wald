import {
  Blueprint,
  BlueprintCreateFunctionOptions,
  BlueprintEntity,
} from "../blueprint";

export type CreatorOptions = {
  [key: string]: any;
};
export interface EntityCreatorInterface {
  create: <
    B extends Blueprint,
    CO extends CreatorOptions,
    BCO extends BlueprintCreateFunctionOptions
  >({
    blueprint: B,
    creator: CO,
    create: BCO,
  }) => BlueprintEntity<B>;
}
export class EntityCreator implements EntityCreatorInterface {
  create<
    B extends Blueprint,
    CO extends CreatorOptions,
    BCO extends BlueprintCreateFunctionOptions
  >({
    blueprint,
    creator,
    create,
  }: {
    blueprint: B;
    creator: CO;
    create: BCO;
  }): BlueprintEntity<B> {
    return blueprint.create(create);
  }
}

export abstract class AbstractEntityCreatorDecorator
  implements EntityCreatorInterface {
  entityCreator: EntityCreatorInterface;
  constructor({ entityCreator }: { entityCreator: EntityCreator }) {
    this.entityCreator = entityCreator;
  }

  create<
    B extends Blueprint,
    CO extends CreatorOptions,
    BCO extends BlueprintCreateFunctionOptions
  >(options: { blueprint: B; creator: CO; create: BCO }): BlueprintEntity<B> {
    return this.entityCreator.create(options);
  }
}
