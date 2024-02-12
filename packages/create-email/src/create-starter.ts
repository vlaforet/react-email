import { fileURLToPath } from "node:url";
import fs from "node:fs/promises";
import path from "node:path";

export const createStarter = async (absoluteProjectPath: string) => {
  const __dirname = path.dirname(fileURLToPath(import.meta.url));
  const templatePath = path.resolve(__dirname, "../template");
  const resolvedProjectPath = path.resolve(absoluteProjectPath);

  await fs.cp(templatePath, resolvedProjectPath, { recursive: true });

  return absoluteProjectPath;
};
