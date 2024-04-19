import { traverse } from '@babel/core';
import { parse } from '@babel/parser';

export const getImportedModules = (contents: string) => {
  const importedPaths: string[] = [];
  const parsedContents = parse(contents, {
    sourceType: 'unambiguous',
    strictMode: false,
    errorRecovery: true,
    plugins: ['jsx', 'typescript'],
  });

  traverse(parsedContents, {
    ImportDeclaration(path) {
      importedPaths.push(path.node.source.value);
    },
    CallExpression(path) {
      if ('name' in path.node.callee && path.node.callee.name === 'require') {
        if (path.node.arguments.length === 1) {
          const importPathNode = path.node.arguments[0]!;
          if (importPathNode!.type === 'StringLiteral') {
            importedPaths.push(importPathNode.value);
          }
        }
      }
    },
  });

  return importedPaths;
};
