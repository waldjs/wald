import { AbstractEntityCreatorDecorator } from ".";
import { BlueprintCreateFunctionOptions } from "../blueprint";
export declare class GlobalsEntityCreatorDecorator extends AbstractEntityCreatorDecorator {
    globals: any;
    constructor(options: {
        globals: {
            [key: string]: any;
        };
        entityCreator: any;
    });
    create(options: any): any;
}
export declare const createGlobalBlueprintCreateFn: <R = any>(globalKey: string) => (options: BlueprintCreateFunctionOptions) => R;
//# sourceMappingURL=globalsEntityCreatorDecorator.d.ts.map