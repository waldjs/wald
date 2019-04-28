import { Blueprint } from "..";

export type BlueprintId = string | number;

export type CreateBlueprintIdMiddleware = (
  blueprint: Blueprint,
  next: CreateBlueprintIdMiddleware
) => BlueprintId;

let globalBlueprintIdGenerator: BlueprintIdGeneratorInterface;
export const getGlobalBlueprintIdGenerator = function() {
  return globalBlueprintIdGenerator;
};
export const setGlobalBlueprintIdGenerator = function(
  blueprintIdGenerator: BlueprintIdGeneratorInterface
) {
  globalBlueprintIdGenerator = blueprintIdGenerator;
};

export const createBlueprintId = function(blueprint: Blueprint) {
  return globalBlueprintIdGenerator.generate(blueprint);
};

export interface BlueprintIdGeneratorInterface {
  generate: (blueprint: Blueprint) => BlueprintId;
}

export class BlueprintIdGenerator implements BlueprintIdGeneratorInterface {
  idx = 0;
  generate(blueprint) {
    return blueprint.id != "" ? blueprint.id : this.idx++;
  }
}

setGlobalBlueprintIdGenerator(new BlueprintIdGenerator());

export abstract class AbstractBlueprintIdGeneratorDecorator
  implements BlueprintIdGeneratorInterface {
  _blueprintIdGenerator: BlueprintIdGeneratorInterface;
  constructor({ blueprintIdGenerator: BlueprintIdGenerator }) {
    this._blueprintIdGenerator = BlueprintIdGenerator;
  }
  generate(blueprint: Blueprint) {
    return this._blueprintIdGenerator.generate(blueprint);
  }
}
