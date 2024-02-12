import { fileURLToPath } from "node:url";
import fse from "fs-extra";
import logSymbols from "log-symbols";
import treeCli from "tree-cli";
import ora from "ora";
import path from "node:path";

export const createStarter = async (relativeProjectPath: string) => {
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
};

