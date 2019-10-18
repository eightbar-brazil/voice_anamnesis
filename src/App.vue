<template>
<div class="cover-container d-flex w-100 h-100 p-3 mx-auto flex-column">

<!-- Cabeçalho, aonde estão o Logo, slogan e menu -->
    <header role="header" class="masthead mb-auto">
      <div id="header" class="container">
          <div class="inner">
            <div class="row">
              <div class="col-sm">
                <h3 class="slogan-title">Fleury Saúde
                  <span class="slogan-subtitle">Excelência em Diagnóstico</span>
                </h3>  
              </div>
              <div class="col-sm">
                <nav class="nav nav-masthead justify-content-end">
                  <a class="nav-link a-menu active"  style="color: #fff" href="#">Home</a>
                  <a class="nav-link a-menu" href="#"> Features</a>
                  <a class="nav-link a-menu" href="#">Contact</a>
                </nav>
              </div>
            </div>
          </div>
      </div>
    </header>
    
<!-- Parte central, aonde estão o microfone e o texto -->
    <!-- <anaminesia> -->
          <main role="main" class="inner cover" slot-scope="">
            <div id="main" class="container">
              <div id="main-row" class="row">
                <div id="mic-column" class="col-sm-2 text-center">
                  <SpeechToText class="img-fluid rounded" @speech="onSpeechReceived($event)"/>
                </div>
                <div id="text-column" class="col-sm-10 text-center">
                  <p class="text-justify text-monospace"> <span v-html="speech"></span></p>
                  <p/>
                  <p v-if="!speech" class="text-justify text-monospace">Ambitioni <mark style="background-color: LightPink">dedisse</mark> scripsisse iudicaretur.
                  Cras mattis iudicium purus sit amet <mark style="background-color: LightGreen">fermentum</mark>.
                  Donec sed odio operae, eu vulputate felis <mark style="background-color: LightSkyBlue">rhoncus</mark>.
                  <mark style="background-color: LightPink">Praeterea</mark> iter est quasdam res quas ex communi.
                  At nos hinc <mark style="background-color: LightGreen">posthac</mark>, sitientis piros Afros.
                  Petierunt uti sibi concilium totius <mark style="background-color: LightSkyBlue">Galliae</mark> in diem certam indicere.
                  Cras <mark style="background-color: LightPink">mattis iudicium</mark> purus sit amet <mark style="background-color: LightGreen">fermentum</mark>.</p>
                </div>
              </div>
            </div>
          </main>
    <!-- </anaminesia>  -->

<!-- rodapé -->
  <footer class="mastfoot mt-auto">
    <div class="inner">
      <p>by IBM eightbar.</p>
    </div>
  </footer>

</div>
</template>

<script>
import "bootstrap/dist/css/bootstrap.css"
import "font-awesome/css/font-awesome.css"
// import Anaminesia from "./components/Anaminesia"
import SpeechToText from './components/SpeechToText.vue';

export default {
  name: 'app',
  components: {
    // Anaminesia,
    SpeechToText
  },
    data() {
        return {
            speech: ''
        };
    },
    methods: {
        onSpeechReceived(speech) {
          // eslint-disable-next-line
            console.log('Reveived', speech);
            this.speech = speech;
        }
    }
}
</script>

<style>
/*
 * Cabeçalho
 */
.masthead {
  margin-bottom: 2rem;
}

.masthead-brand {
  margin-bottom: 0;
}

.nav-masthead .nav-link {
  padding: .25rem 0;
  font-weight: 700;
  color: rgba(255, 255, 255, .5);
  background-color: transparent;
  border-bottom: .25rem solid transparent;
}

.nav-masthead .nav-link:hover,
.nav-masthead .nav-link:focus {
  border-bottom-color: rgba(255, 255, 255, .25);
}

.nav-masthead .nav-link + .nav-link {
  margin-left: 1rem;
}

.nav-masthead .active {
  color: #fff;
  border-bottom-color: #fff;
}

@media (min-width: 48em) {
  .masthead-brand {
    float: left;
  }
  .nav-masthead {
    float: right;
  }
}

.slogan-title{
  text-align: justify;
  font-size: 1.5rem;
  font-weight: 500;
  color: #fff;
  font-family: "Poppins";
}
.slogan-subtitle{
  font-size: 0.8rem;
  font-weight: 500;
  color: #9388fa;
  font-family: "Poppins";
  display: inline-block;
  padding-left: 0.5rem;
}
#header{
  background-color: #564FC1;
  padding-top: 30px;
  padding-bottom: 30px;
}
#main{
  background-color: #f1f1f1;
  width: 100%;
  height: 400px;
}
#mic-column{
  padding-top: 100px;
  padding-bottom: 100px;
  padding-left: 50px;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
}
#mic-column img {
    max-width:150px;
    max-height:100px;
    width: auto;
    height: auto;
}
#text-column{
  padding-top: 40px;
  padding-bottom: 40px;
  padding-right: 40px;
}
#language-column{
  padding-top: 2%;
  padding-bottom: 2%;
}

</style>
