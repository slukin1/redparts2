module.exports = {
    apps: [
      {
        name: 'jacokin',
        exec_mode: 'cluster',
        instances: 'max', // Or a number of instances
        script: '.next start -p 3071',
        // script: 'node_modules/next/dist/bin/next',
        args: 'start',
        env_local: {
          APP_ENV: 'local' // APP_ENV=local
        },
        env_development: {
          APP_ENV: 'dev' // APP_ENV=dev
        },
        env_production: {
          APP_ENV: 'prod' // APP_ENV=prod
        }
      }
    ]
  }

