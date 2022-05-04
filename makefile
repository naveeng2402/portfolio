deploy:
	rm -r public && gulp build && git checkout gh-pages && cp -r public/* . && git add . && git commit  && git push && git checkout master