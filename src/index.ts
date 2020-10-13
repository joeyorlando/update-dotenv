import * as dotenv from 'dotenv';
import * as fs from 'fs';
import path from 'path';
import { promisify } from 'util';

const escapeNewlines = (str: string) => {
  return str.replace(/\n/g, '\\n');
};

const format = (key: string, value: string) => {
  return `${key}=${escapeNewlines(value)}`;
};

export interface EnvironmentConfig {
  [key: string]: any;
}

export type Env = 'development' | 'staging' | 'production' | 'local';

const updateDotenv = async (config: EnvironmentConfig, env?: Env) => {
  const filename = env ? `.env.${env}` : '.env';
  const filepath = path.join(process.cwd(), filename);

  // Merge with existing values
  try {
    const existing = dotenv.parse(
      await promisify(fs.readFile)(filepath, 'utf-8')
    );
    config = Object.assign(existing, config);
  } catch (err) {
    if (err.code !== 'ENOENT') {
      throw err;
    }
  }

  const contents = Object.keys(config)
    .map((key) => format(key, config[key]))
    .join('\n');
  await promisify(fs.writeFile)(filepath, contents);

  // Update current env with new values
  Object.assign(process.env, config);

  return config;
};

export default updateDotenv;
