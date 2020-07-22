import { assert } from "chai";
import { Ioc } from "./ioc";
import { createBlueprint } from "./blueprint";
import { EntityCreator } from "./entityCreator";

describe("ioc", function() {
  const useObject = createBlueprint({
    create: function() {
      return {
        test: true
      };
    }
  });

  const ioc = new Ioc();

  describe("get", function() {
    it("should return the resolved entity of the blueprint", function() {
      const result = ioc.get({ blueprint: useObject });
      assert.deepEqual(result, {
        test: true
      });
    });

    it("should send the creator options to the entityCreator", function() {
      let creatorOptionsRef;
      const ioc = new Ioc({
        entityCreator: {
          create: ({ creator }) => {
            creatorOptionsRef = creator;

            return "" as any;
          }
        }
      });

      ioc.get({ blueprint: useObject, options: { myOption: true } });
      assert.equal(creatorOptionsRef.myOption, true);
    });
  });

  describe("getEntityCreator", function() {
    it("should return the set entityCreator", function() {
      assert.equal(ioc.getEntityCreator(), ioc._entityCreator);
    });
  });

  describe("constructor", function() {
    it("should accept entityCreator", function() {
      const newEntityCreator = new EntityCreator();
      const ioc = new Ioc({ entityCreator: newEntityCreator });
      assert.equal(ioc.getEntityCreator(), newEntityCreator);
    });
  });

  describe("setEntityCreator", function() {
    it("should set the new entityCreator", function() {
      const newEntityCreator = new EntityCreator();
      ioc.setEntityCreator(newEntityCreator);
      assert.equal(ioc.getEntityCreator(), newEntityCreator);
    });
  });
});
