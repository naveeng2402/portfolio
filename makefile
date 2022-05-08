deploy:
	rm -r public && gulp build && git checkout gh-pages && cp -r public/* . && git add . && git commit  && git push && git checkout master
components:
	mkdir src/components/$(comp)/ && \
	touch src/components/$(comp)/_$(comp).pug && \
	touch src/components/$(comp)/_$(comp).scss && \
	echo "@forward \"$(comp)/$(comp)\";" >> src/components/_index.scss
sections:
	mkdir src/sections/$(sec)/ && \
	touch src/sections/$(sec)/_$(sec).pug && \
	echo "@use '../../scss/abstracts' as *;" > src/sections/$(sec)/_$(sec).scss && \
	echo "@forward \"$(sec)/$(sec)\";" >> src/sections/_index.scss