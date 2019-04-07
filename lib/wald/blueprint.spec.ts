import { assert } from "chai";
import { Ioc } from "./ioc";
import {
  createBlueprint,
  mapBlueprintEntity,
  equalBlueprint,
  oneOfBlueprints
} from "./blueprint";

describe("blueprint", function() {
  const useObject = createBlueprint({
    create: function() {
      return {
        test: true
      };
    }
  });
  const useBool = createBlueprint({
    create: function() {
      return true;
    }
  });
  const useNumber = createBlueprint({
    create: function() {
      return 1;
    }
  });

  describe("mapBlueprintEntity", function() {
    it("should return the result of the function", function() {
      const expectedResult = {
        test: false
      };
      const result = mapBlueprintEntity(useObject, function() {
        return expectedResult;
      });

      assert.equal(result, expectedResult);
    });
  });

  describe("equalBlueprint", function() {
    it("should return true if the blueprints are equal", function() {
      const result = equalBlueprint(useObject, useObject);

      assert.equal(result, true);
    });
  });

  describe("oneOfBlueprints", function() {
    it("should return true if one of the blueprints are equal", function() {
      const result = oneOfBlueprints(useObject, [useObject, useBool]);

      assert.equal(result, true);
    });

    it("should return false if none of the blueprints are equal", function() {
      const result = oneOfBlueprints(useObject, [useBool, useNumber]);

      assert.equal(result, false);
    });
  });
});
