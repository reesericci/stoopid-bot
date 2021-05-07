# stoopid.xyz - The best discord troll bot
## Commands:
-  /help - help
-  /spam - spam a channel, or do a DMSpam!
- file an issue with a feature request

## How to host your own Stoopid Bot!
Use docker to host your own version of Stoopid Bot!

- Login to GHCR (github containers) `docker login docker.pkg.github.com -u username` ***you have to use a personal access token instead of a password***
- Pull the latest stable image (or the beta by using :testing instead of :stable) `docker pull docker.pkg.github.com/reesericci/stoopid-bot/stoopid:stable`
- Run it! `docker run --name stoopid --env BOT_TOKEN=XYZ docker.pkg.github.com/reesericci/stoopid-bot/stoopid:stable`
