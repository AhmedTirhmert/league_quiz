<template>
  <div class="champion-dropdown" ref="championDropdown">
    <div class="selected-champion" @click="toggleDropdown">
      <img class="champion-tile" :src="selectedChampion.tile" alt="" />
      <div class="champion-details">
        <p class="name">
          {{ selectedChampion.name }}
        </p>
        <p class="title">
          {{ selectedChampion.title }}
        </p>
      </div>
      <span><i ref="icon" class="fas fa-chevron-down"></i></span>
    </div>
    <div class="all-champions">
      <div
        v-for="champ in champions"
        :key="champ.id"
        class="champion-card"
        @click="loadChampionSkins(champ.id)"
      >
        <img class="champion-tile" :src="champ.tile" alt="" />
        <div class="champion-details">
          <p class="name">
            {{ champ.name }}
          </p>
          <p class="title">
            {{ champ.title }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "@/axios";
export default {
  name: "CahpionDropdown",
  props: {},
  data() {
    return {
      champions: null,
      selectedChampion: {
        tile: null,
      },
    };
  },
  async mounted() {
    await this.loadChampionsNames();
    this.setDefaultChampion();
  },
  methods: {
    setDefaultChampion() {
      this.selectedChampion = this.champions[0];
    },
    setSelectedChampion(championId) {
      let selectedChampion = this.champions.findIndex((champ) => champ.id === championId);
      this.selectedChampion = this.champions[selectedChampion];
    },
    async loadChampionsNames() {
      try {
        let response = await axios.get("championsData");
        this.champions = response.data;
      } catch (error) {
        console.error(error);
      }
    },
    toggleDropdown() {
      this.$refs.championDropdown.classList.toggle("active");
      this.$refs.icon.classList.toggle("rotate");
    },
    loadChampionSkins(champId) {
      this.$emit("loadChampSkins", champId);
      this.setSelectedChampion(champId);
      this.toggleDropdown()
    },
  },
};
</script>

<style lang='scss'>
.active {
  height: 90vh !important;
  box-shadow: none !important;
}
.rotate {
  transform: rotateZ(-180deg);
}
.champion-dropdown {
  z-index: 2;
  background: rgba($color: #141516, $alpha: 0.99);
  min-width: 200px;
  max-width: 350px;
  overflow: hidden;
  height: 80px;
  position: absolute;
  top: 5vh;
  left: 1vw;
  border-radius: 10px;
  box-shadow: 0px 0px 4px 2px #3d3d3dc2;
  transition: ease-in-out 0.4s;
  .selected-champion {
    padding: 10px 20px;
    display: flex;
    gap: 10px;
    background: rgba($color: #141516, $alpha: 0.9);
    box-shadow: 1px -1px 12px 3px #888888c2;
    position: relative;
    z-index: 4;
    cursor: pointer;
    .champion-tile {
      width: 60px;
      height: 60px;
      border-radius: 50%;
    }
    .champion-details {
      display: flex;
      flex-direction: column;
      text-align: left;
      line-height: 1.7em;
      .name {
        font-size: 1.5rem;
        font-weight: 600;
        margin: 0;
      }
      .title {
        margin: 0;
        color: rgb(192, 192, 192);
        font-style: italic;
      }
    }
    span {
      position: absolute;
      right: 8%;
      top: 50%;
      transform: translateY(-50%);
      font-size: 1.3em;
      cursor: pointer;
      i {
        transition: transform ease-in-out 0.5s;
      }
    }
  }
  .all-champions {
    z-index: 3;
    overflow: scroll;
    height: calc(100% - 60px);
    .champion-card {
      padding: 10px 20px;
      display: flex;
      gap: 10px;
      cursor: pointer;
      .champion-tile {
        width: 60px;
        height: 60px;
        border-radius: 50%;
      }
      .champion-details {
        display: flex;
        flex-direction: column;
        text-align: left;
        line-height: 1.7em;
        //   justify-content: space-between;
        // padding: ;
        //   font-family: "Besley";
        .name {
          font-size: 1.4rem;
          font-weight: 500;
          margin: 0;
        }
        .title {
          margin: 0;
          color: rgb(192, 192, 192);
          font-style: italic;
        }
      }
      &:hover {
        background: rgba($color: #414141, $alpha: 1);
      }
    }
    /* width */
    &::-webkit-scrollbar {
      width: 7px;
    }

    /* Track */
    &::-webkit-scrollbar-track {
      background: #f1f1f1;
    }

    /* Handle */
    &::-webkit-scrollbar-thumb {
      background: #888;
    }

    /* Handle on hover */
    &::-webkit-scrollbar-thumb:hover {
      background: #555;
    }
  }
}
@media (min-width: 374px) and (max-width: 1024px) {
  .champion-dropdown {
    left: 0;
    top: unset;
    bottom: 0;
    width: 100vw;
    max-width: 100vw;
  }
}
</style>