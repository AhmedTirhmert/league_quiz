const mixin = {
  components: {
    StartQuiz: () => import("@/components/quiz/start.vue"),
    EndQuiz: () => import("@/components/quiz/end.vue"),
  },
  data() {
    return {
      loadingImageSrc:
        "https://media3.giphy.com/media/3oEjI6SIIHBdRxXI40/giphy.gif?cid=ecf05e47pkhri3a1tad77ppt90jolm2sko55j9drip9bcqo6&rid=giphy.gif&ct=g",
      isQuizStarted: false,
      answers: [],
      timer: null,
    };
  },
  mounted() {
    clearInterval(this.timer);
    // console.log("this is mounted from mixin");
  },
  beforeDestroy() {
    clearInterval(this.timer);
  },
  methods: {
    startTimer(seconds = 13) {
      let timer = seconds;
      let coef = 100 / timer;
      this.timer = setInterval(() => {
        this.$refs.countDownBar.style.width = `${coef * timer}%`;
        timer--;
        if (timer < 0) {
          clearInterval(this.timer);
          this.$refs.countDownBar.style.width = `100%`;
          this.submitAnswer();
        }
      }, 1000);
    },
  },
  computed: {
    answersCounter: function () {
      return this.answers.length + 1;
    },
    isQuizFinished: function () {
      return this.answers.length == 10;
    },
  },
};
export default mixin;
