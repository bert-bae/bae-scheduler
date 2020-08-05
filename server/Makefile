ifndef API_KEY
API_KEY=defaultapikeystring12345
endif
ifndef ORIGIN_URL
ORIGIN_URL="http://localhost:3001"
endif

BUILD_PATH=build

.PHONY: deploy build

.$(BUILD_PATH):
	npm run compile
	cp -r samconfig.toml ./$(BUILD_PATH)
	cp -r package.json ./$(BUILD_PATH)
	cp -rf template.yaml ./$(BUILD_PATH)

build: .$(BUILD_PATH)
	cd $(BUILD_PATH) && sam build

deploy: build
	cd $(BUILD_PATH) && sam deploy --stack-name $(STACK_NAME) --s3-bucket $(S3_BUCKET) --s3-prefix server --parameter-overrides \
		ApiKey=$(API_KEY) \
		NodeEnvironment=prod