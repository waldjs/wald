import { EntityCreatorInterface, CreatorOptions } from "./entityCreator";
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
export declare class Ioc implements IocInterface {
    _entityCreator: EntityCreatorInterface;
    constructor({ entityCreator }?: {
        entityCreator?: EntityCreatorInterface;
    });
    getEntityCreator(): EntityCreatorInterface;
    setEntityCreator(entityCreator: EntityCreatorInterface): void;
    get<B extends Blueprint, O extends CreatorOptions>({ blueprint, options }: {
        blueprint: B;
        options?: O | {};
    }): BlueprintEntity<B>;
}
//# sourceMappingURL=ioc.d.ts.map