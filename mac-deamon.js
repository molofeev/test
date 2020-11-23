const { svc } = require('./utils')

svc.on('install',function(){
    console.log('onInstall',__dirname, svc.plist)
    svc.start();
});

// svc.on('errror', (error) => {
//     console.log('MAC_NODE', error)
// })

// svc.on('alreadyinstalled', (data) => {
//     console.log('alreadyinstalled', data)
//     svc.start();
// })

// svc.on('invalidinstallation', (data) => {
//     console.log('invalidinstallations', data)
// })

// svc.on('uninstall',function(){
//     console.log('Uninstall complete.');
//     console.log('The service exists: ',svc.exists)
// });

svc.on('start',function(){
    console.log(svc.name+' started!\n');
});

console.log(`run deamon`)
svc.install();