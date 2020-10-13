module.exports = {
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': 'ts-jest'
  },
  moduleFileExtensions: ['ts', 'js'],
  coveragePathIgnorePatterns: ['*.js', 'index.d.ts'],
  verbose: true,
  preset: 'ts-jest',
  testEnvironment: 'node',
  testPathIgnorePatterns: ['node_modules', 'lib', 'dist', 'es'],
  projects: ['<rootDir>/src']
};
