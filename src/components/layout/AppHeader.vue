<template>
  <header>
    <div class="logo"><p>League Quiz</p></div>
    <ul class="navigation">
      <li class="navigation-item">
        <router-link class="navigation-link" :to="{ name: 'Home' }"> Home </router-link>
      </li>
      <li class="navigation-item">
        <router-link class="navigation-link" :to="{ name: 'Skins', hash: '#skins' }">
          Skins
        </router-link>
      </li>
      <li class="navigation-item">
        <router-link class="navigation-link" :to="{ name: 'Quiz', hash: '#quiz' }">
          Quiz
        </router-link>
      </li>
    </ul>
  </header>
</template>
<script>
export default {
  name: "AppHeader",
  data: function () {
    return {};
  },
  mounted() {},
};
</script>
<style scoped lang="scss">
header {
  //   z-index: 4;
  display: flex;
  justify-content: space-between;
  padding: 0.5em 3em 0.5em 2em;
  background: linear-gradient(to right, #1d4350, #a43931);
  color: white;
  max-width: 100%;
  overflow: hidden;
  .logo {
    font-family: "Poppins";
    font-weight: 500;
    font-size: 1.5em;
    display: flex;
    align-items: center;
    text-transform: uppercase;
    p {
      margin: 0;
    }
  }
  .navigation {
    display: flex;
    list-style: none;
    gap: 2em;
    margin: 0;
    .navigation-item {
      cursor: pointer;
      position: relative;
      &::after {
        content: "";
        position: absolute;
        bottom: -15%;
        left: 50%;
        transform: translateX(-50%);
        width: 0;
        height: 4px;
        background: linear-gradient(to right, #e0eafc, #cfdef3);
        transition: ease-in-out 0.2s;
      }
      &::before {
        content: "";
        position: absolute;
        top: -15%;
        left: 50%;
        transform: translateX(-50%);
        width: 0;
        height: 4px;
        background: linear-gradient(to right, #e0eafc, #cfdef3);
        transition: ease-in-out 0.2s;
      }
      &:hover:after {
        width: 80%;
      }
      &:hover:before {
        width: 80%;
      }
      .navigation-link {
        display: block;
        padding: 1em 1.2em;
      }
    }
  }
}
</style>
