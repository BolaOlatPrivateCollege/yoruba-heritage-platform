import {defineConfig} from '@playwright/test';
export default defineConfig({testDir:'./e2e',fullyParallel:false,workers:1,retries:0,
  use:{baseURL:'http://127.0.0.1:4321',browserName:'chromium',trace:'retain-on-failure'},
  webServer:{command:'npm run preview -- --port 4321',url:'http://127.0.0.1:4321',reuseExistingServer:false,timeout:30000},
  reporter:[['list'],['html',{open:'never'}]],
});
