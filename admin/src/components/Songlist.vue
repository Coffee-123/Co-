<template>
    <div>
        <!-- 面包屑导航区域 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>歌单管理</el-breadcrumb-item>
            <el-breadcrumb-item>歌单列表</el-breadcrumb-item>
        </el-breadcrumb>

        <el-card>
            <el-row :gutter="20">
                <el-col :span="8">
                    <el-input placeholder="请输入歌单名" v-model="queryInfo.query" clearable>
                        <el-button slot="append" icon="el-icon-search" @click="getSonglist"></el-button>
                    </el-input>
                </el-col>
                <el-col :span="4">
                    <el-button type="primary" @click="addDialogVisible = true">添加歌单</el-button>
                </el-col>
            </el-row>

            <el-table :data="tableData" height="333" border style="width: 100%;margin-top:20px">
                <el-table-column type="index" label="#">
                </el-table-column>
                <el-table-column prop="songlistTitle" label="歌单标题" width="280">
                </el-table-column>
                <!-- <el-table-column prop="desc" label="歌单描述" width="180">
                </el-table-column> -->


                <!-- <el-table-column prop="briefIntroduction" label="简介">
                </el-table-column> -->
                <el-table-column prop="label" label="标签">
                    <template v-slot="scope">
                        <el-tag type="success">{{scope.row.label}}</el-tag>
                    </template>
                </el-table-column>
                <el-table-column prop="createTime" label="创建时间">
                    <template v-slot="scope">
                        {{scope.row.createTime  | dateFormat }}
                    </template>
                </el-table-column>
                <el-table-column label="操作">
                    <template v-slot="scope">
                        <!-- 修改按钮 -->
                        <el-button type="primary" icon="el-icon-edit" size="mini"
                            @click="showEditDialog(scope.row._id)"></el-button>
                        <!-- 删除按钮 -->
                        <el-button type="danger" icon="el-icon-delete" size="mini"
                            @click="removeSonlist(scope.row._id)"></el-button>
                        <!-- 歌曲管理 -->
                        <el-button type="success" size="mini" @click="songsManage(scope.row._id)">歌曲管理
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>

            <!-- 分页 -->
            <div class="pagination" style="margin-top:20px">
                <el-pagination background @current-change='handleCurrentChange' :current-page='queryInfo.pagenum'
                    :page-size='queryInfo.pagesize' layout='total,prev,pager,next,jumper' :total='total'>
                </el-pagination>
            </div>
        </el-card>


        <!-- 添加用户对话框 -->
        <el-dialog title="添加歌单" :visible.sync="addDialogVisible" width="50%" @close="addDialogClosed">
            <el-form :model="addForm" :rules="addFormRules" ref="addFormRef" label-width="120px">
                <!-- <el-form-item label="songlistName" prop="songlistName">
                    <el-input v-model="addForm.songlistName "></el-input>
                </el-form-item> -->
                <!-- <el-form-item label="描述" prop="desc">
                    <el-input v-model="addForm.desc "></el-input>
                </el-form-item> -->
                <el-form-item label="歌单标题" prop="songlistTitle">
                    <el-input v-model="addForm.songlistTitle "></el-input>
                </el-form-item>
                <el-form-item label="标签" prop="label">
                    <el-input v-model="addForm.label "></el-input>
                </el-form-item>
                <el-form-item label="简介" prop="briefIntroduction">
                    <el-input v-model="addForm.briefIntroduction"></el-input>
                </el-form-item>

                <el-form-item label="歌单图片" prop="picUrl" ref="picUrlRef">

                    <el-upload :action="this.devBaseUrl+'admin_songlist/upload'" ref="songlistUpload"
                        :on-remove="handleRemove" :on-success="handleSuccess" :limit="1">
                        <el-button size="small" type="primary">点击上传</el-button>
                        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                    </el-upload>

                </el-form-item>
            </el-form>
            <!-- 底部区域 -->
            <span slot="footer">
                <el-button @click="addDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="addSonglist">确 定</el-button>
            </span>
        </el-dialog>

        <!-- 修改歌单的对话框 -->
        <el-dialog title="修改歌单信息" :visible.sync="editDialogVisible" width="50%" @close="editDialogClosed">
            <el-form :model="editForm" :rules="editFormRules" ref="editFormRef" label-width="80px">
                <!-- <el-form-item label="歌单名">
                    <el-input v-model="editForm.songlistName" disabled></el-input>
                </el-form-item> -->
                <!-- <el-form-item label="描述" prop="desc" disabled>
                    <el-input v-model="editForm.desc "></el-input>
                </el-form-item> -->
                <el-form-item label="歌单标题" prop="songlistTitle">
                    <el-input v-model="editForm.songlistTitle"></el-input>
                </el-form-item>
                <el-form-item label="标签" prop="label">
                    <el-input v-model="editForm.label"></el-input>
                </el-form-item>
                <el-form-item label="简介" prop="briefIntroduction">
                    <el-input v-model="editForm.briefIntroduction"></el-input>
                </el-form-item>
            </el-form>

            <span slot="footer" class="dialog-footer">
                <el-button @click="editDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="editSonglistInfo">确 定</el-button>
            </span>
        </el-dialog>

        <!-- 歌曲管理的对话框 -->
        <el-dialog title="歌单管理" :visible.sync="songsDialogVisible" width="70%">
            <span>歌曲管理</span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="songsDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="songsDialogVisible = false">确 定</el-button>
            </span>
        </el-dialog>


    </div>
</template>

