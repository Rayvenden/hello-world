var fs = require("fs");
var Sealious = require("sealious");

Sealious.init();

new Sealious.ChipTypes.ResourceType({
name: "person",
fields: [
{name: "name", type: "text", required: true},
{name: "age", type: "int", required: true}
]});

Sealious.ConfigManager.set_config(
    "chip.channel.www_server", {
        connections: [
            { // HTTPS section
                port: 4430,
                tls: {
                    key: fs.readFileSync("sealious.key"),
                    cert: fs.readFileSync("sealious.crt")
                }
            },
            { // HTTP section
                port: 8080,
                routes: { cors: true }
            }
        ],
        redirections: [{ // HTTP 2 HTTPS redirection
            from: 8080,
            to: 4430,
            protocol: "https"
        }]
    }
);

Sealious.start();
