publish:
	npm publish

publish-sync: publish
	cnpm sync module-decompose-loader
	tnpm sync module-decompose-loader