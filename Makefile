install: # install dependencies
		npm ci

lint: #linting
		npx eslint .

test:
		NODE_OPTIONS=--experimental-vm-modules npx jest

cover:
		NODE_OPTIONS=--experimental-vm-modules npx jest --coverage
