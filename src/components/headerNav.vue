<template>
        <el-col :span="24" class='header'>
            <el-col :span="4" class='logo-container'>
              <!--  <a class="logo" href="#"><img src="../assets/images/Logo.png"></a> -->
            </el-col>
            <el-col :span="16"  :offset="4" >
                <el-menu   theme="dark" :default-active="$route.path" class="el-menu-demo" mode="horizontal" unique-opened  router>
                    <template
                            v-for="(item,index) in $router.options.routes"
                            v-if="!item.hidden">
                                <el-submenu
                                    :index="item.path"
                                    v-if="!item.leaf"
                                >
                                <template slot="title">{{item.name}} </template>
                                    <el-menu-item
                                        v-for='(child,cindex) in item.children'
                                        v-if="!child.hidden"
                                        :index='item.path+"/"+child.path'>
                                       {{child.name}}<!-- {{route.path+'/'+item.path+'/'+child.path}} -->
                                    </el-menu-item>
                                </el-submenu>
                                <!-- :index="item.path+'/'+item.children[0].path"-->
                                <el-menu-item v-if="item.leaf&&item.children.length>0" :index='item.children[0].path'  >
                                    {{item.name}}<!---->
                                </el-menu-item>
                        </template>
                </el-menu>
            </el-col>
            <el-col :span="4" class="userinfo">
                <el-dropdown trigger="hover">
                    <span class="el-dropdown-link userinfo-inner">
                    <!-- <img :src="this.sysUserAvatar" /> -->
                    <!-- {{sysUserName}} -->
                    admin
                    <i class="el-icon-caret-bottom el-icon--right"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                      <el-dropdown-item>我的消息</el-dropdown-item>
                      <el-dropdown-item>设置</el-dropdown-item>
                      <el-dropdown-item divided @click.native="logout">退出登录</el-dropdown-item>
                    </el-dropdown-menu>
                  </el-dropdown>
            </el-col>
        </el-col>
</template>

<script>
  export default {
    name:'llHeader',
    data() {
      return {

      }
    },
    methods: {
      //退出登录
      logout: function () {
        var _this = this;
        this.$confirm('确认退出吗?', '提示', {
          //type: 'warning'
        }).then(() => {
          sessionStorage.removeItem('user');
          _this.$router.push('/login');
        }).catch(() => {
        });
      }
    },
    mounted() {
    }
  }
</script>
<style scoped lang="scss">
    .header {
      height: 60px;
      line-height: 60px;
      background: #324157;
      color:#fff;
      .userinfo {
        text-align: right;
        padding-right: 35px;
        float: right;
        .userinfo-inner {
          cursor: pointer;
          color:#fff;
          img {
            width: 40px;
            height: 40px;
            border-radius: 20px;
            margin: 10px 0px 10px 10px;
            float: right;
          }
        }
      }
    }
</style> 