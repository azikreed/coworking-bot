const config = {
    NODE_ENV: process.env.NODE_ENV || 'development',
    BOT_TOKEN: process.env.BOT_TOKEN,
    MONGO_URI: process.env.MONGO_URI,
    REDIS_HOST: process.env.REDIS_HOST,
    REDIS_PORT: process.env.REDIS_PORT,
    SESSION_TYPE: process.env.SESSION_TYPE,
    GROUP_ID: process.env.GROUP_ID
};

module.exports = config;