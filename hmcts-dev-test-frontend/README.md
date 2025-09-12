# HMCTS Dev Test Backend

## Name

hmcts-task-api

## Description

The Task Management Service provides a simple, reliable and powerful way to

````md
To create a new task
To view existing tasks
To update existing task
To delete existing task
``
This UI is WAC2.2 standard compliant

## External Dependencies

You need to have mongoDB running in local or in cluster

## Install node dependencies

```md
npm install
```
````

## Running

```md
npm run start
```

## Test

```md
npm run test
```

The above runs the unit tests

```md
npm run test:coverage
```

The above runs the unit tests and produces a coverage report

## Pipeline

For each commit push to GitLab/GitHub the pipleline will be triggered automatically.

_CI-CD pipeline details_

## Check coding standards using eslint

```md
npm run lint
```

To fix eslint issues

```md
npm run lint:fix
```

## Notes

_Commitlint job_

Before committing any work ensure you are following right standards.

## Must implement before production

```md
Implement JWT token verification request authenction
Implement Scope check for requeest authorisation
Implement Data input sanitisation
Implement logger module and remove console logs
Implement Security HTTP headers
Implement Huskey/Pre-commit hook on git check In/Out
Implement CI/CD
Improve unit test coverage
Implement Dockerfile for kubernetes
Check and address sonar qube issues if any
```
