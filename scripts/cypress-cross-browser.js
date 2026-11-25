const cypress = require("cypress");

const browsers = process.argv.slice(2);
const browsersToRun = browsers.length ? browsers : ["chrome", "edge"];
const results = [];

async function run() {
  for (const browser of browsersToRun) {
    console.log(`\nRunning Cypress in ${browser}...`);

    try {
      const result = await cypress.run({ browser, headed: true });
      const passed = result.status !== "failed" && result.totalFailed === 0;

      results.push({ browser, passed });
      if (!passed) {
        console.error(result.status === "failed" ? result.message : `Tests failed in ${browser}.`);
      }
    } catch (error) {
      results.push({ browser, passed: false });
      console.error(`Could not run Cypress in ${browser}:`, error.message);
    }
  }

  console.log("\nCross-browser results:");
  for (const { browser, passed } of results) {
    console.log(`${passed ? "PASS" : "FAIL"} ${browser}`);
  }

  if (results.some(({ passed }) => !passed)) {
    process.exitCode = 1;
  }
}

run().catch((error) => {
  console.error("Cross-browser runner failed:", error);
  process.exitCode = 1;
});
