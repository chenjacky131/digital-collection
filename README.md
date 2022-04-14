# 数字藏品

#### 介绍
数字藏品项目

#### 软件架构
uni-app + vuex


#### 项目开发注意事项

1.  自定义组件components符合easycom规范直接在页面使用，不需要引入
2.  使用提示uni.showToast({title:"提示语", icon:"none"});
3.  ajax请求	this.$request('url', 'METHOD',data).then(res => {
			console.log(res)
	  }).catch(err => {
			console.error(err)
		})
4. config/ajax.js配置请求地址和请求方法，里面的方法用大驼峰写法
5. 登录里面的非空表单验证可以去除，因为验证提交按钮是否可点击已经验证了表单的非空情况
6. 如果需要固定头部，fixed变量改成true,scrollY加上withHeader类名 
7. 常用的布局css类写在common/css/common.scss里面。直接写相应的css类名，方便快速写布局代码.
8. 每个请求需要添加错误捕获优化体验。
9. 配置下拉刷新，在pages.json的pages节点里面的enablePullDownRefresh设置为true，就可以开启下拉刷新功能。onPullDownRefresh 处理下拉刷新的逻辑，与其它生命周期同级别。调用uni.stopPullDownRefresh可以停止下拉刷新方法。
10. ajax请求写在onLoad生命周期函数里
11. 字体颜色的css类名获取可以用$getColorClass获取
12. 可用cssMixin:fontBold,fontSmall,card,flexRow,flexColumn,input,h1,btn,dialog,normal-radius,sub-tit,sub-cont
13. 可用cssClass:small-text,bold-text,color-main,color-green,color-red,color-gray,color-blue,iconfont,popup-list,switch,flex-row,
flex-column,scrollY,text-right,text-center,loading,spe-tit