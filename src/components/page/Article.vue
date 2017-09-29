<template>
  <div v-loading.body="loading">
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/articles' }">文章管理</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/articles' }">文章列表</el-breadcrumb-item>
        <el-breadcrumb-item>编辑文章</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="form-box">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="标题">
          <el-input v-model="form.title"></el-input>
        </el-form-item>
        <el-form-item label="摘要" prop="desc">
          <el-input type="textarea" v-model="form.summary"></el-input>
        </el-form-item>
        <el-form-item label="封面图">
          <el-upload
              name="cover"
              class="upload-cover"
              drag
              :multiple="false"
              :on-preview="handlePreview"
              :on-change="handleChange"
              :on-remove="handleRemove"
              :file-list="file_list"
              list-type="picture"
              :on-success="handleUploadSuccess"
              v-bind:action=" upload_action_cover"
          >
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
            <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>
        </el-form-item>
        <el-form-item label="文本框">
          <editor v-bind:markdown="form.content_md"
                  v-bind:upload_action_editor="upload_action_editor"
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
  import qs from 'qs';

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
          summary: '',
          recommend: '',
          status: '',
          content_md: '',
          cover_path: ''
        },
        upload_action_cover: this.$difines.root_url + '/api/admin/article/upload-cover',
        file_list: [],
        upload_action_editor: this.$difines.root_url + '/api/admin/article/upload-editor'   // 图片上传服务器地址
      }
    },
    methods: {
      getMarkdown() {
        this.$axios({
          url: this.$difines.root_url + '/api/admin/article/edit/' + this.$route.params.id,
          method: 'get',
          headers: {
            'Authorization': 'Bearer ' + this.$auth.getToken(),
          }
        }).then(response => {
          let data = response.data.data
          this.form = data
          this.form.recommend = data.recommend === 2 ? true : false
          this.form.status = data.status === 2 ? true : false
          this.form.cover_path = data.cover
          this.file_list.push({
            name: data.title,
            url: data.cover,
          })
          console.log(this.form)
          this.loading = false
        }).catch(response => {
        });
      },
      getEditorContent(data) {
        this.form.content_md = data.content_md
        this.form.content_html = data.content_html
      },
      handleChange(file, file_list) {
        this.file_list.splice(0)
        this.file_list.push(file)
      },
      handleRemove(file, file_list) {
        console.log(file)
        this.$axios({
          url: this.$difines.root_url + '/api/admin/article/upload-cover-del',
          method: 'post',
          headers: {
            'Authorization': 'Bearer ' + this.$auth.getToken(),
          },
          data: {
            cover_path: file.url
          }
        }).then(response => {
          if (response.data.code === 0) {
            this.$notify.error({
              title: '错误',
              message: '移除文件出错了'
            });
          }
        }).catch(response => {
        });
      },
      handlePreview(file) {
        console.log(file);
      },
      handleUploadSuccess(file, file_list) {
        this.form.cover_path = file.data.cover_path
      },
      onSubmit() {
        let data = this.form
        data.recommend = this.form.recommend ? 2 : 1
        data.status = this.form.status ? 2 : 1
        data.cover = this.form.cover_path
        console.log(data);
        this.$axios({
          url: this.$difines.root_url + '/api/admin/article/edit/' + data.id,
          method: 'put',
          headers: {
            'Authorization': 'Bearer ' + this.$auth.getToken(),
          },
          data: qs.stringify(data)
        }).then(response => {
          console.log(response.data)
          if (response.data.code === 0) {
            this.$notify.error({
              title: '错误',
              message: '移除文件出错了'
            });
          }
        }).catch(response => {
        });
        console.log(data)
        // this.$message.success('提交成功！');
      }
    }
  }
</script>
<style>
  .el-upload-dragger, .el-upload {
    width: 100%;
  }
</style>