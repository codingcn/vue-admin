<template>
  <div v-loading.body="loading">
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
        <el-form-item label="标题">
          <el-input v-model="form.title"></el-input>
        </el-form-item>
        <el-form-item label="文本框">
          <editor v-bind:markdown="form.content_md"
                  v-bind:upload_uri="upload_uri"
                  v-on:getEditorContent="getEditorContent"
          >
          </editor>
        </el-form-item>
        <el-form-item label="推荐">
          <el-switch on-text="on" off-text="off" v-model="form.recommend"></el-switch>
        </el-form-item>
        <el-form-item label="立即发布">
          <el-switch on-text="on" off-text="off" v-model="form.status"></el-switch>
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
        loading: true,
        form: {
          title: '',
          region: '',
          recommend: '',
          status: '',
          content_md: ''
        },        
        upload_uri: 'http://localhost/blog/public/api/admin/article/upload-editor'   // 图片上传服务器地址
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
          this.form = data
          this.form.recommend=data.recommend===2?true:false
          this.form.status=data.status===2?true:false
          this.loading=false
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
      getEditorContent(data) {
        this.form.content_md=data.content_md
        this.form.content_html=data.content_html
      },
      onSubmit() {
        let data=this.form
        data.recommend=this.form.recommend?2:1
        data.status=this.form.statu?2:1
        console.log(data)
        // this.$message.success('提交成功！');
      }
    }
  }
</script>