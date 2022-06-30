<template>
  <div class="end-main">
    <h1>QUIZ COMPLETED</h1>

    <div class="results">
      <div class="result-table">
        <table>
          <thead>
            <tr>
              <th></th>
              <th>Correct answer</th>
              <th>Your answer</th>
            </tr>
          </thead>

          <tbody v-if="quizType == 'Spells'">
            {{resultss}}
            <tr v-for="(result, index) in results" :key="index">
              <th rowspan="2">
                <div class="answer-image">
                  <img :src="result.correctAnswer.spell.image" alt="" />
                </div>
              </th>
              <td class="correct">
                {{ result.correctAnswer.champion.name }}
              </td>
              <td :class="isAnswerCorrect(result, true)">
                {{ result.userAnswer.champion.name | capitalize }}
              </td>
            </tr>
            <tr>
              <td class="correct">{{ result.correctAnswer.spell.letter }}</td>
              <td :class="isAnswerCorrect(result)">
                {{ result.userAnswer.spellLetter }}
              </td>
            </tr>
          </tbody>
          <tbody v-else-if="quizType == 'Quotes'">
            <tr v-for="(result, index) in results" :key="index">
              <th>
                <div class="answer-image">
                  <h5 class="quote">{{ result.correctAnswer.quote | trim(30) }}</h5>
                </div>
              </th>
              <td class="correct">
                {{ result.correctAnswer.champion.name }}
              </td>
              <td :class="isAnswerCorrect(result, true)">
                {{ result.userAnswer.champion.name | capitalize }}
              </td>
            </tr>
          </tbody>
          <tbody v-else>
            <tr v-for="(result, index) in results" :key="index">
              <th>
                <div class="answer-image">
                  <img v-if="quizType == 'Items'" :src="result.correctAnswer.image" alt="" />
                </div>
              </th>
              <td v-if="quizType == 'Items'" class="correct">
                {{ result.correctAnswer.name }}
              </td>
              <td v-if="quizType == 'Items'" :class="isAnswerCorrect(result, true)">
                {{ result.userAnswer.name | capitalize }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="result-score">
        <h1>Your Score is :</h1>
        <div class="result-circle">
          <p class="score">
            <span>{{ score }}</span
            >%
          </p>
          <svg viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg">
            <circle
              id="score-circle"
              cx="50%"
              cy="90%"
              r="33"
              :stroke="scoreCircleColor"
              :style="{ transform: this.score == 100 ? 'translateY(-55%)' : 'translateY(-45%)' }"
            />
          </svg>
        </div>
        <h1 class="score-caption">{{ scoreTitle }}</h1>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "endQuiz",
  props: {
    quizType: {
      type: String,
      required: true,
      default: null,
    },
    results: {
      type: Array,
      required: true,
      default: null,
    },
  },
  data() {
    return { score: 0 };
  },
  mounted() {
    this.calculateTotalScore();
    this.fillTotalScoreCircle();
    console.log(this.results);
  },
  methods: {
    isAnswerCorrect(answer, championOrSpell = false) {
      if (this.quizType == "Spells") {
        if (championOrSpell) {
          return answer.correctAnswer.champion.key == answer.userAnswer.champion.key
            ? "correct"
            : "incorrect";
        } else {
          return answer.correctAnswer.spell.letter == answer.userAnswer.spellLetter
            ? "correct"
            : "incorrect";
        }
      } else if (this.quizType == "Quotes") {
        return answer.correctAnswer.champion.key == answer.userAnswer.champion.key
          ? "correct"
          : "incorrect";
      } else {
        return answer.correctAnswer.key == answer.userAnswer.key ? "correct" : "incorrect";
      }
    },
    calculateAnswerScore(answer) {
      let score = 0;
      if (this.quizType == "Spells") {
        let championScore =
          answer.correctAnswer.champion.key == answer.userAnswer.champion.key ? true : false;
        let spellScore =
          answer.correctAnswer.spell.letter == answer.userAnswer.spellLetter ? true : false;
        score = championScore && spellScore ? 1 : 0;
        return score * 10;
      } else if (this.quizType == "Quotes") {
        return answer.correctAnswer.champion.key == answer.userAnswer.champion.key ? 10 : 0;
      } else {
        return answer.correctAnswer.key == answer.userAnswer.key ? 10 : 0;
      }
    },
    calculateTotalScore() {
      this.results.forEach((answer) => {
        this.score += this.calculateAnswerScore(answer);
      });
      this.score = Math.round(this.score);
    },
    fillTotalScoreCircle() {
      // const circle = document.querySelector("#score-circle");
      // const circleDasharray = parseInt(window.getComputedStyle(circle).strokeDasharray);
      // circle.style.strokeDashoffset = `${circleDasharray - (this.score * circleDasharray) / 100}px`;
    },
  },
  filters: {
    capitalize(value) {
      return value.charAt(0).toUpperCase() + value.toLowerCase().slice(1);
    },
    trim(value, count) {
      return `${value.slice(0, count - 3)}...`;
    },
  },
  computed: {
    scoreCircleColor() {
      switch (true) {
        case this.score == 100:
          return "#63ff00";
        case this.score < 100 && this.score >= 75:
          return "#d6ff00";
        case this.score < 75 && this.score >= 50:
          return "#ffff00";
        case this.score < 50 && this.score >= 25:
          return "#ffc100";
        case this.score < 25 && this.score >= 0:
          return "#ff0000";
        default:
          return "#daa520";
      }
    },
    scoreTitle() {
      switch (true) {
        case this.score == 100:
          return "CHALLENGER";
        case this.score < 100 && this.score >= 75:
          return "MASTER";
        case this.score < 75 && this.score >= 50:
          return "DIAMOND";
        case this.score < 50 && this.score >= 25:
          return "GOLD";
        case this.score < 25 && this.score >= 0:
          return "IRON";
        default:
          return "#daa520";
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.end-main {
  height: 100%;
  padding: 2rem 0rem;
  h1 {
    margin: 0;
    font-size: 2.5rem;
    color: goldenrod;
  }
  .results {
    display: flex;
    justify-content: space-between;
    max-height: 70vh;
    padding: 1rem 4rem;
    .result-table {
      max-height: 100%;
      max-width: 60%;
      overflow: scroll;
      table {
        font-size: 0.9rem;
        border-collapse: collapse;
        height: 100%;
        width: 100%;
        thead {
          tr {
            th,
            td {
              padding: 0.5rem 0rem;
              border: 1px solid goldenrod;
              letter-spacing: 1px;
              &:nth-child(1) {
                border: none;
              }
            }
          }
        }
        tbody {
          tr {
            th,
            td {
              padding: 0.1em 4em;
              border: 0.2px solid rgba(218, 165, 32, 0.555);
            }
            th {
              padding: 0.3rem;
              .answer-image {
                display: flex;
                align-items: center;
                justify-content: center;
                img {
                  border-radius: 6px;
                  box-shadow: 0px 0px 5px 1px rgba(0, 0, 0, 0.534);
                }
              }
              &:nth-child(1) {
                border: none;
                border: 0.2px solid rgba(190, 190, 190, 0.555);
              }
            }
          }
        }
        .correct {
          background: rgba($color: #47ba30, $alpha: 0.35);
        }
        .incorrect {
          background: rgba($color: #ed143d, $alpha: 0.35);
        }
      }
    }
    .result-score {
      display: flex;
      justify-content: space-between;
      gap: 1rem;
      flex-direction: column;
      align-items: center;
      h1 {
        color: white;
      }
      .result-circle {
        position: relative;
        svg {
          overflow: visible;
          position: absolute;
          display: block;
          top: 0;
          left: 0;
          width: 100%;
          circle {
            display: block;
            fill: transparent;
            // stroke: goldenrod;
            stroke-width: 0.35rem;
            stroke-dasharray: 208px;
            stroke-dashoffset: 208px;
            stroke-linecap: round;
            transition: linear 1s;
            // transform: translateY(-45%);
          }
        }
        .score {
          font-size: 2rem;
          margin: 0;
          width: 100%;
          height: 100%;
          span {
            margin: 0;
            font-size: 7rem;
            letter-spacing: 0.5rem;
            font-weight: 700;
          }
        }
      }
      .score-caption {
      }
    }
  }
}
</style>
