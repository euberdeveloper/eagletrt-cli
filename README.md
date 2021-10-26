# eagle-cli
The command line interface of @eagletrt

## Project purpose

This is the cli of the telemetry of **eagletrt**. It consists in a **global npm module** that **merges various cli tools** of the telemetry.

The cli tools that are merged are:
* https://github.com/eagletrt/telemetria-postprocessing
* https://github.com/eagletrt/code-generator
* https://github.com/eagletrt/telemetria-simulator

As all the other tools, the cli is made with **yargs** and bundled with **webpack**.

## How to use it

First install it with:

```bash
$ npm install -g @eagletrt/cli
```

And then to see all the commands:

```bash
$ eagle --help
```

The commands are exactly the same of the ones of the merged tools.

## How to update it

If one of the tools (dependency npm modules) is updated and published, you should:
* use `npm update` and check in the `package.json` that it is updated to the right version
* update the `version` in `package.json`
* use `npm publish` to publish the package
* note that if a new command was added, also the code of this repo should change to handle that command
