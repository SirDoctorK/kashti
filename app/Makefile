SHELL ?= /bin/bash

.DEFAULT_GOAL := build

################################################################################
# Version details                                                              #
################################################################################

# This will reliably return the short SHA1 of HEAD or, if the working directory
# is dirty, will return that + "-dirty"
GIT_VERSION = $(shell git describe --always --abbrev=7 --dirty --match=NeVeRmAtCh)

################################################################################
# Containerized development environment-- or lack thereof                      #
################################################################################

ifneq ($(SKIP_DOCKER),true)
	PROJECT_ROOT := $(dir $(realpath $(firstword $(MAKEFILE_LIST))))

	KANIKO_IMAGE := brigadecore/kaniko:v0.2.0

	KANIKO_DOCKER_CMD := docker run \
		-it \
		--rm \
		-e SKIP_DOCKER=true \
		-e DOCKER_PASSWORD=$${DOCKER_PASSWORD} \
		-v $(PROJECT_ROOT):/workspaces/kashti \
		-w /workspaces/kashti \
		$(KANIKO_IMAGE)
endif

################################################################################
# Docker images we build and publish                                           #
################################################################################

ifdef DOCKER_REGISTRY
	DOCKER_REGISTRY := $(DOCKER_REGISTRY)/
endif

ifdef DOCKER_ORG
	DOCKER_ORG := $(DOCKER_ORG)/
endif

DOCKER_IMAGE_NAME := $(DOCKER_REGISTRY)$(DOCKER_ORG)kashti

ifdef VERSION
	MUTABLE_DOCKER_TAG := latest
else
	VERSION            := $(GIT_VERSION)
	MUTABLE_DOCKER_TAG := edge
endif

IMMUTABLE_DOCKER_TAG := $(VERSION)

################################################################################
# Build                                                                        #
################################################################################

.PHONY: build
build:
	$(KANIKO_DOCKER_CMD) kaniko \
		--context dir:///workspaces/kashti/ \
		--no-push

################################################################################
# Publish                                                                      #
################################################################################

.PHONY: publish
publish:
	$(KANIKO_DOCKER_CMD) sh -c ' \
		docker login $(DOCKER_REGISTRY) -u $(DOCKER_USERNAME) -p $${DOCKER_PASSWORD} && \
		kaniko \
			--dockerfile /workspaces/kashti/Dockerfile \
			--context dir:///workspaces/kashti/ \
			--destination $(DOCKER_IMAGE_NAME)$*:$(IMMUTABLE_DOCKER_TAG) \
			--destination $(DOCKER_IMAGE_NAME)$*:$(MUTABLE_DOCKER_TAG) \
	'

################################################################################
# Targets to facilitate hacking on Kashti.                                     #
################################################################################

.PHONY: hack-build
hack-build:
	docker build \
		-t $(DOCKER_IMAGE_NAME)$*:$(IMMUTABLE_DOCKER_TAG) \
		.

hack-run: hack-build
	docker run \
		-it \
		-v $(PROJECT_ROOT)/hack/api-reverse-proxy.nginx.conf:/etc/nginx/kashti.conf.d/api-reverse-proxy.conf \
		-p 8080:80 \
		$(DOCKER_IMAGE_NAME)$*:$(IMMUTABLE_DOCKER_TAG)

.PHONY: hack-push
hack-push: hack-build
	docker push $(DOCKER_IMAGE_NAME)$*:$(IMMUTABLE_DOCKER_TAG)
