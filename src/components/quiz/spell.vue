<template>
  <div class="quiz-main">
    <transition name="fade" mode="out-in" appear :duration="2">
      <start-quiz
        :quizType="'Spells'"
        @startQuiz="startQuiz"
        ref="quizStart"
        v-if="!isQuizStarted"
      />
      <end-quiz v-else-if="isQuizFinished" :results="answers" quizType="Spells" />
      <div class="quiz-containner" v-else>
        <b class="countDownBar" ref="countDownBar"></b>
        <h1>Guess the ability bellow!</h1>
        <div class="answersCounter">{{ answersCounter }} / 10</div>
        <div class="spell">
          <img :src="randomSpell.spell.image ? randomSpell.spell.image : loadingImageSrc" alt="" />
          <h1>{{ randomSpell.spell.name }}</h1>
        </div>
        <form class="inputs" @submit.prevent="submitAnswer">
          <champion-auto-complete @championSelected="championSelected" />
          <div class="ability-alphabet-group">
            <div class="ability-input-group">
              <input
                type="radio"
                v-model="answer.spellLetter"
                class="ability-alphabet"
                name="abilityAlphabet"
                value="Q"
                checked
              />
              <label for="Q">Q</label>
            </div>
            <div class="ability-input-group">
              <input
                type="radio"
                v-model="answer.spellLetter"
                class="ability-alphabet"
                name="abilityAlphabet"
                value="W"
              />
              <label for="W">W</label>
            </div>
            <div class="ability-input-group">
              <input
                type="radio"
                v-model="answer.spellLetter"
                class="ability-alphabet"
                name="abilityAlphabet"
                value="E"
              />
              <label for="E">E</label>
            </div>
            <div class="ability-input-group">
              <input
                type="radio"
                v-model="answer.spellLetter"
                class="ability-alphabet"
                name="abilityAlphabet"
                value="R"
              />
              <label for="R">R</label>
            </div>
          </div>
          <input class="submit" type="submit" value="Answer" :disabled="isQuizFinished" />
        </form>
      </div>
    </transition>
  </div>
</template>

<script>
import axios from "@/axios";
import mixin from "@/mixins/quiz.js";
export default {
  name: "SpellQuiz",
  mixins: [mixin],
  components: {
    ChampionAutoComplete: () => import("@/components/utility/champions/championAutoComplete.vue"),
  },
  async created() {
    await this.getRandomSpells();
  },
  data() {
    return {
      randomSpell: {},
      randomSpellIndex: 0,
      randomSpells: [],
      answer: {
        champion: {
          key: "0",
          name: "Skipped",
        },
        spellLetter: "Q",
      },
    };
  },
  methods: {
    async startQuiz() {
      this.isQuizStarted = true;
      this.nextSpell();
      this.startTimer();
    },
    async getRandomSpells() {
      try {
        let response = await axios.get("/randomSpells");
        console.log(response.data);
        this.randomSpells = response.data;
      } catch (error) {
        console.log(error);
      }
    },
    nextSpell() {
      this.randomSpell = this.randomSpells[this.randomSpellIndex];
      this.randomSpellIndex++;
    },
    submitAnswer() {
      if (this.answers.length <= this.randomSpells.length) {
        this.answers.push({ userAnswer: this.answer, correctAnswer: this.randomSpell.answer });
        if (this.answers.length <= this.randomSpells.length) {
          clearInterval(this.timer);
          this.nextSpell();
          this.startTimer();
          this.resetAnswer();
        }
      }
      if (this.answers.length == 10) {
        clearInterval(this.timer);
      }
    },
    resetAnswer() {
      this.answer = {
        champion: {
          key: "0",
          name: "Skipped",
        },
        spellLetter: "Q",
      };
      this.$children[0].reset();
    },
    championSelected(champion) {
      this.answer.champion = champion;
    },
  },
};
</script>

<style lang="scss" scoped>
.quiz-main {
  height: 100%;
  width: 100%;
  .quiz-containner {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    // height: 100%;
    padding: 2rem 0;
    gap: 1rem;
    position: relative;
    .answersCounter {
      font-size: 1.7rem;
      margin: 0;
      color: #d2d2d2;
      font-weight: 500;
    }
    .countDownBar {
      position: absolute;
      top: 0px;
      left: 0;
      width: 100%;
      height: 7px;
      background: goldenrod;
      transition: linear 1s;
    }
    h1 {
      font-size: 2em;
      font-weight: 600;
      text-transform: uppercase;
      margin: 0;
      color: goldenrod;
    }
    .spell {
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      border-radius: 7px;
      gap: 1rem;
      img {
        box-shadow: 0px 0px 8px 3px rgba(255, 255, 255, 0.25);
        height: 20vh;
        width: 20vh;
        margin: 0;
        border-radius: 7px;
      }
      h1 {
        margin: 0;
        font-size: 1.5rem;
        letter-spacing: 2px;
        text-transform: none;
        color: #d2d2d2;
        z-index: 0;
      }
    }
    .inputs {
      display: flex;
      flex-direction: column;
      gap: 2em;
      justify-content: space-evenly;
      width: 60%;
      align-items: center;
      .champion-name-input {
        width: 70%;
        border: none;
        outline: none;
        border-radius: 50px;
        padding: 1rem 1rem 1rem 1.5rem;
        letter-spacing: 1.3px;
        font-weight: 600;
        font-size: 1.2em;
        text-transform: capitalize;
        background: goldenrod;
        &::placeholder {
          color: rgb(88, 88, 88);
        }
      }
      .submit {
        width: 50%;
        border: none;
        outline: none;
        border-radius: 50px;
        padding: 1rem 2.6rem;
        cursor: pointer;
        letter-spacing: 1.3px;
        font-weight: 600;
        font-size: 1.4em;
        text-transform: capitalize;
        transition: ease-in-out 0.3s;
        background: goldenrod;
        color: white;
        &:hover {
          color: darkslategray;
          transform: scale(0.95);
        }
      }
      .ability-alphabet-group {
        display: flex;
        align-content: center;
        gap: 2em;
        .ability-input-group {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 0.7em;
          label {
            font-size: 1.5em;
            font-weight: 700;
            color: goldenrod;
          }
          .ability-alphabet {
            cursor: pointer;
            display: block;
            transform: scale(2);
          }
        }
      }
    }
  }
}
</style>
