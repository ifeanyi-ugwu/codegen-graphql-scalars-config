# GraphQL Scalars Configuration

This utility ensures that custom GraphQL scalar types are correctly inferred by the GraphQL code generator. It helps you set up and import scalars while defining their input/output mappings.

## Installation

After setting up graphql codegen, install this package:

```bash
npm install codegen-graphql-scalars-config
```

## Usage

Use `createScalarConfiguration` to define scalar types and their imports. The `from` field is optional; by default, it pulls from `graphql-scalars`.

Use the output from `createScalarConfiguration` in your GraphQL Codegen configuration to automatically import scalar types and define their mappings.

```ts
import { CodegenConfig } from "@graphql-codegen/cli";
import { extractScalarTypeDefs } from "graphql-scalars-type-defs-extractor";
import { createScalarConfiguration } from "codegen-graphql-scalars-config";

const scalarTypesPath = extractScalarTypeDefs({
  output: "scalar-types.generated.graphql",
  scalars: ["Byte", "CountryName", "Date"],
});

const scalarSetup = createScalarConfiguration([
  { name: "Byte", as: "GraphQLByte" },
  { name: "CountryName", as: "GraphQLCountryName" },
  { name: "Date", as: "GraphQLDate" },
  { name: "Foo", as: "GraphQLFoo", from: "./custom-scalars" }, // Custom import NB: this path should be relative to the generated types path(i.e. "src/types/resolvers-types.generated.ts")
]);

const config: CodegenConfig = {
  overwrite: true,
  schema: ["./src/**/*.ts", scalarTypesPath],
  generates: {
    "src/types/resolvers-types.generated.ts": {
      config: {
        scalars: {
          ID: { input: "string", output: "string | number" },
          ...scalarSetup.scalarsConfig,
        },
      },
      plugins: [
        { add: { content: scalarSetup.imports.join("\n") } },
        "typescript",
        "typescript-resolvers",
      ],
    },
  },
};

export default config;
```

Once you’ve set up your configuration, run the code generator and your correctly typed scalars will be included in the generated types:

```bash
npx graphql-codegen
```

## API Reference

### `createScalarConfiguration`

```ts
function createScalarConfiguration(
  imports: ScalarImport[]
): ScalarConfigurationResult;
```

- **Parameters**:
  - `imports`: An array of objects defining the custom scalar types.
    - `name`: The name of the scalar (e.g., `"Byte"`).
    - `from` (optional): The package where the scalar is imported from (defaults to `"graphql-scalars"`).
    - `as`: The alias to import the scalar as (e.g., `"GraphQLByte"`).
- **Returns**:
  - `imports`: An array of import statements for the scalars.
  - `scalarsConfig`: A mapping of scalar names to their respective input/output type definitions.

## License

This project is licensed under the MIT License.
