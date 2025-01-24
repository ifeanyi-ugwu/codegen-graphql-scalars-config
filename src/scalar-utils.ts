type ScalarImport = {
  name: string;
  from?: string;
  as?: string;
};

interface ScalarConfigurationResult {
  imports: string[];
  scalarsConfig: Record<
    string,
    {
      input: string;
      output: string;
    }
  >;
}

export function createScalarConfiguration(
  imports: ScalarImport[]
): ScalarConfigurationResult {
  const importStatements = imports.map((imp) => {
    const fromSource = imp.from || "graphql-scalars";
    const importName = imp.as || `GraphQL${imp.name}`;
    return `import { ${importName} } from '${fromSource}';`;
  });

  const scalarsConfig = imports.reduce(
    (acc, imp) => ({
      ...acc,
      [imp.name]: {
        input: `ReturnType<typeof ${
          imp.as || `GraphQL${imp.name}`
        }[ 'parseValue']>`,
        output: `ReturnType<typeof ${
          imp.as || `GraphQL${imp.name}`
        }[ 'serialize']>`,
      },
    }),
    {}
  );

  return {
    imports: importStatements,
    scalarsConfig,
  };
}
