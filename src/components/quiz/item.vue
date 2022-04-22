<template>
  <div class="quiz-main">
    <transition name="fade" mode="out-in" appear :duration="2">
      <start-quiz
        :quizType="'Spells'"
        @startQuiz="startQuiz"
        ref="quizStart"
        v-if="!isQuizStarted"
      />
      <end-quiz v-else-if="isQuizFinished" :results="answers" :quizType="'Items'" />
      <div class="quiz-containner" v-else>
        <b class="countDownBar" ref="countDownBar"></b>
        <h1>Guess the Item name!</h1>
        <div class="answersCounter">{{ answersCounter }} / 10</div>
        <div class="spell">
          <img :src="randomItem.image ? randomItem.image : loadingImageSrc" alt="" />
        </div>
        <form class="inputs" @submit.prevent="submitAnswer">
          <item-auto-complete @itemSelected="itemSelected" />
          <input class="submit" type="submit" value="Answer" />
        </form>
      </div>
    </transition>
  </div>
</template>

<script>
import axios from "@/axios";
import mixin from "@/mixins/quiz.js";
export default {
  name: "ItemQuiz",
  mixins: [mixin],
  components: {
    itemAutoComplete: () => import("@/components/utility/items/itemAutoComplete.vue"),
  },
  data() {
    return {
      randomItem: {},
      answer: { skipped: true, key: null, name: null },
    };
  },
  methods: {
    async startQuiz() {
      this.isQuizStarted = true;
      await this.getRandomItem();
      this.startTimer();
    },
    async getRandomItem() {
      try {
        let response = await axios.get("/randomitem");
        this.checkItemDuplicate(response.data);
      } catch (error) {
        console.log(error);
      }
    },
    checkItemDuplicate(item) {
      this.randomItem = { spell: {} };
      let items = this.answers.map((answer) => {
        return answer.key;
      });
      if (items.includes(item.key)) {
        console.log("HERE IS AN ITEM DUPLICAT");
        this.getRandomItem();
      } else {
        this.randomItem = item;
      }
    },
    async submitAnswer() {
      if (this.answers.length <= 10) {
        this.answers.push({ userAnswer: this.answer, correctAnswer: this.randomItem });
        if (this.answers.length <= 10) {
          clearInterval(this.timer);
          await this.getRandomItem();
          this.startTimer();
          this.resetAnswer();
        }
      }
      if (this.answers.length == 10) {
        clearInterval(this.timer);
      }
    },
    resetAnswer() {
      this.answer = { skipped: true, key: null, name: null };
      if (this.answers.length <= 10) {
        this.$children[0].reset();  
      }
    },
    itemSelected(item) {
      this.answer = item;
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
    justify-content: space-evenly;
    align-items: center;
    height: 100%;
    // padding: 2rem 0;
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
      color: rgb(252, 186, 19);
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
      gap: 4rem;
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
    }
  }
}
</style>
