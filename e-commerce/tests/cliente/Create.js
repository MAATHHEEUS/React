// import chromedriver so that selenium can by itself open a chrome driver

require("chromedriver");

// import this classes from selenium
const { Builder, By, Key, until } = require("selenium-webdriver");

var assert = require("assert");

// describe test
describe("CRUD Cliente", function () {
    // it describes expected behaviour when user perfroms search on google
    it("A user submited", async function () {
        // open chrome browser
        let driver = await new Builder().forBrowser("chrome").build();
        try {
            // navigate to to this website
            
            await driver.get("http://localhost:3000");

            // type 'reflect run' in the search box then press ENTER Key
            await driver.findElement(By.id("btn-cliente")).click();

            await driver.findElement(By.id("btn-newcliente")).click();

            await driver.findElement(By.id("email")).sendKeys("tt@selenium.com");

            await driver.findElement(By.id("nome")).sendKeys("Teste Selenium");

            await driver.findElement(By.id("nascimento")).sendKeys("16/04/2000");

            await driver.findElement(By.id("cpf")).sendKeys("16042000-88");

            await driver.findElement(By.id("guardar-cliente")).click();

        } finally {
            // close the browser
            // await driver.quit();
        }
    });
});