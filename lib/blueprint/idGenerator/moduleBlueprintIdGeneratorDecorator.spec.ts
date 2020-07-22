import { assert } from "chai";
import { ModuleBlueprintIdGeneratorDecorator } from "./moduleBlueprintIdGeneratorDecorator";
import { BlueprintIdGenerator } from ".";
import { createBlueprint } from "..";

describe("ModuleBlueprintIdGeneratorDecorator", function () {
  const moduleIdGenerator = new ModuleBlueprintIdGeneratorDecorator({
    blueprintIdGenerator: new BlueprintIdGenerator(),
  });
  const blueprint = createBlueprint({
    create: () => null,
  });
  blueprint.id = "";

  const blueprintWithModuleId = createBlueprint({
    create: () => null,
    meta: { moduleId: () => "moduleId" },
  });
  blueprintWithModuleId.id = "";

  const blueprintWithIdAndModuleId = createBlueprint({
    id: "customId",
    create: () => null,
    meta: { moduleId: () => "moduleId" },
  });

  describe("generate", function () {
    it("should create an id based on the module id", function () {
      assert.equal(
        moduleIdGenerator
          .generate(blueprintWithModuleId)
          .toString()
          .startsWith("moduleId"),
        true
      );
    });

    it("should use the blueprint custom id instead of idx", function () {
      assert.equal(
        moduleIdGenerator.generate(blueprintWithIdAndModuleId),
        "moduleId-customId"
      );
    });

    it("should generate unique ids", function () {
      assert.notEqual(
        moduleIdGenerator.generate(blueprintWithModuleId),
        moduleIdGenerator.generate(blueprintWithModuleId)
      );
    });

    it("should create a normal id for blueprint without moduleId", function () {
      assert.equal(typeof moduleIdGenerator.generate(blueprint), "number");
    });
  });
});
