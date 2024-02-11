#!/usr/bin/env node

import { Argument, program } from "@commander-js/extra-typings";
import { fileURLToPath } from "node:url";
import fse from "fs-extra";
import logSymbols from "log-symbols";
import treeCli from "tree-cli";
import ora from "ora";
import path from "node:path";

program
  .name("create-email")
  .version("0.0.19")
  .description("The easiest way to get started with React Email")
  .addArgument(new Argument("dir", "path to initialize the project")
     .default("react-email-starter"))
  .action(async (relativeProjectPath) => {
    const spinner = ora("Preparing files...\n").start();

    let projectPath = path.resolve(process.cwd(), relativeProjectPath).trim();

    const __dirname = path.dirname(fileURLToPath(import.meta.url));
    const templatePath = path.resolve(__dirname, "../template");
    const resolvedProjectPath = path.resolve(projectPath);

    await fse.copy(templatePath, resolvedProjectPath, { recursive: true });

    const { report } = await treeCli({
      l: 4,
      base: projectPath,
    });

    console.log(report);

    spinner.stopAndPersist({
      symbol: logSymbols.success,
      text: "React Email Starter files ready",
    });
  })
  .parse(process.argv);
