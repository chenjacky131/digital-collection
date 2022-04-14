const Mock = require('mockjs')

module.exports = (url, args) => {
	switch(url){
		case '/api/userInfo':
		args.data = Mock.mock({
			userName: '@name',
			'uid|1000000000-9999999999': 1,
			avatar:Mock.Random.image('60x60', '#4daa31', '#000000', 'Tic'),
			'moneyAll|0.1-10':1,
			'yesterdayBenefit|100-1000.2':1
		});
		break;
		case '/api/getCode':
		args.data = Mock.mock({
			img:Mock.Random.image('98x40','#fff','#000',`${Mock.Random.integer(1000, 9999)}`),
		});
		break;
		case '/api/getApiList':
		args.data = Mock.mock({
			'list|15':[{
				'id|+1': 0,
				apiName: /Hubi-AKAK|Okex-AXDE|Binance-ATEF/,
				enName: /huobi|okex|bian/,
				'hasMoney|1': true,
				'validDays|0-99': 0
			}]
		});
		break;
		case '/api/benefitRecords':
		args.data = Mock.mock({
			'moneyAll|0.1-10':1,
			'benefits|10-10000': 0,
			'list|1-10':[{
				'id|+1': 0,
				moneyType: /USDT|BTC|ETH/,
				settleTime: '@date(2021-MM-dd)',
				'amount|1-1000':0,
				'benefit|.01-50':0
			}]
		});
		break;
		case '/api/tradingRecords':
		args.data = Mock.mock({
			'tradeTimes|100-1000':1,
			'tradeMoney|10-10000': 0,
			'list|1-10':[{
				'id|+1': 0,
				moneyType: /USDT|BTC|ETH/,
				'amount|1-1000':0,
				'money|-1000-1000':0,
				coinType:/huobi-AKAA|Binance-ATEF/,
				operationTime: '@date(2021-MM-dd)',
				'operation':/买入|卖出/
			}]
		});
		break;
		case '/api/suggestedStrategy':
		args.data = Mock.mock({
			'list|2-4':[{  
				'id|+1': 0,
				name: /网格交易|马丁追踪/,
				icon: /1|2/,
				desc:/将资金分成若干，在震荡区间不断套利；推荐高频波动交易对|马丁倍投与趋势追踪结合的交易模型，行情回归就一定能赚钱/
			}]
		});
		break;
		case '/api/executingStrategy':
		args.data = Mock.mock({
			'list|2-4':[{
				'id|+1': 0,
				name: /网格交易|马丁追踪/,
				executeTime: '@date(2021-MM-dd)',
				apiName:/Huobi-IKHJ|Bian-IKHJ/,
				withMoney:'@boolean',
				'invest|100-10000': 0,
				'benefit|-10000-10000': 0,
				'benefitPercent|0.2':0,
				'realBenefit|-10000-10000': 0,
				'realBenefitPercent|0.2':0,
				'yearPercent|0.2':0,
				'allYearPercent|0.2':0
			}]
		});
		break;
		case '/api/strategyDetail':
		args.data = Mock.mock({
			'id|+1': 0,
			name: /网格交易|马丁追踪/,
			executeTime: '@date(2021-MM-dd)',
			apiName:/Huobi-IKHJ|Bian-IKHJ/,
			icon:/huobi|bian|okex/,
			withMoney:'@boolean',
			'invest|100-10000': 0,
			'selling|100-10000': 0,
			'amount|100-10000': 0,
			'benefit|-10000-10000': 0,
			'benefitPercent|0.2':0,
			'realBenefit|-10000-10000': 0,
			'realBenefitPercent|0.2':0,
			'floatBenefit|-10000-10000': 0,
			'floatBenefitPercent|0.2':0,
			'yearPercent|0.2':0,
			'allYearPercent|0.2':0,
			'coinList|3':[
				{
					'coinId|+1': 0,
					name:/BTC|HUOBI|BIAN/,
					'benefit|-1000-10000': 0,
					'benefitPercent|0.2': 0,
					status:/closed|true|false/
				},
			],
			'monitorList|10':[
				{
					'id|+1':0,
					des:'BTC/USDT达到买入条件,操作买入',
					time: '@date(2021-MM-dd)'
				}
			]
		});
		break;
		case '/api/coinDetail':
		args.data = Mock.mock({
			executeTime: '@date(2021-MM-dd)',
			apiName:/Huobi-IKHJ|Bian-IKHJ/,
			'currentPrice|-10000-10000': 0,
			'pricePercent|0.2':0,
			'positionMoney|10-10000':0,
			'positionAmount|10-100':0,
			'positionAve|10-100':0,
			'benefit|-10000-10000': 0,
			'invest|10-10000':0,
			'selling|10-10000':0,
			'tradeAmount|10-10000':0,
			'strategySeries':/策略1|策略2/,
			'strategyTimes|1-10': 0,
			'strategyLevel|1-10':0,
			'stopEarningAmount|10-100':0,
			'stopEarningRate|0.2':0,
			'dropdownRate|0.2':0,
			'netStopEarningRate|0.2':0,
			'netDropdownRate|0.2':0,
			'upgradeRate|0.2':0,
			'aveCalc':/整体|平均/
		});
		break;
		case '/api/createStrategy':
		args.data = Mock.mock({
			icon:/huobi|bian|okex/,
			name:/HUOBI|BIAN|OKEX/,
			withMoney:'@boolen',
			'serviceFee|0.2': 0,
			'tradePairList|2':[
				{
					'id|+1':0,
					name:/BTC|USDT|ETH/,
					'price|100-10000':0,
					'changePercent|-1-1.2':0
				}
			],
			'minInvest|0-10': 0,
			'maxInvest|100-10000': 0,
			'availebleMoney|0-10000': 0			
		});
		break;
		case '/api/getTradeParis':
		args.data = Mock.mock({
			'USDT|1-10': [{
				name: 'BTC/USDT',
				'price|10-10000': 0,
				'rates|-1-1.2':0				
			}],		
			'BTC|1-10': [{
				name: 'BTC/USDT',
				'price|10-10000': 0,
				'rates|-1-1.2':0				
			}],		
			'ETH|1-10': [{
				name: 'BTC/USDT',
				'price|10-10000': 0,
				'rates|-1-1.2':0				
			}],		
		});
		break;
		case '/api/getNotAddedOneClickTradeParis':
		args.data = Mock.mock({
			'list|1-10':[
				{
					'id|+1': 0,
					name:/USDT|BTC|ETH/
				}
			]
		});
		break;
		case '/api/login':
		case '/api/register':
		case '/api/checkCode':
		case '/api/getSmsCode':
		case '/api/checkSmsCode':
		case '/api/setPassword':
		case '/api/deleteApi':
		case '/api/addApi':
		case '/api/startStrategy':
		case '/api/deleteTradeParis':
		args.data = 'ok'
		break;
	}
}