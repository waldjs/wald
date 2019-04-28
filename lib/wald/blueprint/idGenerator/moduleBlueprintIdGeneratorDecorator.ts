import { AbstractBlueprintIdGeneratorDecorator } from ".";
import { Blueprint } from "..";

export class ModuleBlueprintIdGeneratorDecorator extends AbstractBlueprintIdGeneratorDecorator {
  _moduleBlueprintIdxMap = {};
  generate(blueprint: Blueprint) {
    if (blueprint.meta.moduleId == null) {
      return this._blueprintIdGenerator.generate(blueprint);
    }

    const moduleId = blueprint.meta.moduleId();
    if (blueprint.id != "") {
      return moduleId + "-" + blueprint.id;
    }

    if (this._moduleBlueprintIdxMap[moduleId] == null) {
      this._moduleBlueprintIdxMap[moduleId] = 0;
    }
    const id = this._moduleBlueprintIdxMap[moduleId]++;
    return moduleId + "-" + id;
  }
}
