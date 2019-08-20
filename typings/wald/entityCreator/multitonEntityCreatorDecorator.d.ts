import { AbstractEntityCreatorDecorator } from ".";
import { EntityCreatorInterface } from ".";
import { BlueprintEntity, Blueprint, BlueprintCreateFunctionOptions } from "../blueprint";
import { CreatorOptions } from ".";
import { EntityStorageInterface } from "../entityStorage";
export declare class MultitonEntityCreatorDecorator extends AbstractEntityCreatorDecorator implements EntityCreatorInterface {
    _entityStorage: EntityStorageInterface;
    constructor(options: {
        entityCreator: EntityCreatorInterface;
        entityStorage?: EntityStorageInterface;
    });
    create<B extends Blueprint, CO extends CreatorOptions, BCO extends BlueprintCreateFunctionOptions>(options: {
        blueprint: B;
        creator: CO;
        create: BCO;
    }): BlueprintEntity<B>;
}
//# sourceMappingURL=multitonEntityCreatorDecorator.d.ts.map