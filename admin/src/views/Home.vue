<template>
  <div class="home-container">
    <el-container class="home-container">
      <!-- 头部区域 -->
      <el-header>
        <div class="header">
          <div class="logo"> <img src="../assets/images/logo.jpg" alt=""> </div><span
            style="margin-left:20px">Co音乐后台管理系统</span>
        </div>
        <el-button type="info" @click="logout">退出</el-button>
      </el-header>
      <el-container>
        <!-- 侧边栏 -->
        <el-aside style="width:200px">
          <el-menu default-active="2" class="el-menu-vertical-demo" background-color="#333744" text-color="#fff"
            active-text-color="#ffd04b" router>

            <!-- 一级菜单 -->
            <el-submenu index="1">
              <template slot="title">
                <i class="iconfont icon-yonghu"  style="margin-right: 10px;font-size: 20px"></i>
                <span>用户管理</span>
              </template>
              <!-- 二级菜单 -->
              <el-menu-item index="/users"><i class="el-icon-menu"></i>用户列表</el-menu-item>


            </el-submenu>

            <!-- 一级菜单 -->
            <el-submenu index="2">
              <template slot="title">
                <i class="iconfont icon-ziyuan20" style="margin-right: 10px;font-size: 20px"></i>
                <span>歌单管理</span>
              </template>
              <!-- 二级菜单 -->
              <el-menu-item index="/songlist"><i class="el-icon-menu"></i>歌单列表</el-menu-item>
              <!-- <el-menu-item index="/songlistSongs"><i class="el-icon-menu"></i>歌曲列表</el-menu-item> -->
            </el-submenu>

            <!-- 一级菜单 -->
            <el-submenu index="3">
              <template slot="title">
                <i class="iconfont icon-guangchang" style="margin-right: 10px;font-size: 20px"></i>
                <span>广场管理</span>
              </template>
              <!-- 二级菜单 -->
              <el-menu-item index="/square"><i class="el-icon-menu"></i>广场列表</el-menu-item>
              <!-- <el-menu-item index="/songlistSongs"><i class="el-icon-menu"></i>歌曲列表</el-menu-item> -->
            </el-submenu>


            <!-- 一级菜单 -->
            <el-submenu index="4">
              <template slot="title">
                <i class="iconfont icon-shuju" style="margin-right: 10px;font-size: 18px"></i>
                <span>数据统计</span>
              </template>
              <!-- 二级菜单 -->
              <el-menu-item-group>
                <el-menu-item index="/data"><i class="el-icon-menu"></i>数据列表</el-menu-item>
              </el-menu-item-group>
            </el-submenu>

          </el-menu>
        </el-aside>

        <!-- 主体 -->
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        // 是否折叠
        isCollapse: false,
      }
    },
    methods: {
      logout() {
        window.sessionStorage.clear()
        this.$router.push('/login')
      },
    },

  }
</script>

<style lang="less" scoped>
  .header {
    display: flex;
    align-items: center;
  }

  .logo {
    width: 60px;
    margin-left: 20px;
  }

  .logo img {
    width: 100%;
  }

  .home-container {
    height: 100%;
  }

  .el-header {
    background-color: #373d41;
    display: flex;
    justify-content: space-between;
    padding-left: 0;
    align-items: center;
    color: #fff;
    font-size: 20px;
  }

  .el-aside {
    background-color: #333744;

    .el-menu {
      border-right: none;
    }
  }

  .el-main {
    background-color: #eaedf1;
  }
</style>