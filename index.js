const electron = require("electron");
const uuid = require("uuid");
const {
    app, 
    BrowserWindow, 
    Menu, 
    ipcMain
} = electron ;

let todayWindow;
let creteWindow;
let listWindow;

let allAppointment = [];

app.on("ready", ()=> {
    todayWindow = new BrowserWindow({
        webPreferences: {
            nodeIntegration: true
        },
        title : "Aplikasi Dokter"
    });

    todayWindow.loadURL(`file://${__dirname}/today.html`);
    todayWindow.on("closed", ()=> {

        app.quit();
        todayWindow = null;
    });

    const mainMenu = Menu.buildFromTemplate(menuTemplate);
    Menu.setApplicationMenu(mainMenu);

});

const listWindowCreator = () => {
    listWindow = new BrowserWindow({
        webPreferences: {
            nodeIntegration: true
        },
        width: 600,
        height: 400,
        title: "All Appoinments"
    });

    listWindow.setMenu(null);
    listWindow.loadURL(`file://${__dirname}/list.html`);
    listWindow.on("closed", () => (listWindow = null))
};
const createWindowCreator = () => {
    createWindow = new BrowserWindow({
        webPreferences: {
            nodeIntegration: true
        },
        width: 600,
        height: 400,
        title: "Create Appoinments"
    });

    createWindow.setMenu(null);
    createWindow.loadURL(`file://${__dirname}/create.html`);
    createWindow.on("closed", () => (createWindow = null))
};
    
ipcMain.on("appointment:create", (event, appointment) => {
    appointment["id"] = uuid();
    appointment["done"] = 0;
    allAppointment.push(appointment);

    createWindow.close();

    console.log(allAppointment);

    console.log(appointment);
});

ipcMain.on("appointment:request:list", event  => {
    console.log("here");
});

ipcMain.on("appointment:request:today", event  => {
    console.log("here2");
});

ipcMain.on("appointment:doe", (event, id) => {
    console.log("here3")
});


const menuTemplate = [{
        label: "File",
        submenu: [{
                label: "Aplikasi Baru",
                
                click() {
                    createWindowCreator();
                }
            },
            {
                label: "Semua Aplikasi",
                click() {
                    listWindowCreator();
                }
            },
            {
                label: "Quit",
                accelerator: process.platform === "darwin" ? "Command+Q" : "Ctrl + O",
                click() {
                    app.quit();
                }
            }
        
        ]
    },

    {

        label: "View",
        submenu: [{ role: "reload" }, { role: "toggledevtools" }]
    }
]