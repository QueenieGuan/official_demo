const gql = require('../../../util/graphql.js');
const GraphQL = gql.GraphQL;

Page({
  data: {
    nodata: false,
    list: [],
  },
  onLoad() {
    const gql = GraphQL({ url: 'http://localhost:5003' }, true);
    gql.query({
      query: `query getNearbyKindergarten($gpsLng:Float, $gpsLat:Float){
        getNearbyKindergarten(gpsLng:$gpsLng gpsLat:$gpsLat)
        { data{Id name address gpsLng gpsLat gaodeLng gaodeLat baiduLng baiduLat city region price star distance score} 
        isSuccess 
        code 
        total }}`,
      variables: {
        gpsLng: getApp().globalData.currentLongitude,
        gpsLat: getApp().globalData.currentLatitude,
      }
    }).then((res) => {
      console.log(res, '请求成功');
      let posList = [];
      res.data.getNearbyKindergarten.data.forEach(element => {
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
        list: posList,
        nodata: false
      });
    }).catch((error) => {
      this.setData({ nodata: true });
      console.log(error, '请求失败');
    });
  }
})
