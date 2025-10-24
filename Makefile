CI_IMAGE ?= msai-cn-beijing.cr.volces.com/agent/kimi-coding-docs
ENV ?=

.PHONY: help
help: ## 显示帮助信息
	@echo "make [target]"
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "  %-20s %s\n", $$1, $$2}'

define get_version
$(shell git rev-parse --short HEAD)
endef

.PHONY: version
version: ## 准备下一个版本号
	$(eval CURRENT_VERSION = $(call get_version))
	$(eval VERSION ?= $(shell if [ -z "$(VERSION)" ]; then read -p "Enter version [$(CURRENT_VERSION)]: " VERSION; echo $${VERSION:-$(CURRENT_VERSION)}; fi))
	@echo "Using version: $(VERSION)"

.PHONY: build
build: version
	docker build -t $(CI_IMAGE):$(VERSION) -f Dockerfile .
	docker push $(CI_IMAGE):$(VERSION)

.PHONY: cleanup
cleanup: version
	docker rmi $(CI_IMAGE):$(VERSION)

.PHONY: prepare
prepare:
	@if [ -n "$$(git status --porcelain)" ]; then \
		echo "Error: Working directory is not clean. Please commit or stash your changes first."; \
		exit 1; \
	fi
	npm run build
	AWS_CONFIG_FILE=./awsconfig megfile sync ./.vitepress/dist "s3://prod-chat-kimi/coding/docs" --verbose

.PHONY: update-k8s
update-k8s: version
	@if [ "$$(uname)" = "Darwin" ]; then \
		if [ -n "$(ENV)" ]; then \
			targets="k8s/$(ENV)/deployment.yaml"; \
		else \
			targets=$$(ls -1d k8s/*/deployment.yaml 2>/dev/null || true); \
		fi; \
		for f in $$targets; do \
			sed -i '' "s|- image: $(CI_IMAGE):.*|- image: $(CI_IMAGE):$(VERSION)|" "$$f"; \
			git add "$$f"; \
		done; \
	else \
		if [ -n "$(ENV)" ]; then \
			targets="k8s/$(ENV)/deployment.yaml"; \
		else \
			targets=$$(ls -1d k8s/*/deployment.yaml 2>/dev/null || true); \
		fi; \
		for f in $$targets; do \
			sed -i "s|- image: $(CI_IMAGE):.*|- image: $(CI_IMAGE):$(VERSION)|" "$$f"; \
			git add "$$f"; \
		done; \
	fi

.PHONY: commit
commit: version
	@git commit -m "chore: bump deployment to $(VERSION)"
	@if [ "$(VERSION)" != "$(call get_version)" ]; then \
		git tag $(VERSION); \
	fi
	@git push && git push --tags
	@echo "Pushed version $(VERSION) to remote!"

.PHONY: deploy
deploy: prepare build update-k8s commit cleanup ## 发布新版本，可以通过 VERSION 直接指定版本号
	@echo "Deployment $(VERSION) has committed!"
