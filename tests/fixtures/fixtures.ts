import { test as baseTest } from "../fixtures/base-fixtures";
import { test as setupTest } from "../fixtures/setup-fixtures";
import { mergeTests, expect } from "@playwright/test";
export { expect };

export const test = mergeTests(baseTest, setupTest);
