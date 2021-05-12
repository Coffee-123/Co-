<template>
    <div>
        <!-- 面包屑导航区域 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>歌单管理</el-breadcrumb-item>
            <el-breadcrumb-item>歌单歌曲列表</el-breadcrumb-item>
        </el-breadcrumb>

        <el-card>
            <el-button type="primary" @click="addDialogVisible = true">上传歌曲<i class="el-icon-upload el-icon--right"></i>
            </el-button>

            <el-table :data="songs" stripe style="width: 100%;margin-top:20px">
                <el-table-column prop="songname" label="歌曲名称" width="350">
                </el-table-column>
                <el-table-column prop="singer" label="歌手" width="180">
                </el-table-column>
                <el-table-column prop="Album" label="专辑" width="200">
                </el-table-column>
                <el-table-column prop="desc" label="描述">
                </el-table-column>

                <el-table-column prop="" label="操作">
                    <template v-slot="scope">
                        <!-- 修改按钮 -->
                        <el-button type="primary" icon="el-icon-edit" size="mini"
                            @click="showEditDialog(scope.row.songname)"></el-button>
                        <!-- 删除按钮 -->
                        <el-button type="danger" icon="el-icon-delete" size="mini"
                            @click="removeSong(scope.row.songname)"></el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-card>

        <!-- 添加歌曲对话框 -->
        <el-dialog title="添加歌曲" :visible.sync="addDialogVisible" width="50%" @close="addDialogClosed">
            <el-form :model="addForm" :rules="addFormRules" ref="addFormRef" label-width="100px">
                <el-form-item label="歌曲名" prop="songname">
                    <el-input v-model="addForm.songname "></el-input>
                </el-form-item>
                <el-form-item label="歌手" prop="singer">
                    <el-input v-model="addForm.singer "></el-input>
                </el-form-item>
                <el-form-item label="专辑" prop="Album">
                    <el-input v-model="addForm.Album "></el-input>
                </el-form-item>
                <el-form-item label="描述" prop="desc">
                    <el-input v-model="addForm.desc"></el-input>
                </el-form-item>

                <el-form-item label="歌曲" prop="songUrl" ref="songUrlRef">
                    <el-upload :action="this.devBaseUrl+'admin_songlist_songs/upload'" :on-remove="handleRemove"
                        :on-success="handleSuccess" :limit="1" ref="songUrlUpload">
                        <el-button size="small" type="primary">点击上传</el-button>
                        <div slot="tip" class="el-upload__tip">只能上传mp3文件</div>
                    </el-upload>
                </el-form-item>

                <el-form-item label="歌词" prop="lyricUrl" ref="lyricUrlRef">
                    <el-upload :action="this.devBaseUrl+'admin_songlist_songs/uploadLyric'" :on-remove="lyricRemove"
                        :on-success="lyricSuccess" :limit="1" ref="lyricUrlUpload">
                        <el-button size="small" type="primary">点击上传</el-button>
                        <div slot="tip" class="el-upload__tip">只能上传lrc文件</div>
                    </el-upload>
                </el-form-item>

                <el-form-item label="图片" prop="picUrl" ref="picUrlRef">
                    <el-upload :action="this.devBaseUrl+'admin_songlist_songs/uploadPic'" :on-remove="picRemove"
                        :on-success="picSuccess" :limit="1" ref="picUrlUpload">
                        <el-button size="small" type="primary">点击上传</el-button>
                        <div slot="tip" class="el-upload__tip">只能上传jpg文件</div>
                    </el-upload>
                </el-form-item>

            </el-form>
            <!-- 底部区域 -->
            <span slot="footer">
                <el-button @click="addDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="addSonglist">确 定</el-button>
            </span>
        </el-dialog>


        <!-- 修改歌曲信息的对话框 -->
        <el-dialog title="修改" :visible.sync="editDialogVisible" width="50%" @close="editDialogClosed">
            <el-form :model="editForm" :rules="editFormRules" ref="editFormRef" label-width="80px">
                <el-form-item label="歌曲名称">
                    <el-input v-model="editForm.songname" disabled></el-input>
                </el-form-item>
                <el-form-item label="歌手" prop="singer">
                    <el-input v-model="editForm.singer "></el-input>
                </el-form-item>
                <el-form-item label="专辑" prop="Album">
                    <el-input v-model="editForm.Album"></el-input>
                </el-form-item>
                <el-form-item label="描述" prop="desc">
                    <el-input v-model="editForm.desc"></el-input>
                </el-form-item>
            </el-form>

            <span slot="footer" class="dialog-footer">
                <el-button @click="editDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="editSongInfo">确 定</el-button>
            </span>
        </el-dialog>


    </div>
</template>

