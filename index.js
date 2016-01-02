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
        connections: {
            https: {
                port: 4430,
                tls: {
                    key: fs.readFileSync("sealious.key"),
                    cert: fs.readFileSync("sealious.crt")
                }
            }
        },
        redirections: {
            http2https: {
                from: 8080,
                to: 4430,
                protocol: "https"
            }
        }
    }
);

Sealious.start();
