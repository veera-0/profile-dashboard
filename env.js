const fs = require('fs');
const targetPath = './src/environments/environment.prod.ts';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANNON_KEY;

console.log("checking the url and key: "+supabaseUrl + " " + supabaseKey);

const envConfigFile = `
export const environment = {
  production: true,
  supabaseUrl: '${process.env.SUPABASE_URL}',
  supabaseKey: '${process.env.SUPABASE_ANNON_KEY}'
};`;

fs.writeFileSync(targetPath, envConfigFile);
