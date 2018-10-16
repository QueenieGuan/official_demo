Page({
  data: {
    userInfo: {
      avatarUrl: '',
      nickName: ''
    },
  },
  onLoad() {
    const _this = this;
    wx.getUserInfo({
      success: function (res) {
        _this.setData({
          userInfo: {
            avatarUrl: res.userInfo.avatarUrl,
            nickName: res.userInfo.nickName
          }
        });
      }
    })
  }
})