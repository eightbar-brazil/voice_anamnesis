<template>
  <div>
    <div
      @click="onClick()"
      :class="{ 'speech-to-text__button--speaking': isSpeaking }"
      class="speech-to-text__button"
    >
      <img v-if="!isSpeaking" :src="micImage" />
      <img v-if="isSpeaking" class="speech-to-text__stop" :src="stopImage" />
    </div>
  </div>
</template>

<script>
import SpeechToText from "../lib/speech-to-text";
import micImage from "../assets/mic.png";
import stopImage from "../assets/stop.gif";

import Translator from "../lib/translate";
import Clinical from "../lib/clinical"

export default {
  name: "SpeechToText",
  data() {
    return {
      isSpeaking: false,
      speech: "",
      speechService: {},
      micImage,
      stopImage,
      translator: {},
      clinicalAnalysis: {}
    };
  },
  methods: {
    async onClick() {
      if (this.isSpeaking) {
        this.speechService.stop();
        var translated = await this.translator.translate(this.speech).then(translationResult => {
          return translationResult.result.translations[0].translation;
        });
        //translated = 'I have a fever, headache and cough';
        var entities = await this.clinicalAnalysis.analyze(translated).then(analysisResults => {
          return analysisResults.result.entities;
        });
        var ent = [], i = 0; 
        entities.forEach(element => {
          if(element.type == 'HealthCondition'){
            ent[i++] = element.text;
          }
        });

        var splitted = translated.split(/[ ,]+/);
          for(var ii = 0; ii < splitted.length; ii++){
            if(ent.indexOf(splitted[ii]) != -1){
              splitted[ii] = ' <mark style="background-color: LightSkyBlue"> ' +
                  splitted[ii] + "</mark>";
            }
          }


        /*
        var translatedEntities = await this.translator.retranslate(entities).then(translationResult => {
          return translationResult.result.translations;
        });
        translatedEntities.forEach(entity => {
          if(this.speech.search(entity.translation) != -1){
            this.speech = this.speech.replace(new RegExp(entity.translation, 'g'), ' <mark style="background-color: LightSkyBlue"> ' +
                  entity.translation + "</mark>");
          }
        });*/
        


        this.speech = splitted.join(' ');
        this.$emit("speech", this.speech);
        this.isSpeaking = false;
        return;
      }
      this.isSpeaking = true;
      this.speech = "";
      this.speechService.speak().subscribe(
        result => {
          //Transforma o texto capturado em um array
          var resultHtml = result.split(" ");
          /*
          //Determina a quantidade de marcações o texto terá
          var numberTags = Math.floor(result.split(" ").length / 4);
          //Cria um array com posições aletórias aonde serão inseridas as marcações (<mark></mark>)
          var array = Array.from({ length: numberTags }, () =>
            Math.floor(Math.random() * result.split(" ").length)
          );
          //Ordena o array do menor número para o maior. O sort sozinho pode ordenar de maneira errada, o sort sozinho retorna 2 é maior que 100
          array.sort(function(a, b) {
            return a - b;
          });
          */
          //Coloca em maíuscula a primeira letra
          resultHtml[0] = resultHtml[0].charAt(0).toUpperCase() + resultHtml[0].slice(1);
          
          /*
          //Percorre o texto inserindo as tags <mark></mark>
          for (var i = 0; i < result.split(" ").length; i++) {
            //Remove valores gerados em duplicidade para evitar falha da lógica
            if (array[0] == array[1]) {
              array.shift();
            }
            //Insere a tag na posição gerada aleatoriamente
            if (array[0] == i) {
              //Se par marcação verde
              if (i & 1) {
                resultHtml[i] =
                  ' <mark style="background-color: LightGreen"> ' +
                  resultHtml[i] +
                  "</mark>";
                array.shift();
                //Senão azul
              } else {
                resultHtml[i] =
                  ' <mark style="background-color: LightSkyBlue"> ' +
                  resultHtml[i] +
                  "</mark>";
                array.shift();
              }
            }
          }
          */
          this.speech += resultHtml.join(" "); //Transforma o array em string novamente e retorna o speech
          this.$emit("speech", this.speech);
          //this.isSpeaking = false;
        },
        error => {
          // eslint-disable-next-line
          console.log("Error", error);
          this.isSpeaking = false;
        },
        () => {
          this.isSpeaking = false;
          //this.isSpeaking = true;
        }
      );
    }
  },
  props: {
    msg: String
  },
  created() {
    this.speechService = new SpeechToText();
    this.translator = new Translator();
    this.clinicalAnalysis = new Clinical();
  }
};

</script>

<style></style>