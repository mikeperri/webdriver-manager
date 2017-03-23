import * as path from 'path';
import {Logger, WriteTo} from '../../lib/cli/logger';
import {program} from '../../lib/cmds/update';
import {Config} from '../../lib/config';
import {spawn} from '../../lib/utils';

fdescribe('start', () => {
  Logger.writeTo = WriteTo.NONE;
  let argv: any;

  let tmpDir = path.resolve('selenium_test');
  beforeAll((done) => {
    argv = {'_': ['update'], 'out_dir': tmpDir, 'android': false, 'ios': false};
    program.run(JSON.parse(JSON.stringify(argv)))
        .then(() => {
          done();
        })
        .catch(err => {
          done.fail();
        });
  });

  it('should send the started signifier when the Selenium server starts', (done) => {
    console.log('Will run START command!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');

    let cp = spawn(
        process.execPath,
        [
          'built/lib/webdriver.js', 'start', '--started-signifier', 'MY_STARTED_SIGNIFIER',
          '--signal-via-ipc', 'true'
        ],
        'pipe');

    cp.on('message', (m) => {
      console.log('got message', m);
      done();
    });
  }, 10000);
});
