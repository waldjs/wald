import { assert } from "chai";
import {
  GlobalsEntityCreatorDecorator,
  createGlobalBlueprintCreateFn
} from "./globalsEntityCreatorDecorator";
import { Ioc } from "../ioc";
import { EntityCreator } from ".";
import { createBlueprint } from "../blueprint";

let TEST_VALUE = 123;
const createIoc = function() {
  let entityCreator = new EntityCreator();
  entityCreator = new GlobalsEntityCreatorDecorator({
    entityCreator,
    globals: {
      test: TEST_VALUE
    }
  });

  return new Ioc({
    entityCreator
  });
};

describe("GlobalsEntityCreatorDecorator", function() {
  const ioc = createIoc();

  it("should provide the globals to blueprint create functions", () => {
    let result = 0;
    ioc.get({
      blueprint: createBlueprint({
        create: options => {
          return (result = options.globals.test);
        }
      })
    });

    assert.equal(result, TEST_VALUE);
  });
});

describe("createGlobalBlueprintCreateFn", function() {
  const ioc = createIoc();

  it("should create a blueprint function returning the specific global value", () => {
    let result = ioc.get({
      blueprint: createBlueprint({
        create: createGlobalBlueprintCreateFn("test")
      })
    });

    assert.equal(result, TEST_VALUE);
  });
});

//console.log(blub)
