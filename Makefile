SHELL:=/bin/bash

default: debug

all: default lint test

.PHONY: debug
debug: node_modules
	yarn run build

.PHONY: node_modules
node_modules:
	yarn install

.PHONY: lint
lint:
	yarn run lint:src
	yarn run lint:style

.PHONY: run
run: node_modules
	yarn start

.PHONY: test
test:
	yarn test

.PHONY: release
release: node_modules
	yarn run build:release

.PHONY: package
package: clean release
	rm -Rf node_modules
	yarn install --production
	tar cfz `git describe`.tar.gz dist/ index.html config.js node_modules

.PHONY: clean
clean:
	rm -Rf dist/
	rm -Rf node_modules
