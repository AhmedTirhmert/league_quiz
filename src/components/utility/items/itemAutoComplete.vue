<template>
  <div class="Item-auto-complete">
    <div class="selected-Item">
      <img v-if="selectedItem.tile" :src="selectedItem.tile" alt="" />
      <input
        type="text"
        class="Item-name-input"
        placeholder="Item name"
        @input="filterItems"
        v-model="ItemInput"
        @keypress.enter.prevent="selectFirstResult"
      />
    </div>
    <div class="matched-Items">
      <div v-for="Item in filtredItems" :key="Item.key" class="Item" @click="selectItem(Item)">
        <p>{{ Item.name }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "@/axios";
export default {
  name: "ItemAutoComplete",
  data() {
    return {
      Items: new Array(),
      filtredItems: new Array(),
      ItemInput: new String(),
      selectedItem: new Object(),
    };
  },
  mounted() {
    this.loadItems();
  },
  methods: {
    async loadItems() {
      const response = await axios.get("loadAutoCompleteItems");
      this.Items = response.data;
    },
    filterItems() {
      if (this.ItemInput == null || this.ItemInput.trim() == "") {
        this.resetSelectedItem();
        return;
      }
      let toto = this.Items.filter((Item) => {
        if (
          this.ItemInput != null &&
          Item.name.toLowerCase().startsWith(this.ItemInput.toLowerCase())
        ) {
          return Item;
        }
      });
      this.filtredItems = toto;
    },
    reset() {
      this.resetSelectedItem();
    },
    resetFilter() {
      this.filtredItems = new Array();
    },
    resetSelectedItem() {
      this.resetFilter();
      this.ItemInput = null;
      this.selectedItem = new Object();
    },
    selectItem(Item) {
      this.selectedItem = Item;
      this.ItemInput = this.selectedItem.name;
      this.$emit("itemSelected", this.selectedItem);
      this.resetFilter();
    },
    selectFirstResult() {
      if (this.filtredItems.length > 0) this.selectItem(this.filtredItems[0]);
    },
  },
  watch: {},
};
</script>

<style lang="scss">
.Item-auto-complete {
  position: relative;
  width: 100%;
  .matched-Items {
    position: absolute;
    width: 89%;
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
    .Item {
      padding: 0.7rem 2rem 0.6rem 1.5rem;
      cursor: pointer;
      text-align: left;
      p {
        margin: 0;
        font-size: 1.2rem;
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
  .selected-Item {
    display: flex;
    gap: 0.8em;
    align-items: center;

    img {
      box-shadow: 0px 0px 10px 2px rgb(133, 132, 132);
      height: 50px;
      border-radius: 50%;
    }
    .Item-name-input {
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
