import { IocInterface } from "./ioc";

export type BlueprintCreateFunctionOptions = {
  [key: string]: any;
  ioc: IocInterface;
};
export type BlueprintCreateFunction = (
  options: BlueprintCreateFunctionOptions
) => any;
export type BlueprintMeta = {
  [key: string]: any;
};

export type Blueprint<
  BCF extends BlueprintCreateFunction = BlueprintCreateFunction,
  BM extends BlueprintMeta = BlueprintMeta
> = {
  id: number;
  create: BCF;
  meta: BM;
};

export type BlueprintEntity<T extends Blueprint> = ReturnType<T["create"]>;

let idx = 0;
export const createBlueprint = function<
  BCF extends BlueprintCreateFunction,
  BM extends BlueprintMeta
>({ create, meta = {} }: { create: BCF; meta?: BM | {} }) {
  let blueprint: Blueprint<BCF, BM> = {
    id: idx++,
    create,
    meta: meta as any
  };

  return blueprint;
};

export const mapBlueprintEntity = function<
  B extends Blueprint,
  M extends () => BlueprintEntity<B>
>(blueprint: B, map: M): BlueprintEntity<B> {
  return map();
};
export const equalBlueprint = function(
  blueprintIs: Blueprint,
  blueprintShould: Blueprint
) {
  return blueprintIs.id === blueprintShould.id;
};
export const oneOfBlueprints = function(
  blueprintIs: Blueprint,
  blueprintsShould: Blueprint[]
) {
  for (const blueprintShould of blueprintsShould) {
    if (equalBlueprint(blueprintIs, blueprintShould)) {
      return true;
    }
  }

  return false;
};
