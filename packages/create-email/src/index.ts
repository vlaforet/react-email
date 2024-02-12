#!/usr/bin/env node

import { Argument, program } from "@commander-js/extra-typings";
import logSymbols from "log-symbols";
import path from "node:path";
import ora from "ora";
import treeCli from "tree-cli";
import { createStarter } from "./create-starter";

program
  .name("create-email")
  .version("0.0.19")
  .description("The easiest way to get started with React Email")
  .addArgument(
    new Argument(
      "relativeProjectPath",
      "relative path of where to initialize the project",
    ).default("./react-email-starter"),
  )
  .action(async (relativeProjectPath) => {
    const spinner = ora("Preparing files...\n").start();

    const projectPath = path.resolve(process.cwd(), relativeProjectPath).trim();

    await createStarter(relativeProjectPath);

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
