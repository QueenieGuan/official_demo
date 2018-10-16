const gql = require('../../util/graphql.js');
const GraphQL = gql.GraphQL;

Page({
  data: {
    latitude: '',
    longitude: '',
    markers: [],
    scale: 16,
    controls: [{
      id: 1,
      iconPath: '/image/enlarge.png',
      position: {
        left: 10,
        top: 10,
        width: 20,
        height: 20
      },
      clickable: true
    }, {
      id: 2,
      iconPath: '/image/shrink.png',
      position: {
        left: 10,
        top: 40,
        width: 20,
        height: 20
      },
      clickable: true
    }],
  },
  onLoad() {
    const _this = this;
    wx.getLocation({
      success: function (res) {
        _this.setData({
          longitude: res.longitude,
          latitude: res.latitude,
        });
        getApp().globalData.currentLongitude = _this.data.longitude;
        getApp().globalData.currentLatitude = _this.data.latitude;
      }
    });
    const gql = GraphQL({ url: 'http://localhost:5003' }, true);
    // 第二个参数的 true 代表是否使用对象方法，如 gql.query 或 gql.mutate，默认是函数方法，如 gql({body: {query: '', variables: {}}})，建议写 true，为 true 时可以使用 promise
    gql.query({
      query: `query{getAllKindergarten{ data{Id name address gpsLng gpsLat gaodeLng gaodeLat baiduLng baiduLat city region price star score} isSuccess code total }}`,
      variables: {}
    }).then((res) => {
      console.log(res, '请求成功');
      let posList = [];
      res.data.getAllKindergarten.data.forEach(element => {
        let pos = {
          latitude: element.gpsLat,
          longitude: element.gpsLng,
          name: element.name,
          iconPath: '/image/location_red.png',
          width: 30,
          height: 30
        };
        posList.push(pos);
      });
      // 当前位置
      posList.push({
        latitude: this.data.latitude,
        longitude: this.data.longitude,
        name: '我的位置',
        iconPath: '/image/currentLocation.png',
        width: 50,
        height: 50
      });
      this.setData({
        markers: posList
      });
    }).catch((error) => {
      console.log(error, '请求失败');
    });
  },
  onShow() {
    if(getApp().globalData.markers !== undefined) {
      this.setData({
        markers: getApp().globalData.markers,
        longitude: getApp().globalData.markers[0].longitude,
        latitude: getApp().globalData.markers.latitude,
        scale: 14
      });
    }
  },
  // 点击缩放按钮控制地图缩放级别
  controltap(e) {
    var that = this;
    if (e.controlId === 1) {
      that.setData({
        scale: ++this.data.scale
      })
    } else {
      that.setData({
        scale: --this.data.scale
      })
    }
  },
  // 点击相应的坐标点取出相应的信息
  markertap(e) {
    console.log(e, 'e')
    console.log(dataArray[e.markerId])
    console.log(e.markerId)
  },
})
