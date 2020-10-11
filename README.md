# setup-g3ops

[![build](https://github.com/jbrunton/setup-g3ops/workflows/build/badge.svg?branch=develop)](https://github.com/jbrunton/setup-g3ops/actions?query=branch%3Adevelop+workflow%3Abuild)
[![release](https://github.com/jbrunton/setup-g3ops/workflows/release/badge.svg)](https://github.com/jbrunton/setup-g3ops/actions?query=workflow%3Arelease)

A Github Action to install [G3Ops](https://github.com/jbrunton/g3ops).

## Usage

```yaml
steps:
- uses: jbrunton/setup-g3ops@v1
- run: g3ops check
```

`setup-g3ops` uses the GitHub API to find information about latest releases. To avoid [rate limits](https://developer.github.com/v3/#rate-limiting) it is recommended you pass a [token](https://help.github.com/en/actions/configuring-and-managing-workflows/authenticating-with-the-github_token):

```yaml
steps:
- uses: jbrunton/setup-g3ops@v1
  with:
    token: ${{ secrets.GITHUB_TOKEN }}
- run: g3ops check
```

To use a specific version:

```yaml
steps:
- uses: jbrunton/setup-g3ops@v1
  with:
    version: 0.1.0
    token: ${{ secrets.GITHUB_TOKEN }}
```
