<template>
  <div class="quiz-main">
    <transition name="fade" mode="out-in" appear :duration="2">
      <start-quiz
        :quizType="'Quotes'"
        @startQuiz="startQuiz"
        ref="quizStart"
        v-if="!isQuizStarted"
      />
      <end-quiz v-else-if="isQuizFinished" :results="answers" quizType="Quotes" />
      <div class="quiz-containner" v-else>
        <div class="quiz-header">
          <b class="countDownBar" ref="countDownBar"></b>
          <h1>Who says that?</h1>
          <div class="answersCounter">{{ answersCounter }} / 10</div>
        </div>
        <div class="quiz-body">
          <div class="quote">
            <h1>{{ randomQuote.quote }}</h1>
          </div>
        </div>
        <div class="quiz-footer">
          <form class="inputs" @submit.prevent="submitAnswer" @reset.prevent="skipQuestion">
            <champion-auto-complete @championSelected="championSelected" />
            <div class="actions">
              <input class="submit" type="submit" value="Answer" :disabled="isQuizFinished" />
              <input class="skip" type="reset" value="Skip" :disabled="isQuizFinished" />
            </div>
          </form>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import axios from "@/axios";
import mixin from "@/mixins/quiz.js";
export default {
  name: "QuoteQuiz",
  mixins: [mixin],
  components: {
    ChampionAutoComplete: () => import("@/components/utility/champions/championAutoComplete.vue"),
  },
  async mounted() {
    await this.getRandomQuotes();
  },
  data() {
    return {
      randomQuote: {},
      randomQuoteIndex: 0,
      randomQuotes: [],
      answer: {
        champion: {
          key: "0",
          name: "Skipped",
        },
      },
    };
  },
  methods: {
    async startQuiz() {
      this.isQuizStarted = true;
      this.nextQuote();
      // this.startTimer();
    },
    async getRandomQuotes() {
      try {
        let response = await axios.get("/randomQuotes/" + 10);
        this.randomQuotes = response.data;
      } catch (error) {
        console.log(error);
      }
    },
    nextQuote() {
      this.randomQuote = this.randomQuotes[this.randomQuoteIndex];
      this.randomQuoteIndex++;
    },
    submitAnswer() {
      if (this.answers.length <= this.randomQuotes.length) {
        this.answers.push({ userAnswer: this.answer, correctAnswer: this.randomQuote.answer });
        if (this.answers.length <= this.randomQuotes.length) {
          clearInterval(this.timer);
          this.nextQuote();
          this.startTimer();
          this.resetAnswer();
        }
      }
      if (this.answers.length == 10) {
        clearInterval(this.timer);
      }
    },
    skipQuestion() {
      if (this.answers.length <= this.randomQuotes.length) {
        this.answers.push({ userAnswer: this.answer, correctAnswer: this.randomQuote.answer });
        if (this.answers.length <= this.randomQuotes.length) {
          clearInterval(this.timer);
          this.nextQuote();
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
    justify-content: space-around;
    // align-items: center;
    height: 90%;
    width: 100%;
    padding: 2rem 0;
    gap: 1rem;
    position: relative;
    .quiz-header {
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
    }
    .quiz-body {
      .quote {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        border-radius: 7px;
        gap: 1rem;
        padding: 1rem;
        h1 {
          margin: 0;
          font-size: 2rem;
          letter-spacing: 2px;
          text-transform: none;
          color: #d2d2d2;
          z-index: 0;
        }
      }
    }
    .quiz-footer {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
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
        .actions {
          display: flex;
          gap: 1.5rem;
          input {
            width: 100%;
            border: none;
            outline: none;
            border-radius: 50px;
            padding: 1rem 2.6rem;
            cursor: pointer;
            letter-spacing: 1.3px;
            font-weight: 600;
            font-size: 1.4em;
            text-transform: capitalize;
            transition: ease-in-out 0.1s;
            color: white;
            &:hover {
              transform: scale(0.98);
            }
          }
          .submit {
            background: goldenrod;
            &:hover {
              color: black;
            }
          }
          .skip {
            color: black;
            background: #e5e5e5;
            &:hover {
              color: goldenrod;
            }
          }
        }
      }
    }
  }
}
</style>
