#!/usr/bin/env node
const { exec } = require("child_process");

const args = process.argv.slice(2);

if (args[0] === "init") {
  exec(
    "git clone https://github.com/symbo-ls/starter-kit",
    (error, stdout, stderr) => {
      if (error) {
        console.error(`Error: ${error.message}`);
        return;
      }
      console.log(`Clone successful: ${stdout}`);
    }
  );
} else if (args[0] === "create") {
  const x = args[1] || 16;
  const y = args[2] || 8;

} else {
  console.log('Unknown command. Use "init" or "create X Y".');
}
