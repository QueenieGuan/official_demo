Page({
  data: {
    list: [],
  },
  onLoad() {
    const list = [
      {
        name: "吉山幼儿园",
        price: 2000,
        star: '二星',
        score: 9.2,
        distance: 0.3,
      },
      {
        name: "车陂幼儿园",
        price: 4000,
        star: '二星',
        score: 8.4,
        distance: 1.2,
      },
      {
        name: "天河区安安幼儿园",
        price: 2000,
        star: '二星',
        score: 8.3,
        distance: 3.2,
      },
      {
        name: "金盆幼儿园",
        price: 4000,
        star: '二星',
        score: 8.1,
        distance: 2.5,
      },
    ];
    this.setData({
      list: list
    })
  },
  nearbyBtnClick: function() {
    wx.navigateTo({ 
      url: './nearby/index',
      fail: function() {
        console.log("跳转失败");
      }
    });
  },
  searchBtnClick: function() {
    wx.navigateTo({ 
      url: './search/index',
      fail: function() {
        console.log("跳转失败");
      }
    });
  },
  cmopareBtnClick: function() {
    wx.showToast({
      title: '功能开发中',
      icon: 'loading',
      duration: 3000,
      mask:true
    })
  },
  listClick: function(e) {
    const item = this.data.list[e.currentTarget.dataset.index];
    const name = item.name;
    const score = item.score;
    const star = item.star;
    const distance = item.distance;
    wx.navigateTo({ 
      url: './detail/index?name='+ name + '&score=' + score + '&star=' + star + '&distance=' + distance,
      fail: function() {
        console.log("跳转失败");
      }
    });
  }
})