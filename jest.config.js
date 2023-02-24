/* eslint-disable @typescript-eslint/no-var-requires */
const { pathsToModuleNameMapper } = require('ts-jest');
const { compilerOptions } = require('./tsconfig');

module.exports = {
  moduleFileExtensions: ['js', 'json', 'ts'],
  roots: ['<rootDir>/test', '<rootDir>/src'],
  testRegex: '.*\\.spec\\.ts$',
  testPathIgnorePatterns: ['<rootDir>/src'],
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  testEnvironment: 'node',
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, { prefix: '<rootDir>/src' }),
  collectCoverageFrom: ['<rootDir>/src/**/*.(t|j)s', '!<rootDir>/src/*.(t|j)s'],
  coverageDirectory: './coverage',
  coveragePathIgnorePatterns: ['enums/', 'dtos/', 'interfaces/', 'di/', '-module.ts', 'index.ts'],
};
