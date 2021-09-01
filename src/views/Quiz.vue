<template>
  <section class="main" id="quiz">
    <section class="containner">
      <ul class="quiz-navigation">
        <router-link class="quiz-navigation-link" :to="{ name: 'Items'    ,hash:'#quiz'}">items</router-link>

        <router-link class="quiz-navigation-link" :to="{ name: 'Spells'   ,hash:'#quiz'}">Spells</router-link>

        <router-link class="quiz-navigation-link" :to="{ name: 'Quotes'   ,hash:'#quiz'}">ultimates</router-link>

        <router-link class="quiz-navigation-link" :to="{ name: 'Passives' ,hash:'#quiz' }">passives</router-link>
      </ul>
      <section class="quiz-containner">
        <div class="quiz-welcoming" v-if="$route.name == 'Quiz'">
          <h1>WELCOME TO LEAGUE QUIZ</h1>
          <p>what type of league quiz would you like to play today!</p>
          <small>select a quiz to start playing</small><br />
          <i class="fas fa-arrow-left"></i>
        </div>
        <passive-quiz v-if="$route.name == 'Passives'" />
        <spell-quiz v-if="$route.name == 'Spells'" />
        <item-quiz v-if="$route.name == 'Items'" />
        <quoat-quiz v-if="$route.name == 'Quotes'" />
      </section>
    </section>
  </section>
</template>

<script>
export default {
  name: "Quiz",
  components: {
    PassiveQuiz: () => import("@/components/quiz/passive.vue"),
    SpellQuiz: () => import("@/components/quiz/spell.vue"),
    QuoatQuiz: () => import("@/components/quiz/quoat.vue"),
    ItemQuiz: () => import("@/components/quiz/item.vue"),
  },
  mounted() {},
};
</script>

<style lang="scss" scoped>
.main {
  height: 100vh;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
  //   background:  #0b8793;
  background-image: url("https://image.winudf.com/v2/image/Y29tLmxvbHdhbGxwYXBlci5oZC5sb2xwaWN0dXJlcy5waG90b3MuYmFja2dyb3VuZC5jdXRlLmNvb2wuYXJ0LmxvbGltYWdlcy5oZC5mcmVlX3NjcmVlbl8zXzE1MzEyNjgyNDhfMDgx/screen-3.jpg?fakeurl=1&type=.jpg");
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  background-blend-mode: screen;
  .containner {
    height: 92%;
    width: 96%;
    display: grid;
    grid-template-columns: 3fr 9fr;
    background: rgba($color: rgb(187, 187, 187), $alpha: 0.7);
    border-radius: 15px;
    overflow: hidden;
    .quiz-navigation {
      list-style: none;
      display: flex;
      flex-direction: column;
      justify-content: center;
      padding: 0;
      margin: 0;
      height: 100%;
      font-size: 1.6em;
      font-weight: 500;
      text-align: start;
      text-transform: capitalize;
      overflow: hidden;
      position: relative;
      &::before {
        content: "";
        background: #222222;
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
        width: 100%;
        background-image: url("https://i.pinimg.com/originals/6a/49/7b/6a497bc402f3f5a1479696657cc2f964.jpg");
        background-position: center;
        background-repeat: no-repeat;
        background-size: cover;
        background-blend-mode: screen;
        // opacity: 0.5;
        z-index: 0;
      }
      &::after {
        content: "";
        background: #222222;
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
        width: 100%;
        opacity: 0.7;
        z-index: 1;
      }
      .quiz-navigation-link {
        margin-left: 1em;
        padding-left: 1em;
        padding-top: 0.5em;
        padding-bottom: 0.5em;
        color: white;
        border-top-left-radius: 15px;
        border-bottom-left-radius: 15px;
        z-index: 2;
        &:hover {
          background: #5252529f;
        }
      }
    }
    .router-link-exact-active {
      background: #cfcfcf;
      color: black !important;
      //   box-shadow: -1px 3px 7px 0px whitesmoke;
      &:hover {
        background: #cfcfcf !important;
      }
    }
    .quiz-containner {
      display: flex;
      align-items: center;
      justify-content: center;
      background: rgba($color: rgb(41, 41, 41), $alpha: 0.7);
      color: whitesmoke;
      height: 100%;
      .quiz-welcoming {
        h1 {
          font-size: 3.5em;
          margin-bottom: 0.4em;
          text-transform: uppercase;
        }
        p {
          font-size: 1.3em;
        }
        small {
          font-size: 1em;
        }
        i {
          margin-top: 1em;
          font-size: 1.4em;
          animation: arrow infinite ease-in-out 1.3s;
        }
      }
    }
  }
}
@keyframes arrow {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-50%);
  }
}
//3b3b3b
//515151
//222222
</style>
