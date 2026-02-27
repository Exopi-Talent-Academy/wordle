import { promises as fs } from "fs";
import path from "path";
import { pathToFileURL } from "url";
import chalk from "chalk";

const root = path.resolve("src/tests");

async function findTests(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  let files = [];
  for (const e of entries) {
    const res = path.join(dir, e.name);
    if (e.isDirectory()) files = files.concat(await findTests(res));
    else if (e.isFile() && e.name.endsWith(".test.js")) files.push(res);
  }
  return files;
}

async function run() {
  const files = await findTests(root);
  let passed = 0,
    failed = 0;
  for (const file of files) {
    process.stdout.write(`Running ${path.relative(".", file)} ... `);
    try {
      const mod = await import(pathToFileURL(file).href);
      if (typeof mod.run === "function") {
        await mod.run();
      } else {
        throw new Error("No run() export found in " + file);
      }
      console.log(chalk.green("OK"));
      passed++;
    } catch (e) {
      console.log(chalk.red("FAIL"));
      console.error(e);
      failed++;
    }
  }
  const failedMsg =
    failed > 0 ? chalk.red(`${failed} failed`) : chalk.green("all passed");
  console.log(
    chalk.blue(`\n\tSummary: ${chalk.green(`${passed} passed`)}, ${failedMsg}`),
  );
  if (failed > 0) process.exitCode = 1;
}

run().catch((err) => {
  console.error(err);
  process.exitCode = 2;
});
