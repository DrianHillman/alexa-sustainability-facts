/**
    Copyright 2014-2015 Amazon.com, Inc. or its affiliates. All Rights Reserved.

    Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at

        http://aws.amazon.com/apache2.0/

    or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
*/

/**
 * Sources:
 * Climate Change Facts (https://www3.epa.gov/climatechange/basics/facts.html) - US Evironmental Protection Agency
 * Fun facts about renewable energy (https://www.ovoenergy.com/blog/green/10-fun-facts-about-renewable-energy.html) - ovoenergy
 * Fun Facts About Sustainability (http://www.pointpark.edu/About/AdminDepts/ProcurementandBusinessServices/Sustainability/FunFacts)- Point Park University
 * Solar Energy (http://environment.nationalgeographic.com/environment/global-warming/solar-power-profile/)- National Geographic
 * Key Facts about nuclear fusion (http://www.americansecurityproject.org/10-key-facts-about-nuclear-fusion/)- American Security Project
 * Fighting climate change (http://www.rainforest-alliance.org/sites/default/files/campaign/campaign-files/our-forgotten-friends/index.php)- Rainforest Alliance
*/ 

/**
 * App ID for the skill
 */
var APP_ID = undefined; //OPTIONAL: replace with "amzn1.echo-sdk-ams.app.[your-unique-value-here]";


var FACTS = [
    "An automatic dishwasher uses less hot water than doing dishes by hand— an average of six gallons less, or more than two thousand gallons per year.",
    "Water efficient fixtures can cut water use by 30 percent.",
    "Although accounting for only 5% of the world's population, Americans consume twenty-six percent of the world's energy.",
    "Some new refrigerators are so energy-smart they use less electricity than a standard light bulb.",
    "If taken advantage of to its fullest extent, sunlight that beams on the earth for one hour could meet world energy demands for an entire year.",
    "Renewable Energy creates three-times more jobs than fossil fuels.",
    "Research in nuclear fusion will spark monumental scientific achievements. Fusion will give countries freedom from fossil fuels, it emits no pollutants or greenhouse gases, and there is no threat of nuclear meltdown like there is with the nuclear fission reactors of today!",
    "Nuclear fusion has the potential to cleanly generate a nearly inexhaustible supply of energy. Fusion is the same reaction that powers the sun.",
    "One tree can convert as much as forty-eight pounds of carbon dioxide into clean air per year",
    "A mature tree can reduce peak summer temperatures by up to 9 degrees fareignheight",
    "C O 2 emissions in the United States actually decreased from 2005 to 2014, thanks in part to new, energy-efficient technology and the use of cleaner fuels. Let's keep up the good work!",
    "Plants, oceans, and soils release and absorb large quantities of carbon dioxide as a part of the Earth's natural carbon cycle. These natural emissions and absorptions of carbon dioxide on average balance out over time. However, the carbon dioxide from human activities is not part of this natural balance.",
    "It is not too late to have a significant impact on future climate change and its effects on us. With appropriate actions by governments, communities, individuals, and businesses, we can reduce the amount of greenhouse gas pollution we release and lower the risk of much greater warming and severe consequences."
    
];

/**
 * The AlexaSkill prototype and helper functions
 */
var AlexaSkill = require('./AlexaSkill');

/**
 * SpaceGeek is a child of AlexaSkill.
 * To read more about inheritance in JavaScript, see the link below.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Introduction_to_Object-Oriented_JavaScript#Inheritance
 */
var Fact = function () {
    AlexaSkill.call(this, APP_ID);
};

// Extend AlexaSkill
Fact.prototype = Object.create(AlexaSkill.prototype);
Fact.prototype.constructor = Fact;

Fact.prototype.eventHandlers.onSessionStarted = function (sessionStartedRequest, session) {
    //console.log("onSessionStarted requestId: " + sessionStartedRequest.requestId + ", sessionId: " + session.sessionId);
    // any initialization logic goes here
};

Fact.prototype.eventHandlers.onLaunch = function (launchRequest, session, response) {
    //console.log("onLaunch requestId: " + launchRequest.requestId + ", sessionId: " + session.sessionId);
    handleNewFactRequest(response);
};

/**
 * Overridden to show that a subclass can override this function to teardown session state.
 */
Fact.prototype.eventHandlers.onSessionEnded = function (sessionEndedRequest, session) {
    //console.log("onSessionEnded requestId: " + sessionEndedRequest.requestId + ", sessionId: " + session.sessionId);
    // any cleanup logic goes here
};

Fact.prototype.intentHandlers = {
    "GetNewFactIntent": function (intent, session, response) {
        handleNewFactRequest(response);
    },

    "AMAZON.HelpIntent": function (intent, session, response) {
        response.ask("You can say tell me a sustainability fact, or, you can say exit... What can I help you with?", "What can I help you with?");
    },

    "AMAZON.StopIntent": function (intent, session, response) {
        var speechOutput = "Goodbye";
        response.tell(speechOutput);
    },

    "AMAZON.CancelIntent": function (intent, session, response) {
        var speechOutput = "Goodbye";
        response.tell(speechOutput);
    }
};

/**
 * Gets a random new fact from the list and returns to the user.
 */
function handleNewFactRequest(response) {
    // Get a random fact from the facts list
    var factIndex = Math.floor(Math.random() * FACTS.length);
    var randomFact = FACTS[factIndex];

    // Create speech output
    var speechOutput = "Here's your fact: " + randomFact;
    var cardTitle = "Your Fact";
    response.tellWithCard(speechOutput, cardTitle, speechOutput);
}

// Create the handler that responds to the Alexa Request.
exports.handler = function (event, context) {
    // Create an instance of the SpaceGeek skill.
    var fact = new Fact();
    fact.execute(event, context);
};

