# Source code of vscodium.com

This repository contains the source code of the [www.vscodium.com website](https://www.vscodium.com).


## Build process

The website uses [Jekyll](https://jekyllrb.com/), a static website engine that compiles
the jekyll template into a static html website.

## How to download and test the website in localhost


### Clone the repo
```
git clone https://github.com/VSCodium/vscodium.github.io

cd vscodium.github.io
```

### Install jekyll and launch the development server

Install jekyll from the [official website](https://jekyllrb.com/)

Or use the package manager of your GNU/Linux distribution (i.e. `sudo apt install jekyll`)

and run the following command inside the site source to start a temporary server

```
jekyll serve
```

then open a browser and go to

[http://localhost:4000](http://localhost:4000)


### Build and deploy the static code

Run the following command inside the jekyll source

```
jekyll build
```

and move the content of the **_site** folder in your webserver root to deploy the website
