/** @type {import("stylelint").Config} */
const stylelintConfig = {
  extends: ["stylelint-config-standard"],
  rules: {
    // kebab-case, optionally in BEM notation: block, block__element, block--modifier, block__element--modifier.
    "selector-class-pattern": [
      "^[a-z][a-z0-9]*(-[a-z0-9]+)*(__[a-z0-9]+(-[a-z0-9]+)*)?(--[a-z0-9]+(-[a-z0-9]+)*)?$",
      {
        message: (selector) => `Expected class selector "${selector}" to be kebab-case, optionally in BEM notation`,
      },
    ],
  },
};

export default stylelintConfig;
