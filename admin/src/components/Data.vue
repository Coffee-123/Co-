<template>
    <div>
        <!-- 面包屑导航区域 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>数据统计</el-breadcrumb-item>
            <el-breadcrumb-item>数据列表</el-breadcrumb-item>
        </el-breadcrumb>
        <el-card>
            <div class="data_content">
                <div id="sexRatio" :style="{width: '450px', height: '450px'}"></div>
                <div id="userTotal" :style="{width: '450px', height: '450px'}"></div>
            </div>
        </el-card>
    </div>
</template>

<script>
    export default {
        name: 'hello',
        data() {
            return {

            }
        },
        created() {

        },
        mounted() {
            this.sexRatio()
            this.userTotal()
        },
        methods: {
            // 男女比例
            async sexRatio() {
                const {
                    data: res
                } = await this.$axios.get('admin_data/sexRatio')
                // console.log(res.data.male)
                // 基于准备好的dom，初始化echarts实例
                let myChart = this.$echarts.init(document.getElementById('sexRatio'))
                // 绘制图表
                myChart.setOption({
                    color: ['#0984e3', '#e84393', '#b2bec3'],
                    title: {
                        text: '用户性别比例',
                        // subtext: '纯属虚构',
                        left: 'center'
                    },
                    tooltip: {
                        trigger: 'item'
                    },
                    legend: {
                        orient: 'vertical',
                        left: 'left',
                    },
                    series: [{
                        name: '性别统计',
                        type: 'pie',
                        radius: '50%',
                        data: [{
                                value: res.data.male,
                                name: '男',

                            },
                            {
                                value: res.data.female,
                                name: '女'
                            },
                            {
                                value: res.data.secrecy,
                                name: '保密'
                            },

                        ],
                        emphasis: {
                            itemStyle: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        }
                    }]
                });
            },
            // 用户人数
            async userTotal() {
                const {
                    data: res
                } = await this.$axios.get('admin_data/userTotal')
                //    console.log(res.data)
                let myChart = this.$echarts.init(document.getElementById('userTotal'))
                myChart.setOption({
                    color: ['#5f27cd','#48dbfb'],
                    title: {
                        text: '2021年',
                        // left: 'center'
                    },
                    legend: {
                        data: ['总人数','新增人数']
                    },
                    tooltip: {
                        trigger: 'axis'
                    },
                    xAxis: {
                        type: 'category',
                        data: ['一月', '二月', '三月']
                    },
                    yAxis: {
                        type: 'value'
                    },
                    series: [{
                            name: '总人数',
                            data: [res.data.Jan, res.data.Feb + res.data.Jan, res.data.Mar + res.data.Feb + res.data.Jan],
                            type: 'line',
                            // smooth: true
                        },
                        {
                            name: '新增人数',
                              data: [res.data.Jan, res.data.Feb, res.data.Mar],
                                  type: 'line',
                        }
                    ]
                })
            }
        }
    }
</script>

<style lang="less" scoped>
    #echart {
        width: 600px;
        height: 500px;
    }

    .data_content {
        display: flex;
        justify-content: space-around;
        // height: 580px;
    }
</style>