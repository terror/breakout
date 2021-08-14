default:
	just --list

dev:
	yarn start

install:
	yarn install

fmt:
	prettier --write .
