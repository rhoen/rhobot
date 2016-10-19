# rhobot
This project is a toy slack bot to experiment developing chat bots that
can provide value in the work place.
## Running
To install and run on a raspberry pi follow these simple steps:
- load the git repo
- create a config.json file with your slack token
- npm install
- run `nohup node rhobot.js &` (this command starts the node server in the background
  on your raspberry pi/what ever server you are using)
## Libraries
Rhobot uses the Slack RTM library. Originally I experimented with the botkit
library, but the bot would die after about 1 day running on a pi.
The slack library appears not to have this issue, although has far fewer features
than botkit.
