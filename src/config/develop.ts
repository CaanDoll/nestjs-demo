const integration = {
  knight: "http://10.8.241.147:8000/knight",
  customer: "http://10.8.241.147:8000/customer",
  uploadUrl: 'http://10.10.4.101:32720',
};

export default {
  port: 4000,
  orm: {
    type: 'mysql',
    host: "10.10.4.100",
    port: 30991,
    username: "root",
    password: "mysql123",
    database: "order_dev",
    logging: true,
    entities: ["dist/module/**/*.model.js"],
    timezone: '+00:00',
  },
  // 开发环境
  redis: {
    host: "10.10.4.101",
    port: "31104",
    password: "kunlun_2019$ABC",
    db: 0
  },
  ftp: {
    host: "10.8.250.34",
    user: "ftpuser",
    password: "LdKCbCM70iormeQ"
  }
};
