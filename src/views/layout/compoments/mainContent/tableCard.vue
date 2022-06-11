<template>
  <div class="layoutTabCard">
    <el-tabs
    class="el-col el-col-24" 
      v-model="editableTabsValue"
      type="card"
      :closable="isClose"
      @tab-remove="removeTab"
      @tab-click="clickTab"
    >
      <el-tab-pane
      class="el-col el-col-24" 
        v-for="item in editableTabs"
        :key="item.name"
        :label="item.title"
        :name="item.name"
      >
        <span slot="label" @click.right.prevent="openMenu(item, $event)">{{
          item.title
        }}</span>
      </el-tab-pane>
    </el-tabs>
    <ul
      v-show="visible"
      :style="{ left: left + 'px', top: top + 'px' }"
      class="contextmenu"
    >
      <li @click="closeOthersTags(editableTabsValue)">关闭其它</li>
      <!-- <li @click="closeAllTags" v-if="editableTabs.length>1">关闭所有</li> -->
    </ul>
  </div>
</template>

<script>
// import bus from "@/utils/bus";
import { mapState, mapGetters } from "vuex";

export default {
  data() {
    return {
      editableTabsValue: "0",
      editableTabs: [],
      tabIndex: 0,
      isClose: true, //是否可关闭
      visible: false,
      top: 0,
      left: 0,
      selectedTag: {},
      lists:[]
    };
  },
  computed: {
    ...mapState({
      // addTabCardLists: state => state.tabCard.addTabCardList
    })
  },
  mounted() {
    if (
      this.$route.path == "/" ||
      this.$route.path == "/productedManagement/finishedProductCoding"||this.$route.path == "/materialManagement/encode"
    ) {
    } else {
      let newData = {
        label: this.$route.name,
        name: this.$route.path
      };
      setTimeout(() => {
        this.addTab(this.editableTabsValue, newData);
        this.clickTab(newData);
      });
    }
  },
  methods: {
    // 添加tabs
    addTab(targetName, data) {
      if (data.label == "noPermission") {
      } else {
        let newTabName;
        let isAdd = true;
        if (this.editableTabs.length == 0) {
          newTabName = ++this.tabIndex + "";
          this.editableTabs.push({
            title: data.label,
            name: newTabName,
            content: data.name,
            index: this.tabIndex
          });
        } else {
          this.editableTabs.forEach((item, index) => {
            if (item.title == data.label) {
              isAdd = false;
              // newTabName = (index + 1).toString()
              newTabName = item.index.toString();
            }
          });
          if (isAdd == true) {
            newTabName = ++this.tabIndex + "";
            this.editableTabs.push({
              title: data.label,
              name: newTabName,
              content: data.name,
              index: this.tabIndex
            });
          }
        }
        this.editableTabsValue = newTabName;
        if (this.editableTabs.length > 0) {
          this.isClose = true;
        }
      }
    },
    // 删除tabs
    removeTab(targetName) {
      let tabs = this.editableTabs;
      let activeName = this.editableTabsValue;
      let activeNames = activeName;
      if (activeName === targetName) {
        tabs.forEach((tab, index) => {
          if (tab.name === targetName) {
            let nextTab = tabs[index + 1] || tabs[index - 1];

            if (nextTab) {
              activeName = nextTab.name;
              this.$router.replace(nextTab.content);
              // this.$store.dispatch("addMenuCard", nextTab.content);
            } else {
              activeName = "0";
              this.$router.replace("/personalHomePage/individualTasks");
              // this.$store.dispatch(
              //   "addMenuCard",
              //   "/personalHomePage/individualTasks"
              // );
            }
          }
        });
        this.editableTabsValue = activeName;
      } else {
      }
      this.editableTabs = tabs.filter(tab => tab.name !== targetName);
      if (this.editableTabs.length == 1) {
        this.isClose = false;
      }
    },

    clickTab(targetName, event) {
      if (targetName.label == "noPermission") {
      } else {
        // this.$store.dispatch("addTabCard", {
        //   name: targetName.name,
        //   label: targetName.label
        // });
        let tabpath = targetName.$route;
        // bus.$emit("tabPath", targetName.$route);
        this.editableTabs.forEach((item, index) => {
          if (item.title == targetName.label) {
            // this.$store.dispatch("addMenuCard", item.content);
            this.$router.replace(item.content);
          }
        });
      }
    },
    // 右键
    openMenu(tag, e) {
      const menuMinWidth = 115;
     
      const offsetLeft = this.$el.getBoundingClientRect().left; // container margin left
      const offsetWidth = this.$el.offsetWidth; // container width
      const maxLeft = offsetWidth - menuMinWidth; // left boundary
      const left = e.clientX - offsetLeft + 220; // margin right

      if (left > maxLeft) {
        this.left = maxLeft;
      } else {
        this.left = left;
      }

      this.top = 100; //e.clientY
      this.visible = true;
      this.selectedTag = tag;
    },
    closeMenu() {
      this.visible = false;
    },
    // 关闭其它
    closeOthersTags(data) {
      this.editableTabs.forEach((item, index) => {
        if (
          item.index.toString() == this.selectedTag.name ||
          item.title == "警告审核"
        ) {
        } else {
          this.removeTab(item.index.toString());
        }
      });
    },
    flatten(arr) {
      if(Array.isArray(arr)){
        arr.forEach((item,index)=>{
          if(item.children){
            this.lists.push(item)
            this.flatten(item)
          }else{
            this.lists.push(item)
          }
        })
      }else{
        arr.children.forEach((item,index)=>{
          if(item.children){
            this.lists.push(item)
            this.flatten(item)
          }else{
            this.lists.push(item)
          }
        })
      }
    },
    // 关闭所有
    closeAllTags() {
      this.editableTabs.forEach((item, index) => {
        this.removeTab(item.index.toString());
      });
      this.flatten(JSON.parse(localStorage.getItem('getRoutesLists')))
      // this.addTab("0", {
      //   label: "警告审核",
      //   name: "/personalHomePage/individualTasks"
      // });
      // this.addTab("0", {
      //   label: this.lists[1].label,
      //   name: this.lists[1].resourcePath,
      // });
    }
  },
  watch: {
    addTabCardLists(newData) {
      this.addTab(this.editableTabsValue, newData);
    },
    visible(value) {
      if (value) {
        document.body.addEventListener("click", this.closeMenu);
      } else {
        document.body.removeEventListener("click", this.closeMenu);
      }
    }
  }
};
</script>

<style scoped rel="stylesheet/stylus" lang="stylus">
>>>.el-tabs__nav .el-tabs__item:nth-child(1) .el-icon-close{
  display: none !important;
}
.layoutTabCard {
  border-bottom: 1px solid #e5e5e5;
  height: 50px;
  line-height: 50px;
  // position: fixed;
  left: 201px;
  top: 50px;
  right: 0;
  background: #fff;
  z-index: 1000;
  transition: 0.25s;
  /*user-select: none;*/

  // 右键
  .contextmenu {
    margin: 0;
    background: #fff;
    z-index: 3000;
    position: absolute;
    list-style-type: none;
    padding: 5px 0;
    border-radius: 4px;
    font-size: 12px;
    font-weight: 400;
    color: #333;
    box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, .3);
    width: 100px;
    text-align:center;
    line-height: 40px;
    li {
      margin: 0;
      /*padding: 7px 16px;*/
      cursor: pointer;
      &:hover {
        background: #eee;
      }
    }
  }
}
</style>
