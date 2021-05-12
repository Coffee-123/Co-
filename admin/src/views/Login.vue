<template>
    <div>

        <div class="login_container">
            <div class="bubbls">
                <div class="bubble"></div>
                <div class="bubble"></div>
                <div class="bubble"></div>
                <div class="bubble"></div>
                <div class="bubble"></div>
                <div class="bubble"></div>
                <div class="bubble"></div>
                <div class="bubble"></div>
                <div class="bubble"></div>
                <div class="bubble"></div>
                <div class="bubble"></div>
                <div class="bubble"></div>
            </div>
            <div class="loginView">


                <div class="avatar_box">
                    <img src="../assets/images/logo.jpg" alt="">

                </div>
                <div class="loginForm">
                    <el-form ref="loginFormRef" :model="loginForm" :rules="loginFormRules">
                        <el-form-item prop="username">
                            <el-input v-model="loginForm.username" placeholder="请输入用户名"
                                prefix-icon="el-icon-user-solid">
                            </el-input>
                        </el-form-item>
                        <el-form-item prop="password">
                            <el-input type="password" v-model="loginForm.password" autocomplete="off"
                                prefix-icon="el-icon-lock" placeholder="请输入密码"></el-input>
                        </el-form-item>
                    </el-form>
                    <div class="login_btn">
                        <el-button type="primary" @click="login">登录</el-button>
                        <el-button @click="resetLoginForm">重置</el-button>
                    </div>
                </div>
            </div>

        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                loginForm: {
                    username: '',
                    password: '',

                },
                // 这是表单的验证规则对象
                loginFormRules: {
                    // 验证用户名是否合法
                    username: [{
                            required: true,
                            message: '请输入登录名称',
                            trigger: 'blur'
                        },
                        {
                            min: 3,
                            max: 10,
                            message: '长度在 3 到 10 个字符',
                            trigger: 'blur'
                        }
                    ],
                    // 验证密码是否合法
                    password: [{
                            required: true,
                            message: '请输入登录密码',
                            trigger: 'blur'
                        },
                        // {
                        //     min: 6,
                        //     max: 15,
                        //     message: '长度在 6 到 15 个字符',
                        //     trigger: 'blur'
                        // }
                    ]
                }
            }
        },
        methods: {
            login() {
                this.$refs.loginFormRef.validate(async valid => {
                    // console.log(valid)
                    if (!valid) return
                    const {
                        data: res
                    } = await this.$axios.post('admin/admin_login', this.loginForm)
                    // console.log(res)
                    if (res.meta.status !== 200) return this.$message.error('登录失败！')
                    this.$message.success('登录成功')
                    // 1. 将登录成功之后的 token，保存到客户端的 sessionStorage 中
                    //   1.1 项目中出了登录之外的其他API接口，必须在登录之后才能访问
                    //   1.2 token 只应在当前网站打开期间生效，所以将 token 保存在 sessionStorage 中
                    window.sessionStorage.setItem('token', res.data)
                    this.$router.push('/home')
                })
            },
            // 重置
            resetLoginForm() {
                this.$refs.loginFormRef.resetFields();
            }
        }
    }
</script>

<style lang="less" scoped>
    .login_container {
        background-image: linear-gradient(120deg, #3498db, #8344ad);
        min-height: 100vh;
    }

    .avatar_box {
        height: 130px;
        width: 130px;
        border: 1px solid #eee;
        border-radius: 50%;
        padding: 10px;
        box-shadow: 0 0 10px #ddd;
        position: absolute;
        left: 50%;
        transform: translate(-50%, -50%);
        background-color: #fff;

        img {
            width: 100%;
            height: 100%;
            border-radius: 50%;
            background-color: #eee;

        }
    }

    .loginView {
        position: absolute;
        top: 45%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 500px;
        height: 330px;
        background-color: #fff;
        border-radius: 5px;
    }

    .loginForm {
        position: relative;
        width: 380px;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);

    }

    .login_btn {
        margin-top: 30px;
    }


    // bubbls
    .bubbls {
        position: absolute;
        width: 100%;
        height: 100%;
        // z-index: -10;
        overflow: hidden;
        top: 0;
        left: 0;
    }

    .bubble {
        position: absolute;
        bottom: 0;
        width: 100%;
        width: 40px;
        height: 40px;
        background-color: beige;
        border-radius: 50%;
        opacity: 0.5;
        animation: flying 10s infinite ease-in;
    }

    .bubble:nth-child(1) {
        width: 40px;
        height: 40px;
        left: 10%;
        animation-duration: 8s;
    }

    .bubble:nth-child(2) {
        width: 20px;
        height: 20px;
        left: 20%;
        animation-duration: 5s;
        animation-delay: 1s;
    }

    .bubble:nth-child(3) {
        width: 50px;
        height: 50px;
        left: 35%;
        animation-duration: 10s;
        animation-delay: 2s;
    }

    .bubble:nth-child(4) {
        width: 80px;
        height: 80px;
        left: 50%;
        animation-duration: 7s;
        animation-delay: 0s;
    }

    .bubble:nth-child(5) {
        width: 35px;
        height: 35px;
        left: 50%;
        animation-duration: 6s;
        animation-delay: 1s;
    }

    .bubble:nth-child(6) {
        width: 40px;
        height: 40px;
        left: 60%;
        animation-duration: 3s;
        animation-delay: 1s;
    }

    .bubble:nth-child(7) {
        width: 10px;
        height: 10px;
        left: 80%;
        animation-duration: 9s;
        animation-delay: 1s;
    }

    .bubble:nth-child(8) {
        width: 30px;
        height: 30px;
        left: 100%;
        animation-duration: 5s;
        animation-delay: 2s;
    }

    .bubble:nth-child(9) {
        width: 20px;
        height: 20px;
        left: 90%;
        animation-duration: 8s;
        animation-delay: 1s;
    }

    .bubble:nth-child(10) {
        width: 40px;
        height: 40px;
        left: 65%;
        animation-duration: 6.5s;
        animation-delay: 2s;
    }

    .bubble:nth-child(12) {
        width: 20px;
        height: 20px;
        left: 50%;
        animation-duration: 8.5s;
        animation-delay: 1s;
    }

    @keyframes flying {
        0% {
            bottom: -200px;
            transform: translateX(0);

        }

        50% {

            transform: translateX(100px);

        }

        100% {
            bottom: 1180px;
            transform: translateX(0);

        }
    }
</style>