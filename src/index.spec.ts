import * as fs from 'fs';
import * as os from 'os';
import path from 'path';

import updateDotenv from '.';

const originalCwd = process.cwd();
// Make a copy of current env
const originalEnv = { ...process.env };

describe('update-dotenv', () => {
  beforeEach(async () => {
    process.chdir(fs.mkdtempSync(path.join(os.tmpdir(), 'update-dotenv')));
  });

  afterEach(() => {
    process.env = originalEnv;
    process.chdir(originalCwd);
  });

  describe('no environment was passed', () => {
    it('creates .env, writes new values, sets process.env', async () => {
      await updateDotenv({ FOO: 'bar' });
      expect(fs.readFileSync('.env', 'utf-8')).toEqual('FOO=bar');
      expect(process.env.FOO).toEqual('bar');
    });

    it('properly writes multi-line strings', async () => {
      await updateDotenv({ FOO: 'bar\nbaz' });
      expect(fs.readFileSync('.env', 'utf-8')).toEqual('FOO=bar\\nbaz');
    });

    it('appends new variables to existing variables', async () => {
      await updateDotenv({ FIRST: 'foo' });
      await updateDotenv({ SECOND: 'bar' });
      expect(fs.readFileSync('.env', 'utf-8')).toEqual('FIRST=foo\nSECOND=bar');
    });
  });

  describe('environment was passed', () => {
    it('creates .env, writes new values, sets process.env', async () => {
      await updateDotenv({ FOO: 'bar' }, 'development');
      expect(fs.readFileSync('.env.development', 'utf-8')).toEqual('FOO=bar');
      expect(process.env.FOO).toEqual('bar');
    });
  });
});
