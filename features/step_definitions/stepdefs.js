const assert = require('assert');
const {Given, When, Then} = require('@cucumber/cucumber');
const puppeteer = require('puppeteer');
const getData = require('./getData');

var testData = getData.getData();

testData.values.forEach(element => console.log(element.password));