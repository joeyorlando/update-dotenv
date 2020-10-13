# update-dotenv

> A NodeJS module to write updates to a .env file

## Installation

```
yarn add dotenv @growflow/update-dotenv
```

## Usage

```js
const updateDotenv = require('@growflow/update-dotenv')

updateDotenv({
  MY_VARIABLE: 'new value'
}, <optional_environment_name>).then((newEnv) => console.log('Done!', newEnv))
```

## License

[ISC](LICENSE)
