const gql = require('../../../util/graphql.js');
const GraphQL = gql.GraphQL;

Page({
  data: {
    regions: ['天河区', '荔湾区', '越秀区', '番禺区', '黄埔区', '海珠区', '花都区', '增城区', '从化区', '南沙区'],
    currentRegion: '天河区',
    stars: ['一星', '二星', '三星', '四星', '五星'],
    currentStar: '一星',
    price: ['1000以下', '1000-2000', '2000-3000', '3000-4000', '4000-5000', '5000-6000', '6000-7000', '7000-8000', '8000以上'],
    currentPrice: '1000-2000',
  },
  bindRegionChange: function(e) {
    this.setData({
      currentRegion: this.data.regions[e.detail.value]
    })
  },
  bindStarChange: function(e) {
    this.setData({
      currentStar: this.data.stars[e.detail.value]
    })
  },
  bindPriceChange: function(e) {
    this.setData({
      currentPrice: this.data.price[e.detail.value]
    })
  },
  formSubmit: function(e) {
    const gql = GraphQL({ url: 'http://localhost:5003' }, true);
    // 第二个参数的 true 代表是否使用对象方法，如 gql.query 或 gql.mutate，默认是函数方法，如 gql({body: {query: '', variables: {}}})，建议写 true，为 true 时可以使用 promise
    gql.query({
      query: `query getSearchResult($region:String!, $star:String!, $price:String!, $gpsLng:Float, $gpsLat:Float){
        getSearchResult(region:$region star:$star price:$price gpsLng:$gpsLng gpsLat:$gpsLat)
        { data{Id name address gpsLng gpsLat gaodeLng gaodeLat baiduLng baiduLat city region price star distance score} 
        isSuccess 
        code 
        total }}`,
      variables: {
        region: e.detail.value.region,
        star: e.detail.value.star,
        price: e.detail.value.price,
        gpsLng: getApp().globalData.currentLongitude,
        gpsLat: getApp().globalData.currentLatitude,
      }
    }).then((res) => {
      console.log(res, '请求成功');
      if (res.data.getSearchResult.data !== null) {
        let posList = [];
        res.data.getSearchResult.data.forEach(element => {
          let pos = {
            latitude: element.gpsLat,
            longitude: element.gpsLng,
            name: element.name,
            iconPath: '/image/location_red.png',
            width: 30,
            height: 30,
            city: element.city,
            price: element.price,
            star: element.star,
            distance: element.distance.toFixed(1),
            score: element.score.toFixed(1),
          };
          posList.push(pos);
        });
        this.setData({
          markers: posList
        });
        // getApp().globalData.markers = this.data.markers;
        // wx.switchTab({
        //   url: '../../mapPage/index',
        // })
        const listJson = JSON.stringify(posList);
        wx.navigateTo({ 
          url: '../searchResult/index?list='+ listJson,
          fail: function() {
            console.log("跳转失败");
          }
        });
      } else {
        const listJson = JSON.stringify([]);
        wx.navigateTo({ 
          url: '../searchResult/index?list='+ listJson,
          fail: function() {
            console.log("跳转失败");
          }
        });
      }
    }).catch((error) => {
      console.log(error, '请求失败');
      const listJson = JSON.stringify([]);
      wx.navigateTo({ 
        url: '../searchResult/index?list='+ listJson,
        fail: function() {
          console.log("跳转失败");
        }
      });
    });
  },
  formReset: function(e) {
    console.log('reset');
  }
})