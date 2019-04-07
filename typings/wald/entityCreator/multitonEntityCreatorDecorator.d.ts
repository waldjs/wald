import { AbstractEntityCreatorDecorator } from ".";
import { EntityCreatorInterface } from ".";
import { BlueprintEntity, Blueprint, BlueprintCreateFunctionOptions } from "../blueprint";
import { CreatorOptions } from ".";
declare type MultitonMap = {
    [key: string]: Object;
    [key: number]: Object;
};
export declare class MultitonEntityCreatorDecorator extends AbstractEntityCreatorDecorator implements EntityCreatorInterface {
    _multitons: MultitonMap;
    create<B extends Blueprint, CO extends CreatorOptions, BCO extends BlueprintCreateFunctionOptions>(options: {
        blueprint: B;
        creator: CO;
        create: BCO;
    }): BlueprintEntity<B>;
}
export {};
//# sourceMappingURL=multitonEntityCreatorDecorator.d.ts.map