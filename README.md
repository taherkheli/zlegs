# Zlegs #

## Health Status ##

![Build](https://github.com/taherkheli/zlegs/actions/workflows/run.yml/badge.svg)

## What is this repository for? ##

To show how [some simple manual test cases](https://github.com/taherkheli/zlegs/blob/main/docs/manual-test-cases.txt) for a small [demo web app](https://www.saucedemo.com/v1/index.html) can be converted into automated UI tests (end to end). The focus here is not on professional test design or specification but on exploring what capabilities Playwright provides for developing automated tests that are fully compatible with a cloud based CI provider.

### Tech Stack ###

The main tools/technologies used were

* [Playwright](https://playwright.dev/)
* [Typescript](https://www.typescriptlang.org/)
* [Github](https://github.com/)
* [Azure](https://azure.microsoft.com)

### System requirements ###

As listed [here](https://playwright.dev/docs/intro#system-requirements)

### Playwright Installation ###

There are multiple ways to set up Playwright locally. One way to go about it is listed [here](https://playwright.dev/docs/intro#introduction)

### Browser Installation ###

If manual installation of browsers is desired then relevant info is [here](https://playwright.dev/docs/browsers#introduction)

### Set up and Run Tests Locally ###

*_Ensure that you have Playwright and needed browsers already installed from steps above_*

In your shell of choice, run the following commands

```bash
$ git clone git@github.com:taherkheli/zlegs.git
$ cd zlegs
$ npm i
$ npm test
# if you want to run test with a UI
$ npm run headed
# if you want to run just the login suite
$ npm run test-login
# if you want to see test report locally
$ npx playwright show-report test-reports
```

### CI Setup ###

A GitHub action is defined [here](https://github.com/taherkheli/zlegs/blob/main/.github/workflows/run.yml) which ensures that whenever a PR is created or a PR is pushed to the main branch, all tests are run.

Additionally, it is possible to manually trigger such a run from GitHub UI. Before each manual trigger one can choose which test suite to run via a dropdown. Not explcitily choosing a test suite would imply running all tests.

### Publishing Test Report ###

After each run of the Git Hub action, a test report with details of the test execution is pubished to a publicly accessible URL through an Azure based set-up. Since each run creates a unique report, a URL to the corresponding test report is dynamically generated and can be accessed in the output log.

An example of such a dynmic URL is [here](https://freestoragetaherkheli.z6.web.core.windows.net/run-11910588985-1/index.html)
