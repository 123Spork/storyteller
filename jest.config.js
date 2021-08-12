module.exports = {
  roots: ['src'],
  collectCoverageFrom: ['src/**/*.{js,jsx,ts,tsx,mjs}'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  preset: 'ts-jest',
  testRegex: ['^.*(test|spec).*(.js|.jsx|.ts|.tsx|.json|.node)?$'],
  testEnvironment: 'node',
  modulePathIgnorePatterns: ['__helpers__', '.snap']
}
