<template>
  <section class="start-main">
    <div v-if="!isCountdownStarted">
      <div class="start-title">
        <h1>
          Welcome to the <b>{{ quizType }}</b> quiz
        </h1>
      </div>
      <div class="start-desc">
        <p>let's see how many spells you actually know</p>
      </div>
      <div class="start-action">
        <button class="start-btn" @click="startCountdown">start quiz</button>
      </div>
    </div>
    <span v-else class="start-countdown" ref="countdown"></span>
  </section>
</template>

<script>
export default {
  name: "QuizStart",
  props: {
    quizType: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      isCountdownStarted: false,
    };
  },
  methods: {
    startCountdown() {
      this.isCountdownStarted = true;
      this.$nextTick(() => {
        let sec = 3;
        let x = setInterval(() => {
          this.$refs.countdown.innerHTML = sec;
          sec--;
          if (sec < 0) {
            clearInterval(x);
            this.$refs.countdown.innerHTML = "READY";
            setTimeout(() => {
              this.$emit("startQuiz");
            }, 1000);
          }
        }, 1000);
      });
    },
  },
};
</script>

<style lang="scss" scoped>
* {
  margin: 0;
}
.start-main {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 1.5em;
  .start-title {
    h1 {
      font-size: 3em;
      margin-bottom: 0em;
      text-transform: uppercase;
      b {
        color: goldenrod;
      }
    }
  }
  .start-desc {
    font-size: 1.3em;
    margin-bottom: 1em;
  }
  .start-action {
    .start-btn {
      outline: none;
      border: none;
      padding: 0.7em 4em;
      font-size: 1.2em;
      font-weight: 700;
      text-transform: uppercase;
      background: goldenrod;
      color: black;
      cursor: pointer;
      transition: ease-in-out 0.2s;
      &:hover {
        transform: scale(1.08);
        background: black;

        color: goldenrod;
      }
    }
  }
  .start-countdown {
    font-size: 7em;
    font-weight: 800;
    color: goldenrod;
    letter-spacing: 0.2em;
  }
}
</style>
