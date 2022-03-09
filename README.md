### Hexlet tests and linter status:
[![Actions Status](https://github.com/rastafary74/frontend-project-lvl2/workflows/hexlet-check/badge.svg)](https://github.com/rastafary74/frontend-project-lvl2/actions)

### Codeclimate.com quality
[![Maintainability](https://api.codeclimate.com/v1/badges/67b2bdfb4ccc942682ba/maintainability)](https://codeclimate.com/github/rastafary74/frontend-project-lvl2/maintainability)

[![Test Coverage](https://api.codeclimate.com/v1/badges/67b2bdfb4ccc942682ba/test_coverage)](https://codeclimate.com/github/rastafary74/frontend-project-lvl2/test_coverage)

### Eslint + Jest
[![Eslint + Jest](https://github.com/rastafary74/frontend-project-lvl2/workflows/eslint_jest/badge.svg)](https://github.com/rastafary74/frontend-project-lvl2/actions)

# Difference two file calculator

A console utility for finding the difference between two files. Support format JSON and YAML

### Copying a project
```sh
git clone https://github.com/rastafary74/frontend-project-lvl2.git
```

### Installation
```sh
npm ci
```

### Launch
```sh
// Get help
node bin/gendiff.js -h

// Finding the difference between two files, default output format
node bin/gendiff.js pathToFile1.json pathToFile2.json

// Finding the difference between two files, plain output format
node bin/gendiff.js -f plain pathToFile1.json pathToFile2.json

// Finding the difference between two files, json output format
node bin/gendiff.js -f json pathToFile1.json pathToFile2.json
```

### Preview: Finding the difference between two files, default output format
[![asciicast](https://asciinema.org/a/6iE0yum2kWfc1VE3OfMygARJG.svg)](https://asciinema.org/a/6iE0yum2kWfc1VE3OfMygARJG)

### Preview: Finding the difference between two files, plain output format
[![asciicast](https://asciinema.org/a/4IkzyFBQhG38iPfyw3PGdxkwP.svg)](https://asciinema.org/a/4IkzyFBQhG38iPfyw3PGdxkwP)

### Preview: Finding the difference between two files, json output format
[![asciicast](https://asciinema.org/a/UGfon4RcHRZfLxVVKtbnMn0Jp.svg)](https://asciinema.org/a/UGfon4RcHRZfLxVVKtbnMn0Jp)
