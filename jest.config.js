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
                outputName: 'sonar-report.xml',
                reportedMetrics: ['test_errors', 'test_execution_time', 'test_failures', 'tests', 'coverage'],
            }
        ]
    ],
    coverageReporters: ['text', 'lcov', 'clover'],
    
};