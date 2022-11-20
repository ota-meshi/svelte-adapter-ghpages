import cp from "child_process";
import path from "path";
import fs from "fs";
import assert from "assert";
// import chai from "chai"
// import { jestSnapshotPlugin } from "mocha-chai-jest-snapshot"

// chai.use(jestSnapshotPlugin())

describe("index", () => {
  let originalCwd: string;

  before(() => {
    originalCwd = process.cwd();
  });
  after(() => {
    process.chdir(originalCwd);
  });
  it("basic", () => {
    const APP_ROOT = path.resolve(__dirname, "../fixtures/apps/prerendered");

    process.chdir(APP_ROOT);
    cp.execSync("npm i --no-package-lock --legacy-peer-deps", {
      stdio: "inherit",
    });
    cp.execSync(`npm run build`, { stdio: "inherit" });

    const pathFor404 = path.join(APP_ROOT, "build/404.html");
    assert.ok(fs.existsSync(pathFor404));
    assert.ok(
      fs.readFileSync(pathFor404, "utf8").includes("<h1>This page is 404</h1>")
    );
  });
  it("missing 404", () => {
    const APP_ROOT = path.resolve(__dirname, "../fixtures/apps/missing404");

    process.chdir(APP_ROOT);
    cp.execSync("npm i --no-package-lock --legacy-peer-deps", {
      stdio: "inherit",
    });
    cp.execSync(`npm run build`, { stdio: "inherit" });

    const pathFor404 = path.join(APP_ROOT, "build/404.html");
    assert.ok(!fs.existsSync(pathFor404));
  });
});
