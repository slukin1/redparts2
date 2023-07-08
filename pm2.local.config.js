module.exports = {
    apps: {
      name: 'jacokin',
      script: 'next start -p 3071',
      instances: 2,
      exec_mode: 'cluster',
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      env_local: {
        APP_ENV: 'local'
      }
    }
  }