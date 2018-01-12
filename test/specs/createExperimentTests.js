import LoginPage from '../pageobjects/login.page';
import Home from '../pageobjects/home.page';
import Experiment from '../pageobjects/experiment.page';
import getRandomName from '../helpers/get_random_name';

const config = require('config');


describe('Create an experiment test', function() {

	it('Should create an experiment', function() {

		LoginPage.login(config.app.admin.username, config.app.admin.password);

		// click away the promot video and browser size suggestion modal
		browser.pause(5000);
		Home.closeVideoBtn.waitForExist();
		Home.closeVideoBtn.click();
		browser.pause(2000);
		Home.closeBrowserSize.waitForExist();
		Home.closeBrowserSize.click();

		browser.url('processes/NRriBeYKnv5ErrraS');
		browser.pause(2000);
		Home.closeBrowserSize.waitForExist();
		Home.closeBrowserSize.click();

		Experiment.experimentLnk.waitForExist();
		Experiment.experimentLnk.waitForEnabled();
		Experiment.experimentLnk.click();

		Experiment.createExptLnk.waitForExist();
		Experiment.createExptLnk.waitForEnabled();
		Experiment.createExptLnk.click();
		const randomName = getRandomName();
		Experiment.exptName.waitForExist();
		Experiment.exptName.waitForEnabled();
		browser.pause(1000);
		Experiment.exptName.setValue(randomName);
		Experiment.exptPurpose.setValue('testing static purpose');
		Experiment.createExptBtn.click();
		let start = new Date();
		browser.waitUntil(function() {
			return browser.getTabIds()[1] !== undefined;
		}, 5000, 'new process tab takes longer than 5 seconds to load');
		browser.switchTab(browser.getTabIds()[1]);
		Home.closeBrowserSize.isExisting();
		let end = new Date();
		let diff = end - start;
		console.log(`The time it took to create new experiment is ${diff}`);
		browser.pause(2000);
		Home.closeBrowserSize.waitForExist();
		Home.closeBrowserSize.click();
		expect(browser.getUrl()).to.contain('experiment');
		expect(browser.getTitle()).to.contain(randomName);

	});
});
