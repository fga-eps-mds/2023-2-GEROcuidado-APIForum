/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    reporters: [
        'default',
        [
            'jest-sonar',
            {
                outputDirectory: 'reports',
                outputName: 'sonar-report.xml'
            }
        ]
    ]
};