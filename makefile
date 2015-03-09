install:
	cd ..; sudo npm install -g speedcoach/; sudo npm install speedcoach	

publish:
	npm publish

test:
	node test.js

testcli:
	speedcoach fs

.PHONY: install