<script>
    export default {
        data() {
            return {
                songs: [],

                //添加歌单对话框
                addDialogVisible: false,
                //添加歌单
                addForm: {},
                //添加表单的验证规则对象
                addFormRules: {
                    songname: [{
                        required: true,
                        message: '请输入歌曲名',
                        trigger: 'blur'
                    }],
                    singer: [{
                        required: true,
                        message: '请输入歌手名称',
                        trigger: 'blur'
                    }],
                    Album: [{
                        required: true,
                        message: '请输入专辑名称',
                        trigger: 'blur'
                    }],
                    desc: [{
                        required: true,
                        message: '请输入歌曲描述',
                        trigger: 'blur'
                    }],
                    songUrl: [{
                        required: true,
                        message: '请上传歌曲',
                        trigger: 'blur'
                    }],
                    lyricUrl: [{
                        required: true,
                        message: '请上传歌词',
                        trigger: 'blur'
                    }],
                    picUrl: [{
                        required: true,
                        message: '请上传图片',
                        trigger: 'blur'
                    }]
                },

                //修改歌单对话框的显示与隐藏
                editDialogVisible: false,
                editForm: {},
                editFormRules: {
                    singer: [{
                        required: true,
                        message: '请输入歌手名称',
                        trigger: 'blur'
                    }],

                }


            }
        },

        created() {
            this.getSongs()
            // console.log(this.$route.params.songlistName)
        },

        methods: {
            async getSongs() {
                const {
                    data: res
                } = await this.$axios.get('admin_songlist_songs', {
                    params: {
                        songlistId: this.$route.params.id
                    }
                })
                if (res.meta.status === 200) {
                    // console.log(res.data)
                    this.songs = res.data
                }
            },

            // 添加歌曲
            addSonglist() {
                this.$refs.addFormRef.validate(async (valid) => {
                    if (!valid) return
                    this.addForm.songlistId = this.$route.params.id
                    const {
                        data: res
                    } = await this.$axios.post('admin_songlist_songs',
                        this.addForm
                    )
                    if (res.meta.status !== 200) {
                        return this.$message.error('上传歌曲失败')
                    } else {
                        this.addDialogVisible = false
                        this.$message.success('上传歌曲成功')
                        this.$refs.addFormRef.resetFields()
                        this.$refs.songUrlUpload.clearFiles()
                        this.$refs.picUrlUpload.clearFiles()
                        this.$refs.lyricUrlUpload.clearFiles()
                        this.addFormRules.songUrl = [{
                            required: true,
                            trigger: 'blur',
                            message: '请上传歌曲'
                        }]
                        this.addFormRules.lyricUrl = [{
                            required: true,
                            trigger: 'blur',
                            message: '请上传歌词'
                        }]
                        this.addFormRules.picUrl = [{
                            required: true,
                            trigger: 'blur',
                            message: '请上传图片'
                        }]
                        this.addForm = {}
                        this.getSongs()
                    }
                })

            },

            // 上传服务器后 想要删除
            async handleRemove(file, fileList) {
                // console.log(file.response.url)
                await this.$axios.delete('admin_songlist_songs/upload', {
                    params: {
                        songUrl: file.response.url
                    }
                })
                this.addForm.songUrl = ''
                this.addFormRules.songUrl = [{
                    required: true,
                    trigger: 'blur',
                    message: '请上传歌曲'
                }]
            },
            async lyricRemove(file, fileList) {
                // console.log(file.response.url)
                await this.$axios.delete('admin_songlist_songs/uploadLyric', {
                    params: {
                        lyricUrl: file.response.url
                    }
                })
                this.addForm.lyricUrl = ''
                this.addFormRules.lyricUrl = [{
                    required: true,
                    trigger: 'blur',
                    message: '请上传歌词'
                }]
            },
            async picRemove(file, fileList) {
                // console.log(file.response.url)
                await this.$axios.delete('admin_songlist_songs/uploadPic', {
                    params: {
                        picUrl: file.response.url
                    }
                })
                this.addForm.picUrl = ''
                this.addFormRules.picUrl = [{
                    required: true,
                    trigger: 'blur',
                    message: '请上传图片'
                }]
            },


            // 成功上传服务器后的函数
            handleSuccess(response, file, fileList) {
                // console.log(file.response.url)
                this.addForm.songUrl = file.response.url
                this.$refs.songUrlRef.clearValidate();
                this.addFormRules.songUrl = []
            },
            lyricSuccess(response, file, fileList) {
                // console.log(file.response.url)
                this.addForm.lyricUrl = file.response.url
                this.$refs.lyricUrlRef.clearValidate();
                this.addFormRules.lyricUrl = []
            },
            picSuccess(response, file, fileList) {
                // console.log(file.response.url)
                this.addForm.picUrl = file.response.url
                this.$refs.picUrlRef.clearValidate();
                this.addFormRules.picUrl = []
            },

            // 删除歌曲
            async removeSong(songname) {
                //弹框询问用户是否删除数据
                const confirmResult = await this.$confirm(
                    '此操作将永久删除该歌曲, 是否继续?',
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
                } = await this.$axios.delete('admin_songlist_songs', {
                    params: {
                        songname: songname,
                        songlistId: this.$route.params.id
                    }
                })
                // console.log(res)
                if (res.meta.status !== 200) {
                    return this.$message.error('删除歌曲失败!')
                }
                this.$message.success('删除歌曲成功!')
                this.getSongs()
            },

            // 打开修改对话框
            async showEditDialog(songname) {
                this.editDialogVisible = true
                const {
                    data: res
                } = await this.$axios.get('admin_songlist_songs/song', {
                    params: {
                        songname: songname
                    }
                })
                // console.log(res)
                this.editForm = res.data[0]

            },

            //确认修改歌曲信息
            editSongInfo() {
                this.$refs.editFormRef.validate(async (valid) => {
                    // console.log(valid)
                    if (!valid) return
                    const {
                        data: res
                    } = await this.$axios.put('admin_songlist_songs', this.editForm)
                    if (res.meta.status !== 200) {
                        return this.$message.error('修改失败')
                    } else {
                        this.editDialogVisible = false
                        this.$message.success('修改成功 ^-^')
                        this.getSongs()
                    }
                })
            },

            // 监听添加歌单对话框的关闭事件
            addDialogClosed() {
                this.$refs.addFormRef.resetFields()

                this.$refs.songUrlUpload.clearFiles()
                this.$refs.picUrlUpload.clearFiles()
                this.$refs.lyricUrlUpload.clearFiles()

            },

            // 监听修改歌单对话框的关闭事件
            editDialogClosed() {
                this.$refs.editFormRef.resetFields()
            },
        },
    }
</script>

<style lang="less" scoped>

</style>