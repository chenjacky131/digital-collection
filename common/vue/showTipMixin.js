const mixin = {
		methods:{
			showTip(type){	//	参数说明
				this.popUpShow = true
				switch(type){
					case '策略数列':
						this.popUpContent = '交易投入的数列'
					break;
					case '追投倍数':
						this.popUpContent = '根据设置的倍数进行倍数投入'
					break;
					case '交易倍数':
						this.popUpContent = '计算首次投入的最小量倍数，后续建仓，根据策略的数列进行投入'
					break;
					case '交易速率':
						this.popUpContent = '计算建仓的单数与间隔，档位越高交易速率越多'
					break;
					case '止盈金额':
						this.popUpContent = '赢利到达对应设置的金额则平仓卖出'
					break;
					case '整体止盈比例':
						this.popUpContent = '策略按照计价设置的比例后，执行止盈，平仓卖出'
					break;
					case '启动追踪止盈':
						this.popUpContent = '当策略执行到达止盈比例后，启动追踪止盈'
					break;
					case '整体回降比例':
						this.popUpContent = '当启动追踪止盈时，根据整体回降比例设置，进行平仓卖出'
					break;
					case '启动网格止盈':
						this.popUpContent = '当该组策略进行中的最后一单追踪止盈结束后，优先卖出整组策略中已盈利的订单'
					break;
					case '网格止盈比例':
						this.popUpContent = '策略按照计价设置的比例后，执行止盈，平仓卖出'
					break;
					case '网格回降比例':
						this.popUpContent = '根据整体回降比例设置，进行平仓卖出'
					break;
					case '追踪建仓上调比例':
						this.popUpContent = '触发追踪建仓后，行情跌停回调多少个百分比后执行建仓'
					break;
					case '均价计算':
						this.popUpContent = '整体均价使用该价格减去建仓间隔作为下一单参考价格，尾单均价使用该价格减去建仓间隔作为下一单参考价格'
					break;
					case '最大做单次数':
						this.popUpContent = '根据行情下跌进行补单操作，最多补单数量'
					break;
					case '建仓间隔':
						this.popUpContent = '根据行情下跌的比例进行补单建仓'
					break;
					case '首单比例':
						this.popUpContent = '根据总投入资金的比例作为首次建仓买入数量'
					break;
					case '首单数量':
						this.popUpContent = '首次购买第一单币对数量，后续根据这个数量进行补仓增幅'
					break;
					default:
						this.popUpContent = ''
				}
			}
		}
}
export default mixin