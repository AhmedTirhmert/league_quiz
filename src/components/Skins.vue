<template>
  <section
    class="containner"
    :style="{ backgroundImage: `url(${currentSkin.splash})` }"
    id="skins"
  >
    <!-- <img class="skin-splash" :src="currentSkin.splash" alt="aatrox" /> -->
    <h1 class="welcoming">LEAGUE QUIZ</h1>
    <champion-drop-down @loadChampSkins="loadChampSkins" />
    <span class="glassyBlur"></span>
    <div class="controls" @click="prevSkin">
      <span class="prev">
        <i class="fas fa-arrow-left"></i>
      </span>
    </div>

    <div class="champs">
      <p class="skinName">{{ currentSkin.name }}</p>
      <div class="image">
        <img class="loading" :src="currentSkin.loading" alt="aatrox" />
      </div>
    </div>
    <div class="controls" @click="nextSkin">
      <span class="next">
        <i class="fas fa-arrow-right"></i>
      </span>
    </div>
  </section>
</template>

<script>
import axios from "@/axios";
export default {
  name: "Skins",
  components: {
    ChampionDropDown: () => import("@/components/utility/champions/championDropDown.vue"),
  },
  data() {
    return {
      currentSkin: {
        loading: null,
        tile: null,
        splash: null,
        index: 0,
        name: null,
      },
      champion: null,
    };
  },
  async mounted() {
    await this.getChampData();
    this.defaultSkin();
  },
  methods: {
    incrementIndex() {
      if (this.currentSkin.index >= 0 && this.currentSkin.index < this.champion.skins.length - 1) {
        this.currentSkin.index += 1;
      } else if (this.currentSkin.index == this.champion.skins.length - 1) {
        this.currentSkin.index = 0;
      }
    },
    decrementIndex() {
      if (this.currentSkin.index > 0 && this.currentSkin.index <= this.champion.skins.length - 1) {
        this.currentSkin.index -= 1;
      } else if (this.currentSkin.index == 0) {
        this.currentSkin.index = this.champion.skins.length - 1;
      }
    },
    resetIndex() {
      this.currentSkin.index = 0;
    },
    loadSkin() {
      this.currentSkin.loading = this.champion.skins[this.currentSkin.index].loading;
    },
    loadSplash() {
      this.currentSkin.splash = this.champion.skins[this.currentSkin.index].splash;
    },
    loadTile() {
      this.currentSkin.tile = this.champion.skins[this.currentSkin.index].tile;
    },
    loadSkinName() {
      this.currentSkin.name = this.champion.skins[this.currentSkin.index].name;
    },
    defaultSkin() {
      this.resetIndex();
      this.loadSkin();
      this.loadSplash();
      this.loadTile();
      this.loadSkinName();
    },
    nextSkin() {
      this.incrementIndex();
      this.loadSkin();
      this.loadSplash();
      this.loadTile();
      this.loadSkinName();
    },
    prevSkin() {
      this.decrementIndex();
      this.loadSkin();
      this.loadSplash();
      this.loadTile();
      this.loadSkinName();
    },
    slideShow() {
      setInterval(() => {
        this.nextSkin();
      }, 2000);
    },
    async getChampData() {
      try {
        let response = await axios.get();
        this.champion = response.data;
      } catch (error) {
        console.log(error);
      }
    },
    async loadChampSkins(champId) {
      let response = await axios.get(`/championSkins/${champId}`);
      this.champion = response.data;
      this.defaultSkin();
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
.containner {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  background-size: cover;
  background-position: center;
  color: white;
  position: relative;

  .welcoming {
    position: absolute;
    left: -12%;
    top: 50%;
    padding: 0;
    margin: 0;
    font-size: 4rem;
    transform: translateY(-50%) rotate(90deg);
    z-index: 2;
  }
  .glassyBlur {
    position: absolute;
    width: 100%;
    height: 100%;
    background: #000;
    opacity: 0.7;
    mix-blend-mode: darken;
  }
  .skin-splash {
    display: none;
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100%;
    filter: blur(5px);
  }
  h1 {
    font-size: 1.4rem;
    z-index: 1;
    margin: 0;
  }
  .champs {
    display: flex;
    flex-direction: column;
    z-index: 1;
    height: 95vh;
    .skinName {
      min-width: max-content;
      font-family: "Poppins";
      font-size: 1.6em;
      line-height: 1px;
      font-weight: 500;
      text-transform: uppercase;
    }
    .image {
      img {
        height: 85vh;
        &::selection {
          background: transparent;
        }
      }
      .loading {
        margin: 1em 0 1em 0;
        transition: ease-in-out 0.5s;
      }
    }
  }
  .controls {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    position: relative;
    .tile {
      position: absolute;
      bottom: -40%;
      left: 50%;
      width: 80px;
      border-radius: 50%;
      transform: translateX(-50%);
      border: 4px solid rgb(0, 0, 0);
    }
    span {
      cursor: pointer;
      font-size: 1.6rem;
      // padding: 0.5em;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      align-self: center;
      justify-self: center;
      .play {
        background: #fff;
        color: #000;
      }
    }
  }
}
@media (max-width: 414px) {
  .welcoming {
    display: none;
  }
}
</style>
