<template>
  <div class="champion-auto-complete">
    <div class="selected-champion">
      <img v-if="selectedChampion.tile" :src="selectedChampion.tile" alt="" />
      <input
        type="text"
        class="champion-name-input"
        placeholder="champion name"
        @input="filterChampions"
        v-model="championInput"
        @keypress.enter.prevent="selectFirstResult"
      />
    </div>
    <div class="matched-champions">
      <div
        v-for="champion in filtredChampions"
        :key="champion.key"
        class="champion"
        @click="selectChampion(champion)"
      >
        <img :src="champion.tile" alt="" />
        <p>{{ champion.name }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "@/axios";
export default {
  name: "ChampionAutoComplete",
  data() {
    return {
      champions: new Array(),
      filtredChampions: new Array(),
      championInput: new String(),
      selectedChampion: new Object(),
    };
  },
  async mounted() {
    await this.loadChampions();
  },
  methods: {
    async loadChampions() {
      const response = await axios.get("loadAutoCompleteChampions");
      console.log(response);
      this.champions = response.data;
    },
    filterChampions() {
      if (!this.championInput) {
        this.resetSelectedChampion();
      }
      let toto = this.champions.filter((champion) => {
        if (
          this.championInput != "" &&
          champion.id.toLowerCase().startsWith(this.championInput.toLowerCase())
        ) {
          return champion;
        }
      });
      this.filtredChampions = toto;
    },
    reset() {
      this.resetSelectedChampion();
    },
    resetFilter() {
      this.filtredChampions = new Array();
    },
    resetSelectedChampion() {
      this.resetFilter();
      this.championInput = null;
      this.selectedChampion = new Object();
    },
    selectChampion(champion) {
      this.selectedChampion = {
        key: champion.key,
        name: champion.name,
        tile: champion.tile,
      };
      this.championInput = this.selectedChampion.name;
      this.$emit("championSelected", this.selectedChampion);
      this.resetFilter();
    },
    selectFirstResult() {
      if (this.filtredChampions.length > 0) this.selectChampion(this.filtredChampions[0]);
    },
  },
  watch: {
    selectedChampion: (newVal) => {
      console.log(newVal.key);
      const matchedChampions = document.querySelector(".matched-champions");
      if (newVal.key != null) {
        matchedChampions.style.width = "77%";
      } else {
        matchedChampions.style.width = "93%";
      }
    },
  },
};
</script>

<style lang="scss">
.champion-auto-complete {
  position: relative;
  width: 100%;
  .matched-champions {
    position: absolute;
    width: 92%;
    right: 0;
    bottom: 100%;
    margin: 0rem 1.25rem;
    background: #000000dc;
    border-top-left-radius: 15px;
    border-top-right-radius: 15px;
    transition: ease-in-out 1s;
    max-height: 45vh;
    overflow-y: scroll;
    overflow-x: hidden;
    .champion {
      display: flex;
      padding: 0.5rem 1rem 0.5rem 1rem;
      gap: 1rem;
      align-items: center;
      cursor: pointer;
      img {
        border-radius: 50%;
        width: 50px;
      }
      p {
        margin: 0;
        font-size: 1.4rem;
        letter-spacing: 2px;
        font-weight: 500;
        color: darkgray;
      }
      &:hover {
        background: #555555af;
        p {
          color: white;
        }
        &:first-child {
          border-top-left-radius: 15px;
        }
      }
    }
    /* width */
    &::-webkit-scrollbar {
      display: block;
      width: 7px;
    }
    /* Track */
    &::-webkit-scrollbar-track {
      background: #1a1a1adc;
      border-top-right-radius: 15px;
      margin-top: 10px;
    }
    /* Handle */
    &::-webkit-scrollbar-thumb {
      background: rgb(199, 199, 199);
      border-radius: 15px;
    }
    /* Handle on hover */
    &::-webkit-scrollbar-thumb:hover {
      background: #555;
    }
  }
  .selected-champion {
    display: flex;
    gap: 0.8em;
    align-items: center;

    img {
      box-shadow: 0px 0px 10px 2px rgb(133, 132, 132);
      height: 50px;
      border-radius: 50%;
    }
    .champion-name-input {
      width: 100%;
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
  }
}
</style>
