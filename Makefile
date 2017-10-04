SHELL:=/bin/bash

default: debug

all: default lint test

.PHONY: debug
debug: node_modules locales generated
	yarn run build

.PHONY: node_modules
node_modules:
	yarn install

.PHONY: lint
lint:
	yarn run lint:src
	yarn run lint:style

.PHONY: run
run: node_modules locales generated
	yarn start

.PHONY: test
test: generated
	yarn test

.PHONY: release
release: node_modules locales generated
	yarn run build:release

.PHONY: package
package: clean release
	rm -Rf node_modules
	yarn install --production
	tar cfz `git describe`.tar.gz dist/ index.html config.js node_modules locales

.PHONY: clean
clean:
	rm -Rf dist/
	rm -Rf node_modules/
	rm -Rf generated/

.PHONY: locales
locales:
	yarn run build-locales

swagger-codegen-cli.jar:
	wget http://central.maven.org/maven2/io/swagger/swagger-codegen-cli/2.2.3/swagger-codegen-cli-2.2.3.jar -O swagger-codegen-cli.jar

.PHONY: generated
generated: swagger-codegen-cli.jar
	java -jar swagger-codegen-cli.jar generate -i https://api.accounting.92k.de/swagger -l typescript-fetch -o generated/api/
