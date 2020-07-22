import {
  getGlobalBlueprintIdGenerator,
  BlueprintIdGenerator,
  setGlobalBlueprintIdGenerator,
  AbstractBlueprintIdGeneratorDecorator,
  createBlueprintId,
} from ".";
import { assert } from "chai";
import { createBlueprint } from "..";

describe("get/setGlobalBlueprintIdGenerator", function () {
  it("should set and return the global generator", function () {
    const customIdGenerator = new BlueprintIdGenerator();
    const originalIdGenerator = getGlobalBlueprintIdGenerator();
    setGlobalBlueprintIdGenerator(customIdGenerator);

    assert.equal(getGlobalBlueprintIdGenerator(), customIdGenerator);
    setGlobalBlueprintIdGenerator(originalIdGenerator);
  });
});

describe("AbstractBlueprintIdGeneratorDecorator", function () {
  describe("generate", function () {
    it("should return a new id", function () {
      const defaultGenerator = new BlueprintIdGenerator();
      class MyGenerator extends AbstractBlueprintIdGeneratorDecorator {}
      const generator = new MyGenerator({
        blueprintIdGenerator: defaultGenerator,
      });

      const blueprint = createBlueprint({ create: () => null });
      blueprint.id = "";
      const firstId = generator.generate(blueprint);
      const secondId = generator.generate(blueprint);

      assert.notEqual(firstId, secondId);
    });
  });
});

describe("createBlueprintId", function () {
  it("should create unique ids", function () {
    const blueprint = createBlueprint({
      create: () => null,
    });
    blueprint.id = "";

    assert.notEqual(createBlueprintId(blueprint), createBlueprintId(blueprint));
  });
});
