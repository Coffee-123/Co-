<template>
    <div>
        <!-- 面包屑导航区域 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>广场管理</el-breadcrumb-item>
            <el-breadcrumb-item>广场列表</el-breadcrumb-item>
        </el-breadcrumb>

        <el-card>
            <el-table :data="tableData" height="500" border style="width: 100%;">
                <el-table-column type="index" label="#">
                </el-table-column>
                <el-table-column prop="username" label="用户账号" width="150">
                </el-table-column>
                <el-table-column prop="desc" label="用户描述" width="250">
                </el-table-column>

                <el-table-column label="歌曲">
                    <template v-slot="scope">
                        <!-- {{scope.row.songUrl }} -->
                        <audio :src="scope.row.songUrl" controls="controls"></audio>
                    </template>
                </el-table-column>
                <el-table-column prop="createTime" label="创建时间" width="200">
                    <template v-slot="scope">
                        {{scope.row.createTime  | dateFormat }}
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="200">
                    <template v-slot="scope">
                        <!-- 修改按钮 -->
                        <!-- <el-button type="primary" icon="el-icon-edit" size="mini"
                            @click="showEditDialog(scope.row._id)"></el-button> -->
                        <!-- 删除按钮 -->
                        <el-button type="danger" icon="el-icon-delete" size="mini" @click="removeSong(scope.row._id)">
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>





        </el-card>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                tableData: []
            }
        },
        created() {
            this.getSquareSong()
        },
        methods: {
            async getSquareSong() {
                let {
                    data: res
                } = await this.$axios.get('admin_square')
                console.log(res.data)
                for(var i=0;i<res.data.length;i++){
                    res.data[i].songUrl = this.devBaseUrl + res.data[i].songUrl 
                }

                this.tableData = res.data

            },
            async removeSong(id) {
                   //弹框询问用户是否删除数据
                const confirmResult = await this.$confirm(
                    '此操作将永久删除此歌曲, 是否继续?',
                    '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning',
                    }
                ).catch((err) => err) //捕获用户取消行为

                // 如果用户确认删除用户返回字符串 confirm
                //如果用户取消删除 返回值为字符串 cancel
                // console.log(confirmResult)
                if (confirmResult !== 'confirm') {
                    return this.$message.info('已取消删除')
                }

                let {
                    data: res
                } = await this.$axios.delete('admin_square', {
                    params: {
                        id: id
                    }
                })
                //    console.log(res)
                if (res.meta.status === 200) {
                    this.$message.success('删除成功！')
                    this.getSquareSong()
                }
            }
        },
    }
</script>

<style lang="less" scoped>

</style>