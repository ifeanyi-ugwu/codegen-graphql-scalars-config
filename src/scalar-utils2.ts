/*import type { GraphQLScalarType } from "graphql";

type ScalarImport = {
  name: string;
  from?: string;
  as: string;
  //scalarType: GraphQLScalarType;
};

interface ScalarConfigurationResult {s
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
  // Generate import statements for the scalars
  const importStatements = imports.map((imp) => {
    const fromSource = imp.from || "graphql-scalars";
    return `import { ${imp.as} } from '${fromSource}';`;
  });

  // Add the utility import
  importStatements.push(
    `import { InferScalarTypes } from '../../scalar-utils2';`
  );

  // Create scalars configuration using the actual types from GraphQLScalarType
  const scalarsConfig = imports.reduce((acc, imp) => {
    return {
      ...acc,
      [imp.name]: {
        input: `InferScalarTypes<typeof ${imp.as}>["input"]`,
        output: `InferScalarTypes<typeof ${imp.as}>["output"]`,
      },
    };
  }, {});

  return {
    imports: importStatements,
    scalarsConfig,
  };
}

// Helper type to extract the internal and external types from a GraphQLScalarType
export type InferScalarTypes<T> = T extends GraphQLScalarType<
  infer Internal,
  infer External
>
  ? { input: Internal; output: External }
  : never;
*/
