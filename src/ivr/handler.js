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
      "Press 3 to continue in Spansih " +
      "Press 9 to repeat ",
    { loop: 3 }
  );

  return voiceResponse.toString();
};

// exports.menu = function menu(digit) {
//   const optionActions = {
//     1: giveExtractionPointInstructions,
//     2: listPlanets,
//   };

//   return optionActions[digit] ? optionActions[digit]() : redirectWelcome();
// };

// exports.planets = function planets(digit) {
//   const optionActions = {
//     2: "+19295566487",
//     3: "+17262043675",
//     4: "+16513582243",
//   };

//   if (optionActions[digit]) {
//     const twiml = new VoiceResponse();
//     twiml.dial(optionActions[digit]);
//     return twiml.toString();
//   }

//   return redirectWelcome();
// };

// /**
//  * Returns Twiml
//  * @return {String}
//  */
// function giveExtractionPointInstructions() {
//   const twiml = new VoiceResponse();

//   twiml.say(
//     "To get to your extraction point, get on your bike and go down " +
//       "the street. Then Left down an alley. Avoid the police cars. Turn left " +
//       "into an unfinished housing development. Fly over the roadblock. Go " +
//       "passed the moon. Soon after you will see your mother ship.",
//     { voice: "alice", language: "en-GB" }
//   );

//   twiml.say(
//     "Thank you for calling the ET Phone Home Service - the " +
//       "adventurous alien's first choice in intergalactic travel"
//   );

//   twiml.hangup();

//   return twiml.toString();
// }


/**
 * Returns a TwiML to interact with the client
 * @return {String}
 */
function faq(req, res) {
  const twiml = new VoiceResponse();
  const speechResult = req.body.SpeechResult;

  const gather = twiml.gather({
    action: "/ivr/faqquestions",
    input: "speech",
    // numDigits: '1',
    timeout: 3,
    method: "POST",
  });
  gather.say("Welcome to the IVR system. Please state your request.");
  res.writeHead(200, { "Content-Type": "text/xml" });
  res.end(response.toString());

  return twiml.toString();
}
function faqquestions(digit,speechResult) {
  const response = new VoiceResponse();
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

    // res.writeHead(200, { "Content-Type": "text/xml" });
    // res.end(response.toString());
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
