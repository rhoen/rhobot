var RtmClient = require('@slack/client').RtmClient;
var CLIENT_EVENTS = require('@slack/client').CLIENT_EVENTS;
var RTM_CLIENT_EVENTS = require('@slack/client').CLIENT_EVENTS.RTM;
var RTM_EVENTS = require('@slack/client').RTM_EVENTS;

var config = require('./config.json');
var rtm = new RtmClient(config.botApiKey, {logLevel: 'info'});
rtm.start();

var givenID = '';
rtm.on(CLIENT_EVENTS.RTM.AUTHENTICATED, function (rtmStartData) {
  givenID = rtmStartData.self.id;
});

var hasLiveConnection = false;
rtm.on(RTM_CLIENT_EVENTS.RTM_CONNECTION_OPENED, function () {
  hasLiveConnection = true;
});

var quotes = ["I am a rhobot"];
rtm.on(RTM_EVENTS.MESSAGE, function handleRtmMessage(message) {
  var messageText = message.text
  var response = '';
  if (messageText.match(givenID)) {
    response = "I win against you.";
  } else if (messageText.match(/(bike)|(car)/gi)) {
    response = "I have a better car than you."
  }
  if (hasLiveConnection && response) {
    rtm.sendMessage(response, message.channel);
  }
});
