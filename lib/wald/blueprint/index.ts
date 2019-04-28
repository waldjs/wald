import { IocInterface } from "../ioc";
import { createBlueprintId, BlueprintId } from "./idGenerator";

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
  id: BlueprintId;
  create: BCF;
  meta: BM;
};

export type BlueprintEntity<T extends Blueprint> = ReturnType<T["create"]>;

export const createBlueprint = function<
  BCF extends BlueprintCreateFunction,
  BM extends BlueprintMeta
>({
  id = "",
  create,
  meta = {}
}: {
  create: BCF;
  meta?: BM | {};
  id?: BlueprintId;
}) {
  let blueprint: Blueprint<BCF, BM> = {
    id,
    create,
    meta: meta as any
  };

  blueprint.id = createBlueprintId(blueprint);

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
