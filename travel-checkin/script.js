document.addEventListener('DOMContentLoaded', () => {
    // 添加省份经纬度数据
    const provinces = {
        '北京': [116.405285, 39.904989],
        '天津': [117.190182, 39.125596],
        '河北': [114.502461, 38.045474],
        '山西': [112.549248, 37.857014],
        '内蒙古': [111.670801, 40.818311],
        '辽宁': [123.429096, 41.796767],
        '吉林': [125.324501, 43.886841],
        '黑龙江': [126.642464, 45.756967],
        '上海': [121.472644, 31.231706],
        '江苏': [118.767413, 32.041544],
        '浙江': [120.153576, 30.287459],
        '安徽': [117.283042, 31.86119],
        '福建': [119.306239, 26.075302],
        '江西': [115.892151, 28.676493],
        '山东': [117.000923, 36.675807],
        '河南': [113.665412, 34.757975],
        '湖北': [114.298572, 30.584355],
        '湖南': [112.982279, 28.19409],
        '广东': [113.280637, 23.125178],
        '广西': [108.320004, 22.82402],
        '海南': [110.33119, 20.031971],
        '重庆': [106.504962, 29.533155],
        '四川': [104.065735, 30.659462],
        '贵州': [106.713478, 26.578343],
        '云南': [102.712251, 25.040609],
        '西藏': [91.132212, 29.660361],
        '陕西': [108.948024, 34.263161],
        '甘肃': [103.823557, 36.058039],
        '青海': [101.778916, 36.623178],
        '宁夏': [106.278179, 38.46637],
        '新疆': [87.617733, 43.792818],
        '台湾': [121.509062, 25.044332],
        '香港': [114.173355, 22.320048],
        '澳门': [113.54909, 22.198951]
    };

    // 预定义的颜色数组
    const colors = [
        '#ff7f50', '#87cefa', '#da70d6', '#32cd32', '#6495ed',
        '#ff69b4', '#ba55d3', '#cd5c5c', '#ffa500', '#40e0d0'
    ];

    const myChart = echarts.init(document.getElementById('map'));
    const popup = document.getElementById('checkinPopup');
    const regionNameElement = document.getElementById('regionName');
    const checkinBtn = document.getElementById('checkinBtn');
    const closeBtn = document.getElementById('closeBtn');
    let currentRegion = null;

    // 修改数据结构：获取打卡记录
    const getCheckedRegions = () => {
        return JSON.parse(localStorage.getItem('checkedRegions') || '[]').map(item => {
            return typeof item === 'string' ? { name: item, color: colors[0] } : item;
        });
    };

    // 修改保存打卡数据的方法
    const saveCheckedRegion = (regionName) => {
        const checked = getCheckedRegions();
        if (!checked.find(item => item.name === regionName)) {
            checked.push({
                name: regionName,
                color: colors[checked.length % colors.length]
            });
            localStorage.setItem('checkedRegions', JSON.stringify(checked));
        }
    };

    // 添加取消打卡方法
    const removeCheckedRegion = (regionName) => {
        let checked = getCheckedRegions();
        checked = checked.filter(item => item.name !== regionName);
        localStorage.setItem('checkedRegions', JSON.stringify(checked));
    };

    // 修改初始化地图配置
    const initChart = () => {
        const checkedRegions = getCheckedRegions();
        const lines = [];
        
        // 生成路线数据
        for (let i = 1; i < checkedRegions.length; i++) {
            const fromCoords = provinces[checkedRegions[i - 1].name];
            const toCoords = provinces[checkedRegions[i].name];
            lines.push({
                coords: [fromCoords, toCoords],
                lineStyle: {
                    normal: {
                        color: checkedRegions[i].color
                    }
                }
            });
        }

        const option = {
            backgroundColor: '#F5F5F5',
            title: {
                text: '中国地图打卡',
                left: 'center'
            },
            tooltip: {
                trigger: 'item',
                formatter: '{b}'
            },
            series: [
                {
                    name: '省份',
                    type: 'map',
                    mapType: 'china',  // 4.9.0版本使用mapType而不是map
                    roam: true,
                    label: {
                        normal: {
                            show: true
                        }
                    },
                    itemStyle: {
                        normal: {
                            areaColor: '#ddd',
                            borderColor: '#666'
                        },
                        emphasis: {
                            areaColor: '#bbb'
                        }
                    },
                    // 重要：修改数据的设置方式
                    data: Object.keys(provinces).map(name => {
                        const checkedRegion = checkedRegions.find(r => r.name === name);
                        return {
                            name: name,
                            itemStyle: {
                                normal: {
                                    areaColor: checkedRegion ? checkedRegion.color : '#ddd'
                                }
                            }
                        };
                    })
                },
                {
                    name: '路线',
                    type: 'lines',
                    coordinateSystem: 'geo',
                    zlevel: 2,
                    effect: {
                        show: true,
                        period: 6,
                        trailLength: 0.7,
                        color: '#fff',
                        symbolSize: 5
                    },
                    lineStyle: {
                        normal: {
                            color: '#4CAF50',
                            width: 2,
                            opacity: 0.6,
                            curveness: 0.2
                        }
                    },
                    data: lines
                }
            ]
        };

        myChart.setOption(option, true);  // 添加 true 参数强制刷新
    };

    // 确保地图数据加载完成后再初始化
    const initializeMap = () => {
        // 检查地图是否已加载
        if (!echarts.getMap('china')) {
            setTimeout(initializeMap, 100);
            return;
        }
        initChart();
        bindEvents();
    };

    // 分离事件绑定
    const bindEvents = () => {
        myChart.on('click', (params) => {
            currentRegion = params.name;
            const isChecked = getCheckedRegions().find(item => item.name === currentRegion);
            regionNameElement.textContent = currentRegion;
            checkinBtn.textContent = isChecked ? '取消打卡' : '打卡';
            checkinBtn.style.backgroundColor = isChecked ? '#f44336' : '#4CAF50';
            popup.style.display = 'block';
        });
    };

    // 启动初始化过程
    initializeMap();

    // 修改打卡按钮点击事件
    checkinBtn.addEventListener('click', () => {
        if (currentRegion) {
            const isChecked = getCheckedRegions().find(item => item.name === currentRegion);
            if (isChecked) {
                removeCheckedRegion(currentRegion);
            } else {
                saveCheckedRegion(currentRegion);
            }
            initChart();
            popup.style.display = 'none';
        }
    });

    // 关闭按钮事件
    closeBtn.addEventListener('click', () => {
        popup.style.display = 'none';
    });

    // 点击弹窗外部关闭
    popup.addEventListener('click', (e) => {
        if (e.target === popup) {
            popup.style.display = 'none';
        }
    });

    // 处理窗口大小变化
    window.addEventListener('resize', () => {
        myChart.resize();
    });
});
