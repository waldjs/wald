import { AbstractEntityCreatorDecorator, EntityCreatorInterface, CreatorOptions } from ".";
import { Blueprint, BlueprintCreateFunctionOptions, BlueprintEntity } from "../blueprint";
export declare class SingletonEntityCreatorDecorator extends AbstractEntityCreatorDecorator implements EntityCreatorInterface {
    _singletons: {};
    create<B extends Blueprint, CO extends CreatorOptions, BCO extends BlueprintCreateFunctionOptions>(options: {
        blueprint: B;
        creator: CO;
        create: BCO;
    }): BlueprintEntity<B>;
}
//# sourceMappingURL=singletonEntityCreatorDecorator.d.ts.map