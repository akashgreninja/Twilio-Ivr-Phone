const VoiceResponse = require("twilio").twiml.VoiceResponse;
const {question_english,answers_chinese,answers_english,answers_spanish,question_spanish} =require('./questionandanswers')

  exports.welcome = function welcome() {
    const voiceResponse = new VoiceResponse();

    const gather = voiceResponse.gather({
      action: "/ivr/faq",
      numDigits: "1",
      method: "POST",
    });

    gather.say(
      "Thanks for calling the Lazy Guesthouse Service" +
        "Please press 1 continue in English. " +
        "Press 2 to continue in Mandarin. " +
        "Presione 3 para continuar en español. " +
        "Press 9 to repeat ",
      { loop: 3 }
    );

    return voiceResponse.toString();
  };

exports.menu = function menu(digit) {
  const optionActions = {
    1: faq(digit),
    2: faq(digit),
    3: faq(digit),
    
  };

  return optionActions[digit] ? optionActions[digit]() : redirectWelcome();
};


/**
 * Returns a TwiML to interact with the client
 * @return {String}
 */
function faq(digit) {
  const twiml = new VoiceResponse();
  const speechResult = req.body.SpeechResult;

  const gather = twiml.gather({
    action: "/ivr/faqquestions",
    input: "speech",
    numDigits: '1',
    timeout: 3,
    method: "POST",
  });
  gather.say("Welcome to the IVR system. Please state your request.");
  res.writeHead(200, { "Content-Type": "text/xml" });
  res.end(response.toString(),digit);

  return twiml.toString();
}
function faqquestions(req,res,digit) {
  const response = new VoiceResponse();
  const speechResult = req.body.SpeechResult;
  if (digit === "1") {
    for (let index = 0; index < question_english.length; index++) {
      if (speechResult.includes(question_english[index])) {
        response.say(answers_english[index]);
        response.hangup();
      } else if (speechResult.includes("main menu ")) {
        response.say("Returning to the main menu");
      } else {
        response.say(
          "I'm sorry, I didn't understand that. We probably dont have that faq i request you to try again or call the reception  ."
        );
        return faqquestions(digit);
      }
    }


  }
  else if (digit === "2") {
    for (let index = 0; index < question_chinese.length; index++) {
      if (speechResult.includes(question_chinese[index])) {
        response.say(answers_chinese[index]);

      } else if (speechResult.includes("main menu ")) {
        response.say("Returning to the main menu");
      } else {
        response.say(
          "I'm sorry, I didn't understand that. We probably dont have that faq i request you to try again or call the reception  ."
        );
        return faqquestions(digit);
      }
    }

  }
  else if (digit === "3") {
    for (let index = 0; index < question_spanish.length; index++) {
      if (speechResult.includes(question_spanish[index])) {
        response.say(answers_spanish[index]);

      } else if (speechResult.includes("#main menu ")) {
        response.say("Returning to the main menu");
      } else {
        response.say(
          "I'm sorry, I didn't understand that. We probably dont have that faq i request you to try again or call the reception  ."
        );
        return faqquestions(digit);
      }
    }
  }
}

/**
 * Returns an xml with the redirect
 * @return {String}
 */
function redirectWelcome() {
  const twiml = new VoiceResponse();

  twiml.say("Returning to the main menu", {
    voice: "alice",
    language: "en-GB",
  });

  twiml.redirect("/ivr/welcome");

  return twiml.toString();
}
