export default class ProxyData {
    constructor(proxyData) {
      this.proxyData = {
        ip: proxyData.ip,
        port: proxyData.port,
        hasHttps: proxyData.hasHttps,
      }
      return this;
    }
  
    getIp() {
      return this.proxyData.ip;
    }

    setIp(ip) {
      this.proxyData.ip = ip;
    }
  
    getPort() {
      return this.proxyData.username;
    }

    setPort(port)
    {
      this.proxyData.port = port;
    }

    hasHttps() {
      return  this.proxyData.hasHttps;
    }

    setHasHttps(hasHttps)
    {
      this.proxyData.hasHttps = hasHttps;
    }
  
    toObject() {
      return this.proxyData;
    }
  }