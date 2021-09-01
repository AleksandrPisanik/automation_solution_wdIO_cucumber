const { Given, When, Then } = require('@cucumber/cucumber');
const loginPage = require('../../pageObjects/login.page');

/**
 * Click tab by name
 */
When(/^I am on the login page$/, async function(){
  return loginPage.open();
});