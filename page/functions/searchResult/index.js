Page({
  data: {
    nodata: false,
    list: [],
  },
  onLoad(options) {
    const list = JSON.parse(options.list);
    if(list.length === 0) {
      this.setData({
        nodata: true
      });
    } else {
      this.setData({
        list: list
      });
    }
  }
})
