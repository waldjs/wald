import { Blueprint, BlueprintEntity } from "../blueprint";

export type EntityId = string | number;

export interface EntityStorageInterface {
  getEntity<T extends Blueprint>({
    blueprint,
    entityId
  }: {
    blueprint: T;
    entityId: EntityId;
  }): BlueprintEntity<T> | undefined;
  setEntity<T extends Blueprint>({
    blueprint,
    entityId,
    entity
  }: {
    blueprint: T;
    entityId: EntityId;
    entity: BlueprintEntity<T>;
  }): void;
  unsetEntity(entityId: EntityId): void;
}

export class EntityStorage implements EntityStorageInterface {
  _entities = {};
  getEntity<T extends Blueprint>({
    entityId
  }: {
    entityId: EntityId;
  }): BlueprintEntity<T> {
    return this._entities[entityId];
  }
  setEntity<T extends Blueprint>({
    entity,
    entityId
  }: {
    entity: BlueprintEntity<T>;
    entityId: EntityId;
  }) {
    this._entities[entityId] = entity;
  }
  unsetEntity(entityId: EntityId) {
    delete this._entities[entityId];
  }
}

export abstract class AbstractEntityStorageDecorator
  implements EntityStorageInterface {
  _entityStorage: EntityStorageInterface;
  constructor({ entityStorage }: { entityStorage: EntityStorageInterface }) {
    this._entityStorage = entityStorage;
  }
  getEntity(options) {
    return this._entityStorage.getEntity(options);
  }
  setEntity(options) {
    return this._entityStorage.setEntity(options);
  }
  unsetEntity(entityId) {
    return this._entityStorage.unsetEntity(entityId);
  }
}
