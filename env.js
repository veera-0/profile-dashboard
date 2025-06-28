const fs = require('fs');
const targetPath = './src/environments/environment.prod.ts';

const envConfigFile = `
export const environment = {
  production: true,
  supabaseUrl: '${process.env.SUPABASE_URL}',
  supabaseKey: '${process.env.SUPABASE_ANNON_KEY}'
};`;

fs.writeFileSync(targetPath, envConfigFile);
