import LoginPage from '../pageobjects/login.page';
import Home from '../pageobjects/home.page';

const config = require('config');


describe('Login Test', function() {

	it('Should login and see library table on home page', function() {

		let isExisting;
		let start = new Date();
		LoginPage.login(config.app.admin.username, config.app.admin.password);
		browser.waitUntil(function() {
			isExisting = Home.libraryTable.isExisting()
			return isExisting;
		}, 3000, 'login takes more than 10 seconds to load the library element');
		let end = new Date();
		let diff = end - start;
		console.log(`The time it took to login is ${diff}`);
		expect(isExisting).to.be.true;
		expect(browser.getUrl()).to.contain('library/processes');
		expect(browser.getTitle()).to.equal('Process Library');
		expect(Home.appTitleText.getText()).to.equal('PROCESS LIBRARY');

	});

})