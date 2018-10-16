Page({
  data: {
    swiperCurrent: 0,
    indicatorDots: true,
    autoplay: true,
    interval: 3000,
    duration: 800,
    circular: true,
    imgUrls: [
      '/image/kindergarten1.png', 
      '/image/kindergarten2.png', 
      '/image/kindergarten3.png'
    ],
    name: '',
    score: 0,
    star: '',
    distance: 0,
    price: 0,
  }, //轮播图的切换事件  
  onLoad(options) {
    console.log(options, 'options');
    this.setData({
      name: options.name,
      score: options.score,
      star: options.star,
      distance: options.distance,
      price: options.price
    });
  },
  swiperChange: function (e) {
    this.setData({
      swiperCurrent: e.detail.current
    })
  }, //点击指示点切换  
  chuangEvent: function (e) {
    this.setData({
      swiperCurrent: e.currentTarget.id
    })
  }, //点击图片触发事件  
  swipclick: function (e) {
    console.log(this.data.swiperCurrent);
    wx.switchTab({
      url: this.data.links[this.data.swiperCurrent]
    })
  }
})
