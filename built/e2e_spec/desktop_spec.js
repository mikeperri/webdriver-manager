"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const os = require("os");
const webdriver = require("selenium-webdriver");
let browsers = require('./target_browsers')[os.type()];
describe('desktop browser smoke tests', () => {
    browsers.forEach((browserName) => {
        it('should be able to boot up ' + browserName, (done) => {
            let driver = new webdriver.Builder()
                .usingServer('http://localhost:4444/wd/hub')
                .withCapabilities({ browserName: browserName })
                .build();
            driver.get('http://localhost:4444/wd/hub/status')
                .then(() => {
                return driver.getPageSource();
            })
                .then((source) => {
                expect(source).toContain('"state":"success"');
                return driver.quit();
            })
                .then(() => {
                done();
            });
        }, 60 * 1000);
    });
});
//# sourceMappingURL=desktop_spec.js.map