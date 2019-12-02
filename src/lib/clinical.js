const NaturalLanguageUnderstandingV1 = require('ibm-watson/natural-language-understanding/v1');
const { IamAuthenticator } = require('ibm-watson/auth');

export default class Clinical{
    constructor(){
        this.naturalLanguageUnderstanding = new NaturalLanguageUnderstandingV1({
            version: '2019-11-22',
            authenticator: new IamAuthenticator({
              apikey: '<<ENTER API KEY>>',
            }),
            url: 'https://gateway.watsonplatform.net/natural-language-understanding/api',
        });
        this.analyzeParams = {
              "features":{
                  'entities': {},
                  'concepts': {},
              },
              'text': 'I have a fever, headache and cough.'
        };
    }

    async analyze(text){
      this.analyzeParams.text = text;
      return this.naturalLanguageUnderstanding.analyze(this.analyzeParams);
    }
}