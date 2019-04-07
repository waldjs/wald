import { Blueprint, BlueprintCreateFunctionOptions, BlueprintEntity } from "./../blueprint";
export declare type CreatorOptions = {
    [key: string]: any;
};
export interface EntityCreatorInterface {
    create: <B extends Blueprint, CO extends CreatorOptions, BCO extends BlueprintCreateFunctionOptions>({ blueprint: B, creator: CO, create: BCO }: {
        blueprint: any;
        creator: any;
        create: any;
    }) => BlueprintEntity<B>;
}
export declare class EntityCreator implements EntityCreatorInterface {
    create<B extends Blueprint, CO extends CreatorOptions, BCO extends BlueprintCreateFunctionOptions>({ blueprint, creator, create }: {
        blueprint: B;
        creator: CO;
        create: BCO;
    }): BlueprintEntity<B>;
}
export declare abstract class AbstractEntityCreatorDecorator implements EntityCreatorInterface {
    entityCreator: EntityCreatorInterface;
    constructor({ entityCreator }: {
        entityCreator: EntityCreator;
    });
    create<B extends Blueprint, CO extends CreatorOptions, BCO extends BlueprintCreateFunctionOptions>(options: {
        blueprint: B;
        creator: CO;
        create: BCO;
    }): BlueprintEntity<B>;
}
//# sourceMappingURL=index.d.ts.map