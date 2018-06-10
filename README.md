# React Depot

This application is a repository of information about a curated set of libraries to use with React. It is heavily inspired by [The Ruby Toolbox](https://www.ruby-toolbox.com/).

## Features

* [ ] Libraries should be in categories.
* [ ] Each category should have a list of libraries.
* [ ] Each library should have a name, description, and NPM link.
* [ ] Each library can have a GitHub link and a homepage link.
* [ ] Users can see NPM stats about a library -- number of downloads, version number, when released, number of libraries that depend on it, number of libraries it depends on.
* [ ] Users can see GitHub stats about a library -- number of stars, forks, commits, most recent commit, earliest commit.
* [ ] Users can sort libraries by most recent, most downloaded, most commits.
* [ ] Each library has a combined score calculated from the above stats. Not sure how to calculate yet.
* [ ] Users can create an account and log in.
* [ ] Logged in users can add new libraries.
* [ ] Logged in users can save their favorite libraries to a list.
* [ ] Logged in users can get an `npm` or `yarn` command to install all their favorite libraries.

## Standards

* Components should be separated into presentational components and container components.
* Presentational components should not make any Ajax calls.
* [standardjs](https://standardjs.com/) is used for all code.
* Presentational components should be designed using [Storybook](https://storybook.js.org/).
* Jest is used for testing and most things should be tested.
