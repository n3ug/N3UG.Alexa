const Alexa = require('alexa-sdk');

const APP_ID = process.env.APP_ID;

const handlers = {
  'LaunchRequest': function() {
    this.emit('TellMeetingIntent');
  },
  'NextMeetingIntent' : function() {
      this.response.speak('The next meeting is on May 8th, 2018');
      this.emit(':responseReady');
  },
  'WhoMeetingIntent' : function() {
    this.response.speak('The next speaker will be charles lafferty');
    this.emit(':responseReady');
  },
  'TopicMeetingIntent' : function() {
    this.response.speak('The next topic will be alexa with a. w. s. lambda');
    this.emit(':responseReady');
  },
  'WhereMeetingIntent' : function() {
    this.response.speak('Parsippany-Troy Hills Library, 68 Nokomis Ave, Lake Hiawatha, NJ 07034');
    this.emit(':responseReady');
  },
  'TellMeetingIntent' : function() {
    this.response.speak('The next meeting is on May 8th, 2018. The next speaker will be charles lafferty speaking about alexa and will be held at Parsippany-Troy Hills Library, 68 Nokomis Ave, Lake Hiawatha, NJ 07034');
    this.emit(':responseReady');
  }
};

exports.handler = function(event, context, callback) {
    const alexa = Alexa.handler(event, context, callback);
    alexa.appId = APP_ID // APP_ID is your skill id which can be found in the Amazon developer console where you create the skill.
    alexa.registerHandlers(handlers);
    alexa.execute();
};