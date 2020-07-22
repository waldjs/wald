import { assert } from "chai";
import { EntityStorage, AbstractEntityStorageDecorator } from ".";
import { createBlueprint } from "../blueprint";

const entityStorage = new EntityStorage();

describe("EntityStorage", function () {
  const blueprint = createBlueprint({
    create: () => Math.random(),
  });

  describe("get/setEntity", function () {
    it("should set and get the same entity in the storage", function () {
      entityStorage.setEntity({
        entity: "anEntity",
        entityId: "anId1",
      });

      assert.equal(entityStorage.getEntity({ entityId: "anId1" }), "anEntity");
    });
  });
});

describe("AbstractEntityStorageDecorator", function () {
  class CustomStorage extends AbstractEntityStorageDecorator {}
  const customStorage = new CustomStorage({
    entityStorage,
  });

  describe("get/setEntity", function () {
    it("should set and get the same entity in the storage", function () {
      customStorage.setEntity({
        entity: "anEntity",
        entityId: "anId2",
      });

      assert.equal(customStorage.getEntity({ entityId: "anId2" }), "anEntity");
    });
  });

  describe("unsetEntity", function () {
    it("should unset the entity in the storage", function () {
      customStorage.setEntity({
        entity: "anEntity",
        entityId: "anId3",
      });

      customStorage.unsetEntity("anId3");
      assert.equal(customStorage.getEntity({ entityId: "anId3" }), undefined);
    });
  });
});
