import { AbstractEntityCreatorDecorator } from ".";
import { BlueprintCreateFunctionOptions } from "../blueprint";

export class GlobalsEntityCreatorDecorator extends AbstractEntityCreatorDecorator {
  globals;
  constructor(options: { globals: { [key: string]: any }; entityCreator }) {
    super(options);

    this.globals = options.globals;
  }

  create(options) {
    options.create.globals = this.globals;

    return this.entityCreator.create(options);
  }
}

export const createGlobalBlueprintCreateFn = function<R = any>(
  globalKey: string
): (options: BlueprintCreateFunctionOptions) => R {
  return function(options) {
    return options.globals[globalKey] as any;
  };
};
