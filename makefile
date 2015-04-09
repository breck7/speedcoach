install:
	cd ..; sudo npm uninstall speedcoach; sudo npm uninstall -g speedcoach; sudo npm install -g speedcoach/; sudo npm install speedcoach; cd speedcoach

publish:
	npm publish

test:
	node test.js

testcli:
	speedcoach fs

.PHONY: install