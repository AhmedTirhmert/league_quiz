<template>
  <div class="quiz-main">
    <start-quiz :quizType="'Vocals'" />
  </div>
</template>

<script>
export default {
  name: "PassiveQuiz",
  components: {
    StartQuiz: () => import("@/components/quiz/start.vue"),
  },
};
</script>

<style></style>
