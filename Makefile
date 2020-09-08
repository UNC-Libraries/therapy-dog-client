help:
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-20s\033[0m %s\n", $$1, $$2}'

run-client: ## Run the client in development mode
	cd client && npm start

deps: ## Install dependencies for the client and API server
	cd client && npm install

check: ## Run code style checks, linting, and unit tests.
	cd client && jshint app && npx eslint .

test: ## Run tests
	cd client && ember test