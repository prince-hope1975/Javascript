import { Builder, By } from "selenium-webdriver";
let amounts = [];
let addresses = [];
let driver;
(async () => {
    driver = await new Builder().forBrowser("chrome").build();
    await driver.get("https://www.nftexplorer.app/collection/algoatspfp");
    // await driver.get(
    //   "https://algoexplorer.io/address/EJNUC2EMTEZTPWJH6ZYOGQKHJBKHAZGSDEJZO4QHRO26RQWHW2ZTYHX4A4"
    // );
    // wait till ele,eent is loaded
    await new Promise((resolve, reject) => {
        return setTimeout(() => {
            resolve(null);
        }, 5000);
    });
    // @ts-ignore
    // let button = await driver.findElement(By.className("display-6 d-flex"));
    let prices = await driver.findElements(By.xpath("//tbody/tr/td[4]"));
    let locations = await driver.findElements(By.xpath("//tbody/tr/td[5]"));
    //   @-ts-ignore
    let returnedText = await driver.findElements(By.className("display-6"));
    const t = await returnedText[1].findElement(By.css("div"));
    const num = returnedText?.slice(3, returnedText.length - 1);
    console.log({ returnedText, t: await t.getText() });
    driver.quit();
    //   console.log(prices);
})();
// @ts-ignore
const addToArrays = (_prices, _locations) => {
    for (let price of _prices) {
        amounts = [...amounts, price];
    }
    for (let location of _locations) {
        addresses = [...addresses, location];
    }
};
// @ts-ignore
const recursiveCheck = async (addresses, driver, Button) => {
    // @ts-ignore
    let addressValue = await driver.findElements(By.xpath("//tbody/tr/td[5]"))[0];
    if (addresses[0].text === addressValue) {
        Button.click();
        recursiveCheck(addresses, driver, Button);
    }
    else {
        console.log("Base case Reached");
        addresses = addressValue;
    }
};
