<template>
  <div class="m-topbar">
    <div class="m-topbar-left">
      <div
        class="m-toggle-btn"
        @click="toggleSidebar"
      >
        <i class="fas fa-bars"></i>
      </div>
    </div>
    <div class="m-topbar-right">
      <div class="m-view">
        <div class="m-view-link">
          <div class="m-view-link-text">
            {{$t('layout.view')}}
          </div>
          <div class="m-view-link-arrow">
            <i class="el-icon-arrow-down"></i>
          </div>
        </div>
        <div class="m-view-panel-box">
          <div class="m-view-panel">
            <ul class="m-view-list">
              <li
                v-for="(item,index) in companylist"
                :key="index"
              >{{item.name}}</li>
            </ul>
          </div>
        </div>
      </div>
      <div class="m-language">
        <div class="m-language-link">
          <div class="m-language-link-text">
            {{$t('layout.language')}}
          </div>
          <div class="m-language-link-arrow">
            <i class="el-icon-arrow-down"></i>
          </div>
        </div>
        <div class="m-language-panel-box">
          <div class="m-language-panel">
            <ul class="m-language-list">
              <li
                v-if="language === 'zh_CN'"
                @click="handleSetLanguage('en')"
              >ENGLISH</li>
              <li
                v-if="language === 'en'"
                @click="handleSetLanguage('zh_CN')"
              >简体中文</li>
            </ul>
          </div>
        </div>
      </div>
      <div class="m-user">
        <div class="m-user-link">
          <div class="m-user-link-img">
            <img
              :src="this.avatar"
              alt=""
            >
          </div>
          <div class="m-user-link-text">
            {{this.name}}
          </div>
          <div class="m-user-link-arrow">
            <i class="el-icon-arrow-down"></i>
          </div>
        </div>
        <div class="m-user-panel-box">
          <div class="m-user-panel">
            <ul class="m-user-list">
              <li>{{$t('layout.personalCenter')}}</li>
              <li @click="handleLogout">{{$t('layout.logout')}}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import { getCompanyList } from "@/api/layout";
export default {
  created() {
    this.getCompanyList();
  },
  data() {
    return {
      companylist: null
    };
  },
  computed: {
    ...mapGetters(["language", "name", "avatar"])
  },
  methods: {
    ...mapActions(["toggleSidebar", "setLanguage", "logout"]),
    getCompanyList() {
      getCompanyList()
        .then(res => {
          this.companylist = res.data.companylist;
        })
        .catch(err => {
          console.log(err);
        });
    },
    handleSetLanguage: function(language) {
      this.setLanguage(language);
      this.$i18n.locale = language;
      window.location.reload();
    },
    handleLogout: function() {
      this.logout().then(() => {
        window.location.reload();
      });
    }
  }
};
</script>
<style lang="stylus" scoped>
@import '../../../../style/variables.styl'
// 布局
.m-topbar
  height 48px
  background-color $white0
  display flex
  border-bottom 1px solid $border0
  padding-right 20px
.m-topbar-left
  display flex
.m-topbar-right
  flex 1
  display flex
  justify-content flex-end
  border-right 1px solid $border0
// 侧栏收缩
.m-toggle-btn
  width 48px
  text-align center
  border-right 1px solid $border0
  line-height 48px
  cursor pointer
// 视角
.m-view
  position relative
  border-left 1px solid $border0
  cursor pointer
  &:hover .m-view-panel
    max-height 1000px
    transition all 0.2s
  &:hover .m-view-link-arrow
    transform rotate(-180deg)
    transition all 0.2s
.m-view-link
  padding 0 20px
  line-height 48px
  display flex
.m-view-link-arrow
  margin-left 10px
  transition all 0.2s
.m-view-panel-box
  position absolute
  top 48px
  right 0
  padding-top 10px
.m-view-panel
  color $white0
  background-color $base5
  max-height 0
  transition all 0.2s
  overflow hidden
  box-shadow 0 2px 12px 0 rgba(0, 0, 0, 0.1)
.m-view-list
  li
    line-height 48px
    padding 0 20px
    text-align center
    white-space nowrap
    &:hover
      color $white0
      background-color $base6
// 语言
.m-language
  position relative
  border-left 1px solid $border0
  cursor pointer
  &:hover .m-language-panel
    max-height 1000px
    transition all 0.2s
  &:hover .m-language-link-arrow
    transform rotate(-180deg)
    transition all 0.2s
.m-language-link
  padding 0 20px
  line-height 48px
  display flex
.m-language-link-arrow
  margin-left 10px
  transition all 0.2s
.m-language-panel-box
  position absolute
  top 48px
  right 0
  padding-top 10px
.m-language-panel
  color $white0
  background-color $base5
  max-height 0
  transition all 0.2s
  overflow hidden
  box-shadow 0 2px 12px 0 rgba(0, 0, 0, 0.1)
.m-language-list
  li
    line-height 48px
    padding 0 20px
    text-align center
    white-space nowrap
    &:hover
      color $white0
      background-color $base6
// 用户
.m-user
  position relative
  border-left 1px solid $border0
  cursor pointer
  &:hover .m-user-panel
    max-height 1000px
    transition all 0.2s
  &:hover .m-user-link-arrow
    transform rotate(-180deg)
    transition all 0.2s
.m-user-link
  padding 0 20px
  line-height 48px
  display flex
.m-user-link-img
  width 30px
  height 30px
  border-radius 50%
  border 1px solid $border0
  margin 9px 0
  overflow hidden
  img
    display block
    width 100%
    min-height 100%
.m-user-link-text
  margin-left 10px
.m-user-link-arrow
  margin-left 10px
  transition all 0.2s
.m-user-panel-box
  position absolute
  top 48px
  right 0
  padding-top 10px
.m-user-panel
  color $white0
  background-color $base5
  max-height 0
  transition all 0.2s
  overflow hidden
  box-shadow 0 2px 12px 0 rgba(0, 0, 0, 0.1)
.m-user-list
  li
    line-height 48px
    padding 0 20px
    text-align center
    white-space nowrap
    &:hover
      color $white0
      background-color $base6
</style>