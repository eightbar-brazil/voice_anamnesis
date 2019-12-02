const LanguageTranslatorV3 = require('ibm-watson/language-translator/v3');
const { IamAuthenticator } = require('ibm-watson/auth');

export default class Translator {
  constructor() {
    this.languageTranslator = new LanguageTranslatorV3({
      version: '2019-10-28',
      authenticator: new IamAuthenticator({
        apikey: '5FaLDIG9QblgaBmHjAa7k7uzuv_jgNsJ-9gXFWb9mpid',
      }),
      url: 'https://gateway.watsonplatform.net/language-translator/api',
    });
    this.translateParams = {
      text: 'Olá mundo',
      modelId: 'pt-en',
    };
  }
  async translate(textToTranslate) {
   this.translateParams.text = textToTranslate;
    return this.languageTranslator.translate(this.translateParams);
  }
  async retranslate(textToRetranslate){
    this.translateParams.modelId = 'en-pt';
    this.translateParams.text = textToRetranslate;
    return this.languageTranslator.translate(this.translateParams);
  }
}
