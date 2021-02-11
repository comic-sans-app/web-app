#!/usr/bin/env bash

# if this file fails to execute, make sure to run the following command
# chmod +x deploy.sh

# exit if anything fails
set -e

# cleaning up after deploy
function cleanup_on_exit {

  echo "🧹 cleaning up after deploy 🧹"
  git checkout main

  # remove the deploy branch
  git branch -D deploy
}
trap cleanup_on_exit EXIT

# pulling code from remote main
echo "pulling code from remote main"
git checkout main
git pull

# creating deploy branch
echo "creating deploy branch"
git checkout -b deploy

# creating commit, even if nothing changed
echo "committing to main"
git commit --allow-empty -m '🚀 deploying to heroku 🚀'

# push your local "deploy" branch to the "master" branch on heroku
echo "hold on to your butts..."
echo "🚀 deploying to heroku 🚀"
git push --force heroku deploy:main