<script>
    export default {
        data() {
            return {
                tableData: [],
                queryInfo: {
                    query: '',
                    pagenum: 1, //当前页数
                    pagesize: 5 //每页条数
                },
                total: 0, //总条目数

                //添加歌单对话框
                addDialogVisible: false,
                //添加歌单
                addForm: {},
                //添加表单的验证规则对象
                addFormRules: {
                    // songlistName: [{
                    //     required: true,
                    //     message: '请输入歌单名',
                    //     trigger: 'blur'
                    // }],
                    // desc: [{
                    //     required: true,
                    //     message: '请输入歌单描述',
                    //     trigger: 'blur'
                    // }],
                    songlistTitle: [{
                        required: true,
                        message: '请输入歌单标题',
                        trigger: 'blur'
                    }],
                    label: [{
                        required: true,
                        message: '请输入标签',
                        trigger: 'blur'
                    }],
                    briefIntroduction: [{
                        required: true,
                        message: '请输入歌单简介',
                        trigger: 'blur'
                    }],
                    picUrl: [{
                        required: true,
                        message: '请上传歌单图片',
                        trigger: 'blur'
                    }],
                },



                //修改歌单对话框的显示与隐藏
                editDialogVisible: false,
                editForm: {},
                // 修改表单的验证规则对象
                editFormRules: {
                    songlistTitle: [{
                            required: true,
                            message: '请输入歌单标题',
                            trigger: 'blur'
                        },

                    ],
                    label: [{
                            required: true,
                            message: '请输入歌单标签',
                            trigger: 'blur'
                        },

                    ],
                    briefIntroduction: [{
                        required: true,
                        message: '请输入歌单简介',
                        trigger: 'blur'
                    }]
                },

                //修改歌曲管理对话框的显示与隐藏
                songsDialogVisible: false
            }
        },
        created() {
            this.getSonglist()
        },
        methods: {
            async getSonglist() {
                let {
                    data: res
                } = await this.$axios.get('admin_songlist', {
                    params: {
                        current: this.queryInfo.pagenum,
                        size: this.queryInfo.pagesize,
                        query: this.queryInfo.query
                    }
                })
                console.log(res.data)
                this.tableData = res.data
                this.total = res.total
            },
            // 分页
            handleCurrentChange(val) {
                this.queryInfo.pagenum = val;
                this.getSonglist()
            },

            // 删除歌单
            async removeSonlist(id) {
                //弹框询问用户是否删除数据
                const confirmResult = await this.$confirm(
                    '此操作将永久删除该歌单, 是否继续?',
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

                const {
                    data: res
                } = await this.$axios.delete('admin_songlist', {
                    params: {
                        id: id
                    }
                })
                // console.log(res)
                if (res.meta.status !== 200) {
                    return this.$message.error('删除歌单失败!')
                }
                this.$message.success('删除歌单成功!')
                this.getSonglist()
            },

            // 展示歌单编辑的对话框(查询歌单信息)
            async showEditDialog(id) {
                const {
                    data: res
                } = await this.$axios.get('admin_songlist/songlistInfo', {
                    params: {
                        id: id
                    }
                })
                if (res.meta.status !== 200) {
                    return this.$message.error('查询用户信息失败!')
                }
                // console.log(res.data)
                this.editForm = res.data[0]
                // console.log(this.editForm)
                this.editDialogVisible = true
            },

            // 添加歌单
            addSonglist() {
                this.$refs.addFormRef.validate(async (valid) => {
                    // console.log(valid)
                    if (!valid) return
                    const {
                        data: res
                    } = await this.$axios.post('admin_songlist',
                        this.addForm
                    )
                    //    console.log(res)
                    if (res.meta.status !== 200) {
                        if (res.meta.status === 409) {
                            return this.$message.error('歌单已存在,请换一个歌单名')
                        }

                        return this.$message.error('添加歌单失败')
                    } else {
                        this.$message.success('歌单添加成功!')
                        this.addDialogVisible = false
                        this.$refs.songlistUpload.clearFiles()
                        this.addFormRules.picUrl = [{ required: true, trigger: 'blur', message: '请上传歌单图片' }]
                        this.getSonglist()
                    }
                })
            },


            // 修改歌单信息
            async editSonglistInfo() {
                this.$refs.editFormRef.validate(async (valid) => {
                    // console.log(valid)
                    if (!valid) return

                    const {
                        data: res
                    } = await this.$axios.put('admin_songlist',
                        this.editForm
                    )

                    if (res.meta.status !== 200) {
                        return this.$message.error('修改失败！')
                    } else {
                        this.$message.success('修改歌单信息成功')
                    }

                    this.editDialogVisible = false
                    this.getSonglist()

                })
            },


            // 监听添加歌单对话框的关闭事件
            addDialogClosed() {
                this.$refs.addFormRef.resetFields()
                this.addFormRules.picUrl = [{ required: true, trigger: 'blur', message: '请上传歌单图片' }]
            },

            // 监听修改歌单对话框的关闭事件
            editDialogClosed() {
                this.$refs.editFormRef.resetFields()
            },

            // 上传服务器后 想要删除
            async handleRemove(file, fileList) {
                // console.log(file.response.url)
                await this.$axios.delete('admin_songlist/upload', {
                    params: {
                        PicUrl: file.response.url
                    }
                })
                this.addForm.picUrl = ''
                  this.addFormRules.picUrl = [{
                            required: true,
                            trigger: 'blur',
                            message: '请上传歌单图片'
                        }]
            },

            // 成功上传服务器后的函数
            handleSuccess(response, file, fileList) {
                // console.log(file.response.url)
                this.addForm.picUrl = file.response.url
                //清除歌单图片验证规则
                this.addFormRules.picUrl = []
                this.$refs.picUrlRef.clearValidate();
            },

            // 点击歌单管理按钮
            songsManage(id) {
                this.songsDialogVisible = true
                this.$router.push({
                    name: 'songlistSongs',
                    params: {
                        id: id
                    }
                })
                // console.log(songlistName)
            }
        },


    }
</script>