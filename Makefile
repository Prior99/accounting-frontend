default:
	yarn run build

all: default lint

lint:
	yarn run lint:src
	yarn run lint:style

run:
	yarn start
