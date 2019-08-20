import { Blueprint } from "..";
export declare type BlueprintId = string | number;
export declare type CreateBlueprintIdMiddleware = (blueprint: Blueprint, next: CreateBlueprintIdMiddleware) => BlueprintId;
export declare const getGlobalBlueprintIdGenerator: () => BlueprintIdGeneratorInterface;
export declare const setGlobalBlueprintIdGenerator: (blueprintIdGenerator: BlueprintIdGeneratorInterface) => void;
export declare const createBlueprintId: (blueprint: Blueprint<import("..").BlueprintCreateFunction, import("..").BlueprintMeta>) => string | number;
export interface BlueprintIdGeneratorInterface {
    generate: (blueprint: Blueprint) => BlueprintId;
}
export declare class BlueprintIdGenerator implements BlueprintIdGeneratorInterface {
    idx: number;
    generate(blueprint: any): any;
}
export declare abstract class AbstractBlueprintIdGeneratorDecorator implements BlueprintIdGeneratorInterface {
    _blueprintIdGenerator: BlueprintIdGeneratorInterface;
    constructor({ blueprintIdGenerator: BlueprintIdGenerator }: {
        blueprintIdGenerator: any;
    });
    generate(blueprint: Blueprint): string | number;
}
//# sourceMappingURL=index.d.ts.map