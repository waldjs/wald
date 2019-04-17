import { assert } from "chai";
import { createBlueprint } from "../blueprint";
import { EntityCreator } from ".";
import { SingletonEntityCreatorDecorator } from "./singletonEntityCreatorDecorator";
import { Ioc } from "../ioc";

describe("singletonEntityCreatorDecorator", function() {
  describe("create", function() {
    const useRandomById = createBlueprint({
      create: () => Math.random(),
      meta: { singleton: true }
    });

    const entityCreator = new EntityCreator();
    const singletonEntityCreatorDecorator = new SingletonEntityCreatorDecorator(
      {
        entityCreator
      }
    );

    it("should return the same entity", function() {
      const result = singletonEntityCreatorDecorator.create({
        blueprint: useRandomById,
        creator: {},
        create: { ioc: new Ioc({}) }
      });
      const result2 = singletonEntityCreatorDecorator.create({
        blueprint: useRandomById,
        creator: {},
        create: { ioc: new Ioc({}) }
      });

      assert.equal(result, result2);
    });

    it("should return different entities if noSingleton is enabled", function() {
      const result = singletonEntityCreatorDecorator.create({
        blueprint: useRandomById,
        creator: { noSingleton: true },
        create: { ioc: new Ioc({}) }
      });
      const result2 = singletonEntityCreatorDecorator.create({
        blueprint: useRandomById,
        creator: {},
        create: { ioc: new Ioc({}) }
      });

      assert.notEqual(result, result2);
    });
  });
});
