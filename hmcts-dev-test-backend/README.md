# HMCTS Dev Test Backend

## Name

hmcts-task-api

## Description

The Task Management API Service provides a simple and reliable way to manage tasks programmatically. It supports creating, updating, deleting, and viewing tasks, making task tracking easy according and set priority according to due dates.

## External Dependencies

You need to have mongoDB running in local or in cluster

## Install node dependencies

```md
npm install
```

## Running

```md
npm start
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
Implment sceret manager for mongoDB credentials
Implement JWT token verification request authenction
Implement Scope check for requeest authorisation
Implement logger module and remove console logs
Implement Rate limit
Implement Data input sanitisation
Implement Security HTTP headers
Implement Huskey/Pre-commit hook on git check In/Out
Implement CI/CD
Implement Dockerfile for kubernetes
Implement document versioning logic
```
