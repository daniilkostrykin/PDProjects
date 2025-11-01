module.exports = {
  testEnvironment: 'jest-environment-jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.cjs'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '\\.css$': 'identity-obj-proxy',
    '\\.(gif|ttf|eot|svg|png)$': '<rootDir>/__mocks__/fileMock.js',
  },
  transform: {
    '^.+\\.(js|jsx)$': 'babel-jest',
    '\\.(css|less|scss|sass)$': 'jest-transform-stub',
    '\\.(gif|ttf|eot|svg|png)$': 'jest-transform-stub',
  },
  transformIgnorePatterns: [
    '/node_modules/(?!axios)/', // Трансформировать axios, если он использует ES-модули
  ],
  testPathIgnorePatterns: ['/node_modules/', '/.vite/'],
  globals: {
    'import.meta': {
      env: {
        VITE_API_URL: 'http://localhost:8080',
      },
    },
  },
};