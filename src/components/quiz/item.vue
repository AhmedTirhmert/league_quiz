<template>
  <div class="quiz-main">
    <start-quiz :quizType="'items'" />
  </div>
</template>

<script>
export default {
  name: "ItemsQuiz",
  components: {
    StartQuiz: () => import("@/components/quiz/start.vue"),
  },
};
</script>

<style></style>
