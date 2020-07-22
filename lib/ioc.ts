import {
  EntityCreatorInterface,
  CreatorOptions,
  EntityCreator,
} from "./entityCreator";
import { Blueprint, BlueprintEntity } from "./blueprint";

export interface IocInterface {
  _entityCreator: EntityCreatorInterface;
  getEntityCreator: () => EntityCreatorInterface;
  setEntityCreator: (entityCreator: EntityCreatorInterface) => void;
  get: <B extends Blueprint, O extends CreatorOptions>(options: {
    blueprint: B;
    options?: O | {};
  }) => BlueprintEntity<B>;
}
export class Ioc implements IocInterface {
  _entityCreator: EntityCreatorInterface;
  constructor({
    entityCreator = new EntityCreator(),
  }: {
    entityCreator?: EntityCreatorInterface;
  } = {}) {
    this._entityCreator = entityCreator;
  }

  getEntityCreator() {
    return this._entityCreator;
  }

  setEntityCreator(entityCreator: EntityCreatorInterface) {
    this._entityCreator = entityCreator;
  }

  get<B extends Blueprint, O extends CreatorOptions>({
    blueprint,
    options = {},
  }: {
    blueprint: B;
    options?: O | {};
  }): BlueprintEntity<B> {
    return this._entityCreator.create({
      blueprint,
      creator: options,
      create: { ioc: this },
    });
  }
}
