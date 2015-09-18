
import Mailjet from 'node-mailjet';
import fs from 'fs';
import handlebars from 'handlebars';

export default class Receipt extends Mailjet {

	constructor (template) {
		super(process.env.MJ_APIKEY_PUBLIC, process.env.MJ_APIKEY_PRIVATE);
		this.template = template;
		// TODO: make a config file
		this.subject = 'Invoice';
		this.message = 'Thank you for Shopping at Mailjet!';
		this.title = 'Receipt:';
		this.senderEmail = 'gbadi@student.42.fr';
		this.senderName = 'Guillaume Badi';
	}

	send (to, values) {
		values.message = this.message;
		values.title = this.title;
		return new Promise((resolve, reject) => {
			fs.readFile(this.template, (err, data) => {
				if (err) return reject(err);

				let template = handlebars.compile(data.toString());
				let result = template(values);
				this.sendEmail(to, result)
					.then(resolve, reject);
			});
		});
	}

	sendEmail (to, template) {
		return new Promise((resolve, reject) => {
			this.post('send')
				.request({
					FromEmail: this.senderEmail,
					FromName: this.senderName || this.senderEmail,
					Subject: this.subject,
					Recipients: [{Email: to}],
					'Html-part': template,
				}, (err, response, body) => {
					if (err) reject(false);
					else resolve(true);
				});
		});
	}
}
