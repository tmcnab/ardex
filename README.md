### Overview

ardex is an article curation app that I've built to learn node. Basically users (anonymous for now) insert articles and elasticsearch indexes them and everything is displayed nice and pretty using default/cdn'd bootstrap 3.

There's still a bunch of stuff to implement, so caveat emptor.


### Setup

Ardex requires mongodb and elasticsearch to operate.

* `git clone https://github.com/tmcnab/ardex`
* `cd ardex`
* `npm install`
* `node app`


### Screens

![Splash Screen](https://raw.github.com/tmcnab/ardex/master/docs/images/Splash.png)

![Search Results](https://raw.github.com/tmcnab/ardex/master/docs/images/Results.png)

![Article Details](https://raw.github.com/tmcnab/ardex/master/docs/images/Details.png)

![Article Editor](https://raw.github.com/tmcnab/ardex/master/docs/images/Editor.png)



### Notes

This stuff is just for my own benefit.

 * `elasticsearch -f -D es.config=/usr/local/opt/elasticsearch/config/elasticsearch.yml`
