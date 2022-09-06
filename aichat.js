import plugin from '../../lib/plugins/plugin.js'
import tencentcloud from 'tencentcloud-sdk-nodejs-nlp'
const NlpClient = tencentcloud.nlp.v20190408.Client;
const clientConfig = {
	credential: {
		secretId: "",
		secretKey: "",
	},
	region: "ap-guangzhou",
	profile: {
		signMethod: "HmacSHA256",
		httpProfile: {
			endpoint: "nlp.tencentcloudapi.com",
		},
	},
};
const client = new NlpClient(clientConfig);

export class aiChat extends plugin {
	constructor() {
		super({
			name: 'ai对话',
			dsc: '人工智障',
			event: 'message.group', //message为全部消息，message.group为群消息，message.private为私聊，message.discuss为讨论组
			priority: 5000,
			rule: [{
				fnc: 'chatbot'
			}]
		})
	}
	chatbot(e) {
		const params = {
			"Query": e.msg
		};
		client.ChatBot(params).then(
			(data) => {
				this.reply(data.Reply)
			},
			(err) => {
				logger.error(`error: ${err}`);
			});
	}
}
