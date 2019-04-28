import { IocInterface } from "../ioc";
import { BlueprintId } from "./idGenerator";
export declare type BlueprintCreateFunctionOptions = {
    [key: string]: any;
    ioc: IocInterface;
};
export declare type BlueprintCreateFunction = (options: BlueprintCreateFunctionOptions) => any;
export declare type BlueprintMeta = {
    [key: string]: any;
};
export declare type Blueprint<BCF extends BlueprintCreateFunction = BlueprintCreateFunction, BM extends BlueprintMeta = BlueprintMeta> = {
    id: BlueprintId;
    create: BCF;
    meta: BM;
};
export declare type BlueprintEntity<T extends Blueprint> = ReturnType<T["create"]>;
export declare const createBlueprint: <BCF extends BlueprintCreateFunction, BM extends BlueprintMeta>({ id, create, meta }: {
    create: BCF;
    meta?: {} | BM | undefined;
    id?: string | number | undefined;
}) => Blueprint<BCF, BM>;
export declare const mapBlueprintEntity: <B extends Blueprint<BlueprintCreateFunction, BlueprintMeta>, M extends () => ReturnType<B["create"]>>(blueprint: B, map: M) => ReturnType<B["create"]>;
export declare const equalBlueprint: (blueprintIs: Blueprint<BlueprintCreateFunction, BlueprintMeta>, blueprintShould: Blueprint<BlueprintCreateFunction, BlueprintMeta>) => boolean;
export declare const oneOfBlueprints: (blueprintIs: Blueprint<BlueprintCreateFunction, BlueprintMeta>, blueprintsShould: Blueprint<BlueprintCreateFunction, BlueprintMeta>[]) => boolean;
//# sourceMappingURL=index.d.ts.map