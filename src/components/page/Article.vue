<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>文章管理</el-breadcrumb-item>
        <el-breadcrumb-item>文章列表</el-breadcrumb-item>
        <el-breadcrumb-item>编辑文章</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="form-box">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="表单名称">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="选择器">
          <el-select v-model="form.region" placeholder="请选择">
            <el-option key="bbk" label="步步高" value="bbk"></el-option>
            <el-option key="xtc" label="小天才" value="xtc"></el-option>
            <el-option key="imoo" label="imoo" value="imoo"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="日期时间">
          <el-col :span="11">
            <el-date-picker type="date" placeholder="选择日期" v-model="form.date1" style="width: 100%;"></el-date-picker>
          </el-col>
          <el-col class="line" :span="2">-</el-col>
          <el-col :span="11">
            <el-time-picker type="fixed-time" placeholder="选择时间" v-model="form.date2"
                            style="width: 100%;"></el-time-picker>
          </el-col>
        </el-form-item>
        <el-form-item label="选择开关">
          <el-switch on-text="" off-text="" v-model="form.delivery"></el-switch>
        </el-form-item>
        <el-form-item label="多选框">
          <el-checkbox-group v-model="form.type">
            <el-checkbox label="步步高" name="type"></el-checkbox>
            <el-checkbox label="小天才" name="type"></el-checkbox>
            <el-checkbox label="imoo" name="type"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="单选框">
          <el-radio-group v-model="form.resource">
            <el-radio label="步步高"></el-radio>
            <el-radio label="小天才"></el-radio>
            <el-radio label="imoo"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="文本框">
          <editor v-bind:markdown="content_md"
                  v-bind:upload_uri="upload_uri"
          >
          </editor>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="onSubmit">提交</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>
    </div>

  </div>
</template>

<script>
  import editor from './Editor'

  export default {
    components: {
      editor
    },
    beforeMount() {
      this.getMarkdown()
    },
    data: function () {
      return {
        form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: true,
          type: ['步步高'],
          resource: '小天才',
          desc: ''
        },
        content_md: '',   // 默认填充的markdown数据
        upload_uri: 'http://localhost/php_server_demo/upload.php'   // 图片上传服务器地址
      }
    },
    methods: {
      getMarkdown() {
        this.$axios({
          url: 'http://localhost/blog/public/api/admin/article/edit/' + this.$route.params.id,
          method: 'get',
          headers: {
            'Authorization': 'Bearer ' + this.$auth.getToken(),
          }
        }).then(response => {
          let data = response.data.data
          return this.content_md = data.content_md
          return data.content_md
//          localStorage.setItem('admin', JSON.stringify())
//          this.$notify({
//            title: '成功',
//            message: '登陆成功',
//            type: 'success',
//            offset: 60
//          });
//          self.$router.push('/readme');
        }).catch(response => {
        });
      },
      onSubmit() {
        this.$message.success('提交成功！');
      }
    }
  }
</script>