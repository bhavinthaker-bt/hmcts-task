module.exports = {
  roots: ['<rootDir>/src/test/routes'],
  testRegex: '(/src/test/.*|\\.(test|spec))\\.(ts|js)$',
  moduleFileExtensions: ['ts', 'js', 'json'],
  testEnvironment: 'node',
  preset: 'ts-jest',
  transform: {
    '^.+\\.ts?$': 'ts-jest',
  },
  coveragePathIgnorePatterns: [
    '<rootDir>/src/main/development.ts',
    '<rootDir>/src/main/app.ts',
    '<rootDir>/src/main/routes/updatetask.ts',
  ],
};
