const expect = require('chai').expect;
const {Given, When, Then} = require('@cucumber/cucumber');
const { BeforeAll, Before, AfterAll, After } = require('@cucumber/cucumber');
var {setDefaultTimeout} = require('@cucumber/cucumber');
setDefaultTimeout(20 * 1000);
const puppeteer = require('puppeteer');
const getData = require('./getData');

var browser, page, testValues;

BeforeAll (async () => {
    browser = await puppeteer.launch({headless: false});
    page = await browser.newPage();
    page.setDefaultTimeout(20 * 1000);
    getData.loadData();
});

Given ('I browse to the sign up form', async () => {
    await page.goto('https://habitica.com/static/home', {timeout: 20 * 1000, waitUntil: 'networkidle2'});
    testValues = getData.getValues();
});

When ('I leave the username field empty', async () => {
    await page.evaluate(async () => {
        const field = document.querySelector('input#usernameInput');
        field.value = '';
    });
});

When ('I fill in the email field', async () => {
    let field = await page.$('input[type=email]');
    await field.type(testValues.email);
});

When ('I fill in the password field', async () => {
    let field = await page.$$('input[type=password]');
    await field[0].type(testValues.password);
});

When ('I fill in the confirm password field', async () => {
    let field = await page.$$('input[type=password]');
    await field[1].type(testValues.password);
});

When ('I click on sign up button', async () => {
    let button = await page.$('button[type=submit]');
    await button.click();
});

Then ('I should see missign username error', async () => {
    await page.waitForTimeout(2000);
    let error = await page.$('#app > div.notifications.notifications-top-pos-normal > div > div > div > div > div');
    expect(await error.evaluate(node => node.innerText)).to.equal('Missing username.');
});

When ('I fill in the username field', async () => {
    let field = await page.$('input#usernameInput');
    await field.type(testValues.user_name);
});

When ('I leave the email field empty', async () => {
    await page.evaluate(async () => {
        const field = document.querySelector('input[type=email]');
        field.value = '';
    }); 
});

Then ('I should see missign email address error', async () => {
    await page.waitForTimeout(2000);
    let error = await page.$('#app > div.notifications.notifications-top-pos-normal > div > div > div > div > div');
    expect(await error.evaluate(node => node.innerText)).to.equal('Missing email.');
});

When ('I leave the password field empty', async () => {
    await page.evaluate(async () => {
        const field = document.querySelectorAll('input[type=password]')[0];
        field.value = '';
    });
});

Then ('the sign up button should be disabled', async () => {
    await page.waitForSelector('button[type=submit]', {
        enabled: false,
    });
});

When ('I enter another password in the confirm password field', async () => {
    await page.evaluate(async () => {
        const field = document.querySelectorAll('input[type=password]')[1];
        field.value = 'LoremIpsum$1';
    });
});

AfterAll (async () => {
    await browser.close();
});