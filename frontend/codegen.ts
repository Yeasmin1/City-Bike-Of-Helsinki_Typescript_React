import { CodegenConfig } from '@graphql-codegen/cli';
import { loadEnv } from 'vite';

const env = loadEnv('', process.cwd(), 'VITE_');

const config: CodegenConfig = {
    schema: [
        {
          [env.VITE_APP_DIGITRANSIT_GRAPHQL_URI]: {
            headers: {
                "digitransit-subscription-key": env.VITE_DIGITRANSIT_KEY,
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