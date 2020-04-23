const path = require('path')

// Load .env files
const { loadEnv } = require('vue-cli-plugin-apollo/utils/load-env')
const env = loadEnv([
  path.resolve(__dirname, '.env'),
  path.resolve(__dirname, '.env.local')
])

module.exports = {
  client: {
    service: env.VUE_APP_APOLLO_ENGINE_SERVICE,
    includes: ['src/**/*.{js,jsx,ts,tsx,vue,gql}']
  },
  service: {
    // name: env.VUE_APP_APOLLO_ENGINE_SERVICE,
    localSchemaFile: path.resolve(__dirname, './schema.json'),
    endpoint: {
      url: 'http://localhost:4000/graphql', // defaults to http://localhost:4000
      headers: {
        // optional
        // authorization: 'Bearer lkjfalkfjadkfjeopknavadf'
      },
      skipSSLValidation: true // optional, disables SSL validation check
    }
  },
  engine: {
    endpoint: process.env.APOLLO_ENGINE_API_ENDPOINT,
    apiKey: env.VUE_APP_APOLLO_ENGINE_KEY
  }
}
