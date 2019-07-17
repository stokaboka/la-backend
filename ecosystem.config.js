/*
 * Copyright (c) 2018.  Igor Khorev, Orangem.me, igorhorev@gmail.com
 */

module.exports = {
    apps : [{
        name: "svs-la",
        script: "./dist/main.js",
        env: {
            NODE_ENV: "development",
        },
        env_production: {
            NODE_ENV: "production",
        },
	cwd: "/opt/webapps/svs/la"
    }]
}
