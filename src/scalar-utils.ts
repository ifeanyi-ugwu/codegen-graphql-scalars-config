type ScalarImport = {
  name: string;
  from?: string;
  as: string;
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
    return `import { ${imp.as} } from '${fromSource}';`;
  });

  const scalarsConfig = imports.reduce(
    (acc, imp) => ({
      ...acc,
      [imp.name]: {
        input: `ReturnType<typeof ${imp.as}['parseValue']>`,
        output: `ReturnType<typeof ${imp.as}['serialize']>`,
      },
    }),
    {}
  );

  return {
    imports: importStatements,
    scalarsConfig,
  };
}
