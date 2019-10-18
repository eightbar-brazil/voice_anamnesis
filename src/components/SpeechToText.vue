<template>
    <div>
            <div @click="onClick()" :class="{ 'speech-to-text__button--speaking': isSpeaking }"
                    class="speech-to-text__button">
                    <img v-if="!isSpeaking" :src="micImage">
                    <img v-if="isSpeaking"
                        class="speech-to-text__stop" :src="stopImage">
            </div>
    </div>
</template>

<script>
import SpeechToText from '../lib/speech-to-text';
import micImage from '../assets/mic.png';
import stopImage from '../assets/stop.gif';

export default {
    name: 'SpeechToText',
    data() {
        return {
            isSpeaking: false,
            speech: '',
            speechService: {},
            micImage,
            stopImage
        };
    },
    methods: {
        onClick() {
            this.isSpeaking = true;
            this.speechService.speak().subscribe(
                (result) => {
                    //Transforma o texto capturado em um array
                    var resultHtml = result.split(' ');
                    //Determina a quantidade de marcações o texto terá
                    var numberTags = Math.floor(result.split(' ').length/4)
                    //Cria um array com posições aletórias aonde serão inseridas as marcações (<mark></mark>)
                    var array = Array.from({length: (numberTags)}, () => Math.floor(Math.random() * (result.split(' ').length)));
                    //Ordena o array do menor número para o maior. O sort sozinho pode ordenar de maneira errada, o sort sozinho retorna 2 é maior que 100
                    array.sort(function(a, b){return a - b});
                    //Coloca em maíuscula a primeira letra
                    resultHtml[0] = resultHtml[0].charAt(0).toUpperCase() + resultHtml[0].slice(1)
                    //Percorre o texto inserindo as tags <mark></mark>
                    for (var i = 0; i < (result.split(' ').length); i++){
                        //Remove valores gerados em duplicidade para evitar falha da lógica
                        if (array[0] == array[1]){
                            array.shift();
                        }
                        //Insere a tag na posição gerada aleatoriamente
                        if (array[0] == i){
                            //Se par marcação verde
                            if (i & 1){
                                resultHtml[i] =  " <mark style=\"background-color: LightGreen\"> " + resultHtml[i] + "</mark>";
                                array.shift();
                            //Senão azul
                            } else {
                                resultHtml[i] =  " <mark style=\"background-color: LightSkyBlue\"> " + resultHtml[i] + "</mark>";
                                array.shift();
                            }
                        }
                    }
                    this.speech = resultHtml.join(" "); //Transforma o array em string novamente e retorna o speech
                    this.$emit('speech', this.speech);
                    this.isSpeaking = false;
                },
                (error) => {
                    // eslint-disable-next-line
                    console.log('Error', error);
                    this.isSpeaking = false;
                },
                () => {
                    this.isSpeaking = false;
                }
            );
        }
    },
    props: {
        msg: String
    },
    created() {
        this.speechService = new SpeechToText();
    }
};
</script>

<style></style>
