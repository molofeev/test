var Service = require('node-mac').Service;
const { join } = require('path');

function isRunningFromAsar() {
    return /\.asar/.test(process.mainModule.path ? process.mainModule.path : '');
}

const scriptPath = isRunningFromAsar()
  ? join(__dirname, 'service.js')
  : join(__dirname, 'service.js');

// Create a new service object
var svc = new Service({
    name:'Hello World',
    description: 'The nodejs.org example web server.',
    script: scriptPath,
    wait: 2,
    grow: .5,
    daemonEnvs: {
        ELECTRON_RUN_AS_NODE: '1'
    }
});



module.exports = {
    isRunningFromAsar,
    svc
}