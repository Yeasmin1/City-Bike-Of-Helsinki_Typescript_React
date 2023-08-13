import { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
    schema: [
        {
          "`${process.env.REACT_APP_DIGITRANSIT_GRAPHQL_URI}`": {
            headers: {
                "digitransit-subscription-key" :`${process.env.REACT_APP_DIGITRANSIT_KEY}`,
            },
          },
        },
      ],
  documents: ['src/**/*.tsx'],
  generates: {
    './src/__generated__/': {
      preset: 'client',
      plugins: [],
      presetConfig: {
        gqlTagName: 'gql',
      }
    }
  },
  ignoreNoDocuments: true,
};

export default config;