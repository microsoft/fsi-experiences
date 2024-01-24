# FSI Core Components library

## Library features

1. React components and widgets.
2. UI models, interfaces and utils
3. FSI contexts detentions

## Installing

```sh
pnpm i
```

## Building

```sh
pnpm build

// build watch
pnpm start
```

## Testing

```sh
// run all tests
pnpm test

// run a specific test
pnpm test -- -t PARTIAL_TEST_DESC

// run all tests with coverage
pnpm run test-coverage

// clean tests caching
pnpm run test-clean
```

## Debug tests using VSCode

add the following configuration to launch.json and click run (F5)

```json
{
    "version": "0.2.0",
    "configurations": [
        {
            "name": "Debug Frontend Jest Tests",
            "cwd": "${workspaceFolder}/frontend/core-components",
            "type": "node",
            "request": "launch",
            "runtimeArgs": [
                "--inspect-brk",
                "${workspaceFolder}/frontend/core-components/node_modules/jest/bin/jest.js",
                "${fileBasename}",
                "--runInBand"
            ],
            "console": "integratedTerminal",
            "internalConsoleOptions": "neverOpen",
            "port": 9229
        }
    ]
}
```
