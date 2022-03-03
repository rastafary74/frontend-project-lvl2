install: # install dependencies
		npm ci

lint: #linting
		npx eslint .

test:
		NODE_OPTIONS=--experimental-vm-modules npx jest

cover:
		NODE_OPTIONS=--experimental-vm-modules npx jest --coverage

debug:
		node --inspect-brk bin/gendiff.js __tests__/__fixtures__/file1.yml __tests__/__fixtures__/file2.yml
