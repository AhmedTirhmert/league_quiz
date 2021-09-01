<template>
  <div class="quiz-main">
    <start-quiz :quizType="'quotes'" />
  </div>
</template>

<script>
export default {
  name: "QuotQuiz",
  components: {
    StartQuiz: () => import("@/components/quiz/start.vue"),
  },
};
</script>

<style></style>