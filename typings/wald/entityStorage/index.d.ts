import { Blueprint, BlueprintEntity } from "../blueprint";
export declare type EntityId = string | number;
export interface EntityStorageInterface {
    getEntity<T extends Blueprint>({ blueprint, entityId }: {
        blueprint: T;
        entityId: EntityId;
    }): BlueprintEntity<T> | undefined;
    setEntity<T extends Blueprint>({ blueprint, entityId, entity }: {
        blueprint: T;
        entityId: EntityId;
        entity: BlueprintEntity<T>;
    }): void;
    unsetEntity(entityId: EntityId): void;
}
export declare class EntityStorage implements EntityStorageInterface {
    _entities: {};
    getEntity<T extends Blueprint>({ entityId }: {
        entityId: EntityId;
    }): BlueprintEntity<T>;
    setEntity<T extends Blueprint>({ entity, entityId }: {
        entity: BlueprintEntity<T>;
        entityId: EntityId;
    }): void;
    unsetEntity(entityId: EntityId): void;
}
export declare abstract class AbstractEntityStorageDecorator implements EntityStorageInterface {
    _entityStorage: EntityStorageInterface;
    constructor({ entityStorage }: {
        entityStorage: EntityStorageInterface;
    });
    getEntity(options: any): any;
    setEntity(options: any): void;
    unsetEntity(entityId: any): void;
}
//# sourceMappingURL=index.d.ts.map