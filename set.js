const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoicUJoSUw2KzhLZ1QrTnJrZ01pOE83R1JjUW8wd252QW5Qc3RHeTBBcXYzbz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiVjNvdjlpcVJxZWJnNS80bVBTVFV3b0d1ejZsV21PT3hXM21yVTNuVUJnND0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJZSzJ3V3FrekpkV3dodHExNHdqbUZXQXAxNk1aVWMzeTN2S0Rzbkh6Nm5ZPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJTdmxUd3MzbTRrZW9YTDFTb09jK0U4dGUvOVRMaS83bktEYzZYUmR6VDNZPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkNCNzRzekJoOFoxSXdWc0RMbHpjNUJ0Kzg4OHorRlBpdFNWUmhpQXBQSG89In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjgrYms4cTAzdzRac0Q4aFdQZld3clpoaTVJUWtQRHJ2a25PLy9NQmQrMFE9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiWUthSmtDOXdIczZQWVJKRGlrcFBCTVFSbWxXTmE0WTNIRzBZRHJGaHJIaz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoicWlaR0ZlOHFOUTlQUzJLdCt2NFMwU3l1K2VlcW1LL1ZGK2VWMDRrKzh4dz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImIyWGRaREpKdEl2MmxyWVVJakNaaVlSc0lxSFpUeW96T3N4UjM5WXV4bHpJcDRRall2NW1sVnNTVGlubEZ0TE9ia3RBVTQrbjZIVy90Vk9qUGpDakF3PT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6NzQsImFkdlNlY3JldEtleSI6IkEwaDdHNHoyZGVDelBuY2k4NzlvZ04zaWtlZTkxQ1lYenlMUW1YQmdmQnM9IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbXSwibmV4dFByZUtleUlkIjozMSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjMxLCJhY2NvdW50U3luY0NvdW50ZXIiOjAsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJkZXZpY2VJZCI6IlJkZnA1aWN6VDZxMTc4MThEV3ZEb3ciLCJwaG9uZUlkIjoiMWZlOTAyNzItZDQyOS00OTI4LTk1ZTItOWZhZWExMzFkZDdkIiwiaWRlbnRpdHlJZCI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlhFM1RSR1d0RlM0QjFBY1RHNm0vNkNCWkVFcz0ifSwicmVnaXN0ZXJlZCI6dHJ1ZSwiYmFja3VwVG9rZW4iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiIxbEZ5Ym80NEVVK0s0ODhZUVBzM25SSTNRcVk9In0sInJlZ2lzdHJhdGlvbiI6e30sInBhaXJpbmdDb2RlIjoiVzZURjFUUTUiLCJtZSI6eyJpZCI6IjI1NTY3Mzg3NzQ2MjoxQHMud2hhdHNhcHAubmV0IiwibmFtZSI6ImdlZSJ9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDTXJTck4wRkVNaW4wTDhHR0FFZ0FDZ0EiLCJhY2NvdW50U2lnbmF0dXJlS2V5IjoiRndEUGk4bU1nR3U5WFZHTlhEaWs1aGpMSU9kdTFUdHRMNDM3Y2Rvc3FGdz0iLCJhY2NvdW50U2lnbmF0dXJlIjoiSStOSkZYeTdJdFAvclJkQml2c2Z2VFppOWluVVd4NkZpNHlCY05ZcUo5Z2U4blRjRVhHdnpRbHFCakg0WGJCSWp1dC9Qelh1MGVETitMaCtGNzUvQ2c9PSIsImRldmljZVNpZ25hdHVyZSI6IkVqb1Z3N1FqeDllcWJIU2ZJZ2pnNjIvQ2Q2ZDNDTDZUUzVRSHcxQW5lTWdodXV4MVZ2UjJwUG5EN25OREN3d1d2QXEzRmNLazhZb0pnUTBUSkRPSER3PT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiMjU1NjczODc3NDYyOjFAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCUmNBejR2SmpJQnJ2VjFSalZ3NHBPWVl5eURuYnRVN2JTK04rM0hhTEtoYyJ9fV0sInBsYXRmb3JtIjoic21iYSIsImxhc3RBY2NvdW50U3luY1RpbWVzdGFtcCI6MTc0NDA0OTExMX0=',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "Ibrahim Adams",
    NUMERO_OWNER : process.env.NUMERO_OWNER || " Ibrahim Adams",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
    BOT : process.env.BOT_NAME || 'BMW_MD',
    URL : process.env.BOT_MENU_LINKS || 'https://telegra.ph/file/17c83719a1b40e02971e4.jpg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'yes',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    CHATBOT : process.env.PM_CHATBOT || 'no',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
                  ANTIDELETE2 : process.env.ANTIDELETE2 || "yes",
                  ANTIDELETE1 : process.env.ANTIDELETE1 || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'no',
    ANYWAY_MD : process.env.AUTO_LIKE_STATUS || 'yes',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway" : "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway",
   
};

let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
