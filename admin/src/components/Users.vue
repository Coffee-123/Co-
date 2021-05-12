<template>
    <div>
        <!-- 面包屑导航区域 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>用户管理</el-breadcrumb-item>
            <el-breadcrumb-item>用户列表</el-breadcrumb-item>
        </el-breadcrumb>


        <el-card>
            <!-- 搜索 -->
            <el-row :gutter="20">
                <el-col :span="8">
                    <el-input placeholder="请输入用户名" v-model="queryInfo.query" clearable>
                        <el-button slot="append" icon="el-icon-search" @click="getUserList"></el-button>
                    </el-input>
                </el-col>
                <!-- 添加用户 -->
                <el-col :span="4">
                    <el-button type="primary" @click="addDialogVisible = true">添加用户</el-button>
                </el-col>
            </el-row>

            <!-- 表格 -->
            <el-table :data="tableData" height="313" border style="width: 100%;margin-top:20px">
                <el-table-column type="index" label="#"></el-table-column>
                <el-table-column prop="username" label="用户名" width="200">
                </el-table-column>
                <el-table-column prop="nickname" label="昵称" width="200">
                </el-table-column>
                <el-table-column prop="vip" label="是否为VIP会员" width="200">
                    <template v-slot="scope">
                        <!-- {{scope.row.vip}} -->
                        <el-switch v-model="scope.row.vip" @change="changeVip(scope.row)">
                        </el-switch>
                        <!-- <el-tag v-if="scope.row.vip===false" type="info" size="mini">否</el-tag>
                        <el-tag v-else type="warning" size="mini">是</el-tag> -->
                    </template>
                </el-table-column>
                <el-table-column prop="createTime" label="注册时间">
                    <template v-slot="scope">
                        {{scope.row.createTime  | dateFormat }}
                    </template>
                </el-table-column>
                <!-- 操作 -->
                <el-table-column prop="address" label="操作" width="300">
                    <template v-slot="scope">
                        <!-- 修改按钮 -->
                        <el-button type="primary" icon="el-icon-edit" size="mini"
                            @click="showEditDialog(scope.row.username)">编辑</el-button>
                        <!-- 删除按钮 -->
                        <el-button type="danger" icon="el-icon-delete" size="mini"
                            @click="removeUser(scope.row.username)">删除</el-button>
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
        <!-- 
        close	Dialog 关闭的回调 
        visible	是否显示 Dialog，支持 .sync 修饰符
        -->
        <el-dialog title="添加用户" :visible.sync="addDialogVisible" width="50%" @close="addDialogClosed">
            <!-- 内容主体区域 -->
            <!-- 
            rules	表单验证规则
            -->
            <el-form :model="addForm" :rules="addFormRules" ref="addFormRef" label-width="70px">
                <el-form-item label="用户名" prop="username">
                    <el-input v-model="addForm.username"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input v-model="addForm.password"></el-input>
                </el-form-item>
            </el-form>
            <!-- 底部区域 -->
            <span slot="footer">
                <el-button @click="addDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="addUser">确 定</el-button>
            </span>
        </el-dialog>


        <!-- 修改用户的对话框 -->
        <el-dialog title="修改用户信息" :visible.sync="editDialogVisible" width="50%" @close="editDialogClosed">
            <el-form :model="editForm" :rules="editFormRules" ref="editFormRef" label-width="80px">
                <el-form-item label="用户名">
                    <el-input v-model="editForm.username" disabled></el-input>
                </el-form-item>
                <el-form-item label="昵称" prop="nickname">
                    <el-input v-model="editForm.nickname"></el-input>
                </el-form-item>
                <el-form-item label="vip" prop="vip">
                    <el-input v-model="editForm.vip"></el-input>
                </el-form-item>
                <el-form-item label="个性签名" prop="desc">
                    <el-input v-model="editForm.desc "></el-input>
                </el-form-item>

            </el-form>

            <span slot="footer" class="dialog-footer">
                <el-button @click="editDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="editUserInfo">确 定</el-button>
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

                // 添加用户对话框的显示与隐藏
                addDialogVisible: false,
                // 添加用户的表单数据
                addForm: {
                    username: '',
                    password: '',
                },

                //修改用户对话框的显示与隐藏
                editDialogVisible: false,
                // 查询到的用户信息对象
                editForm: {},


                // 添加用户表单的验证规则对象
                addFormRules: {
                    username: [{
                            required: true,
                            message: '请输入用户名',
                            trigger: 'blur'
                        },
                        {
                            min: 3,
                            max: 10,
                            message: '用户名长度在3~10个字符之间',
                            trigger: 'blur',
                        },
                    ],
                    password: [{
                            required: true,
                            message: '请输入密码',
                            trigger: 'blur'
                        },
                        {
                            min: 6,
                            max: 15,
                            message: '密码长度在6~15个字符之间',
                            trigger: 'blur',
                        },
                    ],
                },

                // 修改表单的验证规则对象
                editFormRules: {
                    nickname: [{
                            required: true,
                            message: '请输入昵称',
                            trigger: 'blur'
                        },

                    ],
                    desc: [{
                            required: true,
                            message: '请输入个性签名',
                            trigger: 'blur'
                        },

                    ],
                },
            }
        },
        created() {
            this.getUserList()
        },
        methods: {
            // 获取用户列表
            async getUserList() {
                const {
                    data: res
                } = await this.$axios.get('admin_user', {
                    params: {
                        current: this.queryInfo.pagenum,
                        size: this.queryInfo.pagesize,
                        query: this.queryInfo.query
                    }
                })
                // console.log(res.data)
                this.tableData = res.data
                this.total = res.total

            },
            // handleCurrentChange currentPage 改变时会触发的事件
            handleCurrentChange(val) {
                this.queryInfo.pagenum = val;
                this.getUserList()
            },

            // 删除用户
            async removeUser(username) {
                //弹框询问用户是否删除数据
                const confirmResult = await this.$confirm(
                    '此操作将永久删除该用户, 是否继续?',
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
                } = await this.$axios.delete('admin_user', {
                    params: {
                        username: username
                    }
                })
                // console.log(res)
                if (res.meta.status !== 200) {
                    return this.$message.error('删除用户失败!')
                }
                this.$message.success('删除用户成功!')
                this.getUserList()
            },

            // 点击按钮添加新用户
            addUser() {
                this.$refs.addFormRef.validate(async (valid) => {
                    if (!valid) return
                    //可以发起添加用户的网络请求
                    const {
                        data: res
                    } = await this.$axios.post('admin_user', this.addForm)

                    if (res.meta.status !== 200) {
                        if (res.meta.status === 409) {
                            return this.$message.error('用户名已存在，请换个用户名!')
                        }
                        return this.$message.error('添加失败!')
                    }

                    this.$message.success('添加用户成功!')
                    //隐藏添加用户的对话框
                    this.addDialogVisible = false
                    //  this.$refs.addFormRef.resetField()
                    //重新获取列表数据
                    this.getUserList()
                })
            },

            // 展示用户编辑的对话框(查询用户信息)
            async showEditDialog(username) {
                const {
                    data: res
                } = await this.$axios.get('admin_user/userinfo', {
                    params: {
                        username: username
                    }
                })
                if (res.meta.status !== 200) {
                    return this.$message.error('查询用户信息失败!')
                }
                // console.log(res.data)
                this.editForm = res.data[0]
                this.editDialogVisible = true
            },


            // 修改用户信息并提交
            editUserInfo() {
                this.$refs.editFormRef.validate(async (valid) => {
                    if (!valid) return
                    //发起修改用户的数据请求
                    const {
                        data: res
                    } = await this.$axios.put(
                        'admin_user',
                        this.editForm
                    )
                    if (res.meta.status !== 200) {
                        return this.$message.error('更新用户信息失败!')
                    }
                    //关闭对话框
                    this.editDialogVisible = false
                    //刷新数据列表
                    this.getUserList()
                    //提示修改成功
                    this.$message.success('更新用户信息成功!')
                })
            },

            // 修改用户vip按钮
            async changeVip(userinfo) {
                // console.log(userinfo)
             const {data:res} = await this.$axios.put('admin_user/changeVip',{
                    username:userinfo.username,
                    vip:userinfo.vip
                })
                console.log(res)
                if(res.meta.status !== 200){
                       return this.$message.error('更新用户vip失败') 
                }
                this.$message.success('更新用户vip状态成功!')
                  this.getUserList()
            },

            // 监听添加用户对话框的关闭事件
            addDialogClosed() {
                // 重置表单
                this.$refs.addFormRef.resetFields()
            },
            // 监听用户修改对话框的关闭事件
            editDialogClosed() {
                this.$refs.editFormRef.resetFields()
            },
        },
    }
</script>