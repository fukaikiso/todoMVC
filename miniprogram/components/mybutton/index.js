// components/mybutton/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    "title" : {
      type: String,
      value: '按钮文本'
    },
    "color" : {
      type: String,
      value: 'crimson'
    },
    "round" : {
      type: Boolean,
      value: false
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    last: 0,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    tapview(){
      console.log('tap view')
      let now = new Date().getTime()
      let last = this.data.last
      if(now-last<350){
        this.triggerEvent('doubletap')
        now = 0
      }
      this.data.last = now
    },
  }
})
