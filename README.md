# update-dotenv

> A NodeJS module to write updates to a .env file

## Installation

```
yarn add dotenv @can-courier/update-dotenv
```

## Usage

```js
const updateDotenv = require('@can-courier/update-dotenv')

updateDotenv({
  MY_VARIABLE: 'new value'
}, <optional_environment_name>).then((newEnv) => console.log('Done!', newEnv))
```

## License

[ISC](LICENSE)
