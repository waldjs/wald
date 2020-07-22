import { assert } from "chai";
import { promiseAllObject } from "./utils";

describe("utils", function () {
  describe("promiseAllObject", function () {
    it("should resolve all promises from the provided object", async function () {
      const result = await promiseAllObject(Promise, {
        noPro: true,
        noPro2: 5,
        pro: new Promise<string>((res) => setTimeout(() => res("1"), 100)),
        pro2: new Promise<{ pro: number }>((res) =>
          setTimeout(() => res({ pro: 2 }), 50)
        ),
        pro3: Promise.resolve(5),
      });

      assert.deepEqual(result, {
        noPro: true,
        noPro2: 5,
        pro: "1",
        pro2: { pro: 2 },
        pro3: 5,
      });
    });
  });
});
