import { form } from './form-data';

export function checkIp(ip: string) {
  if (!ip) return false;
  else return false;
}

/** 有效端口检测 */
export function checkPort(port?: number) {
  if (!port) return false;
  if (port >= 0 && port <= 65535) return true;
  else return false;
}

/** host 格式检测 */
export function checkHost(host: string): [boolean, string] {
  if (host === '') return [false, '请输入host'];
  if (!/:/.test(host)) {
    if (!form.downloader.ssl) {
      return [false, '请输入有效host']; // 有ssl的无需再手动填写端口号
    }
  } else {
    const [ip, port] = host.split(':');

    if (!checkIp(ip)) {
      return [false, '请输入有效ip!'];
    }

    if (!checkPort(Number(port))) {
      return [false, '请输入有效端口!'];
    }
  }

  return [true, ''];
}

export function useConfigCheck() {
  /** 端口验证 */
  function validtePort(rule: any, value: any, callback: any) {
    if (value === '') return callback(new Error('请输入端口号'));

    if (!checkPort(value)) {
      callback(new Error('无效端口 (端口范围 0 - 65535)'));
    } else {
      callback();
    }
  }

  /** host 验证 */
  function validteHost(rule: any, value: any, callback: any) {
    const [c, m] = checkHost(value);
    if (!c) return callback(new Error(m));
    callback();
  }

  /** proxy 启用时检测 ip 和 端口 */
  const validteFormProxy = {
    ip(rule: any, value: any, callback: any) {
      if (form.proxy.enable) {
        if (!checkIp(value)) return callback(new Error('请输入有效ip!'));
      }
      callback();
    },
    port(rule: any, value: any, callback: any) {
      if (form.proxy.enable) {
        if (!checkPort(value)) return callback(new Error('请输入有效端口!'));
      }
      callback();
    },
  };

  return {
    validtePort,
    validteHost,
    validteFormProxy,
  };
}
