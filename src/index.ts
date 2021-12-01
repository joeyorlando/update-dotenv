import * as dotenv from 'dotenv';
import { readFile, writeFile } from 'fs/promises';
import path from 'path';

const escape = (str: string) => {
  let result = str.replace(/\n/g, '\\n');

  if (result.includes(' ') || result.includes('\t')) {
    result = `"${result.replace(/"/g, '\\"')}"`;
  }

  return result;
};

const format = (key: string, value: string) => {
  return `${key}=${escape(value)}`;
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
    const existing = dotenv.parse(await readFile(filepath, 'utf-8'));
    config = Object.assign(existing, config);
  } catch (err) {
    if (err.code !== 'ENOENT') {
      throw err;
    }
  }

  const contents = Object.keys(config)
    .map((key) => format(key, config[key]))
    .join('\n');
  await writeFile(filepath, contents);

  // Update current env with new values
  Object.assign(process.env, config);

  return config;
};

export default updateDotenv;
