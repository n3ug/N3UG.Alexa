const Alexa = require('ask-sdk-core');
// use 'ask-sdk' if standard SDK module is installed

/* CONSTANTS */
const STATE = {
  LAUNCH: 'LAUNCH',
  TOPIC: 'TOPIC',
  WHEN: 'WHEN',
  COMPLETE: 'COMPLETE'
};

const LaunchRequestHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'LaunchRequest';
    },
    handle(handlerInput) {
        const speechText = 'Hi, would you like to speak at n three u g?';

        const attributes = handlerInput.attributesManager.getSessionAttributes();
        attributes.state = STATE.LAUNCH;

        return handlerInput.responseBuilder
            .speak(speechText)
            .reprompt(speechText)
            .withSimpleCard('Speaky Time', speechText)
            .getResponse();
    }
};

const YesIntentHandler = {
  canHandle(handlerInput) {
      console.log(handlerInput.requestEnvelope.request);
      return handlerInput.requestEnvelope.request.type === 'IntentRequest'
          && handlerInput.requestEnvelope.request.intent.name === 'AMAZON.YesIntent';
  },
  handle(handlerInput) {
      let speechText = 'what the booyah';

      const attributes = handlerInput.attributesManager.getSessionAttributes();
      
      if (attributes.state == STATE.LAUNCH) {
        speechText = 'what topic?';
      }

      return handlerInput.responseBuilder
        .speak(speechText)
        .reprompt('I said, what topic do you want to speak about sucka?')
        .withSimpleCard('What is your topic?', speechText)
        .getResponse();
  }
};

const NoIntentHandler = {
  canHandle(handlerInput) {
      console.log(handlerInput.requestEnvelope.request);
      return handlerInput.requestEnvelope.request.type === 'IntentRequest'
          && handlerInput.requestEnvelope.request.intent.name === 'AMAZON.NoIntent';
  },
  handle(handlerInput) {
      let speechText = 'Too bad. You would have made a great speaker. Good bye!';

      return handlerInput.responseBuilder
        .speak(speechText)
        .withSimpleCard('Peace Outy', speechText)
        .getResponse();
  }
};

const TopicIntentHandler = {
  canHandle(handlerInput) {
      return handlerInput.requestEnvelope.request.type === 'IntentRequest'
          && handlerInput.requestEnvelope.request.intent.name === 'TopicIntent';
  },
  handle(handlerInput) {
      let speechText = 'for when?';

      const attributes = handlerInput.attributesManager.getSessionAttributes();
      attributes.topic = handlerInput.requestEnvelope.request.intent.slots['Topic'].value;

      return handlerInput.responseBuilder
        .speak(speechText)
        .reprompt('I said, when do you want to speak?')
        .withSimpleCard('When dude?', speechText)
        .getResponse();
  }
};

const WhenIntentHandler = {
  canHandle(handlerInput) {
      return handlerInput.requestEnvelope.request.type === 'IntentRequest'
          && handlerInput.requestEnvelope.request.intent.name === 'WhenIntent';
  },
  handle(handlerInput) {
      const attributes = handlerInput.attributesManager.getSessionAttributes();
      attributes.date = handlerInput.requestEnvelope.request.intent.slots['Date'].value;

      let speechText = 'Great! You will speak at n three u g on ' + attributes.topic + ' on date ' + attributes.date;

      return handlerInput.responseBuilder
        .speak(speechText)
        .withSimpleCard('Thanks my friend?', speechText)
        .getResponse();
  }
};



const BooyaIntentHandler = {
  canHandle(handlerInput) {
      return handlerInput.requestEnvelope.request.type === 'IntentRequest'
          && handlerInput.requestEnvelope.request.intent.name === 'BooyaIntent';
  },
  handle(handlerInput) {
      let speechText = 'The ham is in the booyah. Do you want some?';

      const attributes = handlerInput.attributesManager.getSessionAttributes();
      
      if (attributes.state == 'inProgress') {
        speechText = speechText + ' By the way you are in progress sucka';
      }

      return handlerInput.responseBuilder
        .speak(speechText)
        .reprompt('Do you want a career or to be a couch potato?')
        .withSimpleCard('Booya', speechText)
        .getResponse();
  }
};

const HelpIntentHandler = {
  canHandle(handlerInput) {
      return handlerInput.requestEnvelope.request.type === 'IntentRequest'
          && handlerInput.requestEnvelope.request.intent.name === 'AMAZON.HelpIntent';
  },
  handle(handlerInput) {
      const speechText = 'You can say booya to me!';

      return handlerInput.responseBuilder
          .speak(speechText)
          .reprompt(speechText)
          .withSimpleCard('Booya', speechText)
          .getResponse();
  }
};

const CancelAndStopIntentHandler = {
  canHandle(handlerInput) {
      return handlerInput.requestEnvelope.request.type === 'IntentRequest'
          && (handlerInput.requestEnvelope.request.intent.name === 'AMAZON.CancelIntent'
              || handlerInput.requestEnvelope.request.intent.name === 'AMAZON.StopIntent');
  },
  handle(handlerInput) {
      const speechText = 'Goodbye!';

      return handlerInput.responseBuilder
          .speak(speechText)
          .withSimpleCard('Booya', speechText)
          .getResponse();
  }
};


const SessionEndedRequestHandler = {
  canHandle(handlerInput) {
      return handlerInput.requestEnvelope.request.type === 'SessionEndedRequest';
  },
  handle(handlerInput) {
      //any cleanup logic goes here
      return handlerInput.responseBuilder.getResponse();
  }
};

const ErrorHandler = {
  canHandle() {
    return true;
  },
  handle(handlerInput, error) {
    console.log(`Error handled: ${error.message}`);

    return handlerInput.responseBuilder
      .speak('Sorry, I can\'t understand the command. Please say again.')
      .reprompt('Sorry, I can\'t understand the command. Please say again.')
      .getResponse();
  },
};

exports.handler = Alexa.SkillBuilders.custom()
     .addRequestHandlers(LaunchRequestHandler,
        YesIntentHandler,
        NoIntentHandler,
        TopicIntentHandler,
        WhenIntentHandler,
        BooyaIntentHandler,
        HelpIntentHandler,
        CancelAndStopIntentHandler,
        SessionEndedRequestHandler)
     // .addErrorHandlers(ErrorHandler)
     .lambda();