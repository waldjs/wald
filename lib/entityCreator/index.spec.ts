import { assert } from "chai";
import { EntityCreator, AbstractEntityCreatorDecorator } from ".";
import { createBlueprint } from "../blueprint";
import { Ioc } from "../ioc";

describe("abstractEntityCreatorDecorator", function () {
  const entityCreator = new EntityCreator();
  class CustomEntityCreatorDecorator extends AbstractEntityCreatorDecorator {}
  const customEntityCreatorDecorator = new CustomEntityCreatorDecorator({
    entityCreator,
  });
  const useObject = createBlueprint({
    create: function () {
      return {
        test: true,
      };
    },
  });

  describe("create", function () {
    it("should return the new entity of the blueprint", function () {
      const result = customEntityCreatorDecorator.create({
        blueprint: useObject,
        create: { ioc: new Ioc({}) },
        creator: {},
      });

      assert.deepEqual(result, { test: true });
    });
  });
});
