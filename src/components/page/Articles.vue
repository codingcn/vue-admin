<template>
  <section class="main">
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>文章管理</el-breadcrumb-item>
        <el-breadcrumb-item>文章列表</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div>
      <el-table
          :data="tableData"
          style="width: 100%">
        <el-table-column type="expand">
          <template scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="文集">
                <span>{{ props.row.collection }}</span>
              </el-form-item>
              <el-form-item label="文章ID">
                <span>{{ props.row.id }}</span>
              </el-form-item>
              <el-form-item label="文集ID">
                <span>{{ props.row.collection_id }}</span>
              </el-form-item>
              <el-form-item label="点击量">
                <span>{{ props.row.page_views }}</span>
              </el-form-item>
              <el-form-item label="标签">
                <el-tag type="primary" v-for="item in props.row.tags" :key="item.id">{{ item.value }}</el-tag>
              </el-form-item>
              <el-form-item label="是否推荐">
                <span>{{ props.row.recommend }}</span>
              </el-form-item>
              <el-form-item label="创建时间">
                <span>{{ props.row.created_at }}</span>
              </el-form-item>
              <el-form-item label="发布时间">
                <span>{{ props.row.published_at }}</span>
              </el-form-item>
              <el-form-item label="描述">
                <span>{{ props.row.description }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column
            label="文章 ID"
            prop="id">
        </el-table-column>
        <el-table-column
            label="标题"
            prop="title">
        </el-table-column>
        <el-table-column
            label="作者"
            prop="username">
        </el-table-column>
        <el-table-column
            label="状态"
            prop="status">
        </el-table-column>
        <el-table-column
            label="更新时间"
            prop="updated_at">
        </el-table-column>
        <el-table-column label="操作">
          <template scope="scope">
            <el-button
                size="small"
                @click="handleEdit(scope.$index, scope.row)">编辑
            </el-button>
            <el-button
                size="small"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)">删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </section>
</template>

<script type="text/ecmascript-6">
  export default {
    data() {
      return {
        tableData: [
          {
            id: 1,
            title: '你们别学了，我跟不上了',
            collection_id: '3',
            collection: 'laravel passport认证',
            tags: [
              {
                id:3,
                value: 'laravel'
              },
              {
                id:1,
                value: '可爱'
              },
              {
                id:2,
                value: 'passport'
              }
            ],
            description: '在 Laravel 中，实现基于传统表单的登陆和授权已经非常简单，但是如何满足 API 场景下的授权需求呢？在 API 场景里通常通过令牌来实现用户授权，而非维护请求之间的 Session 状态。在 Laravel 项目中使用 Passport 可以轻而易举地实现 API 授权认证，Passport 可以在几分钟之内为你的应用程序提供完整的 OAuth2 服务端实现。Passport 是基于由 Alex Bilbie 维护的 League OAuth2 server 建立的。',
            username: '上海市普陀区真北路',
            status: '草稿',
            recommend: '否',
            page_views: 12,
            created_at: '2周前',
            published_at: '2周前',
            updated_at: '1周前'
          },
          {
            id: 2,
            title: '你们别学了，我跟不上了',
            collection_id: '3',
            collection: 'laravel passport认证',
            tags: [
              {
                0: 'laravel',
                1: '可爱',
                2: 'passport'
              }
            ],
            description: '在 Laravel 中，实现基于传统表单的登陆和授权已经非常简单，但是如何满足 API 场景下的授权需求呢？在 API 场景里通常通过令牌来实现用户授权，而非维护请求之间的 Session 状态。在 Laravel 项目中使用 Passport 可以轻而易举地实现 API 授权认证，Passport 可以在几分钟之内为你的应用程序提供完整的 OAuth2 服务端实现。Passport 是基于由 Alex Bilbie 维护的 League OAuth2 server 建立的。',
            username: '上海市普陀区真北路',
            status: '草稿',
            recommend: '否',
            page_views: 55,
            created_at: '2周前',
            published_at: '2周前',
            updated_at: '1周前'
          }
        ]
      }
    },
    methods: {
      handleEdit(index, row) {
        console.log(index)
        console.log(row)
        this.$router.push({name: 'article', params: {id: row.id}})
      },
      handleDelete(index, row) {

      }
    }
  }
</script>

<style>
  .el-tag {
    margin-right: 0.8rem;
  }

  .demo-table-expand {
    font-size: 0;
  }

  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }

  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
</style>

