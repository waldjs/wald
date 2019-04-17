import { assert } from "chai";
import { EntityCreator } from ".";
import { MultitonEntityCreatorDecorator } from "./multitonEntityCreatorDecorator";
import { createBlueprint } from "../blueprint";
import { Ioc } from "../ioc";

describe("multitonEntityCreatorDecorator", function() {
  describe("create", function() {
    const useRandomById = createBlueprint({
      create: () => Math.random(),
      meta: { multiton: true }
    });

    const entityCreator = new EntityCreator();
    const multitonEntityCreatorDecorator = new MultitonEntityCreatorDecorator({
      entityCreator
    });

    it("should return the same entity for the same multitonId", function() {
      const result = multitonEntityCreatorDecorator.create({
        blueprint: useRandomById,
        creator: { multitonId: 1 },
        create: { ioc: new Ioc({}) }
      });
      const result2 = multitonEntityCreatorDecorator.create({
        blueprint: useRandomById,
        creator: { multitonId: 1 },
        create: { ioc: new Ioc({}) }
      });

      assert.equal(result, result2);
    });

    it("should return different entities for the same multitonId, when noMultiton is enabled", function() {
      const result = multitonEntityCreatorDecorator.create({
        blueprint: useRandomById,
        creator: { multitonId: 1, noMultiton: true },
        create: { ioc: new Ioc({}) }
      });
      const result2 = multitonEntityCreatorDecorator.create({
        blueprint: useRandomById,
        creator: { multitonId: 1 },
        create: { ioc: new Ioc({}) }
      });

      assert.notEqual(result, result2);
    });

    it("should throw when multitonId is missing and noMultiton is not enabled", function() {
      let throwed = false;
      try {
        multitonEntityCreatorDecorator.create({
          blueprint: useRandomById,
          creator: {},
          create: { ioc: new Ioc({}) }
        });
      } catch (err) {
        throwed = true;
      }

      assert.equal(throwed, true);
    });
  });
});
