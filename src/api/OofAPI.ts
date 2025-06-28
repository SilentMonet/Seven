import { OofAPIList, OofRequest, OofResponse } from "./api";
// @ts-ignore
import Secret from "./Secret";

export class OofError extends Error {
  code: number;
  constructor(code: number, message: string) {
    super(message);
    this.code = code;
  }

  toString() {
    return this.message;
  }
}

export class OofAPIFactory{
  request: <K extends keyof OofAPIList>(requestConfig: OofRequest<K>) => Promise<OofResponse<K>>;
  constructor(
    request: <K extends keyof OofAPIList>(requestConfig: OofRequest<K>) => Promise<OofResponse<K>>
  ) {
    this.request = function (requestConfig) {
      return request(requestConfig);
    };
  }

  async list(cid: string, offset: number = 0, limit: number = 1000) {
    const resp = await this.request({
      baseURL: "https://webapi.115.com",
      url: "/files",
      method: "GET",
      params: {
        aid: 1,
        limit,
        show_dir: 1,
        cid,
        offset,
      },
    });
    if (resp.state) return resp;
    throw new OofError(resp.errNo, resp.error);
  }

  async rename(fid: string, name: string) {
    const resp = await this.request({
      baseURL: "https://webapi.115.com",
      url: "/files/batch_rename",
      method: "POST",
      params: {},
      data: {
        fid,
        file_name: name,
        [`files_new_name[${fid}]`]: name,
      },
      headers: {
        "content-type": "application/x-www-form-urlencoded",
      },
    });
    if (resp.state) return resp;
    throw new OofError(resp.errno, resp.error);
  }

  async createFolder(pid: string, cname: string) {
    const resp = await this.request({
      baseURL: "https://webapi.115.com",
      url: "/files/add",
      method: "POST",
      params: {},
      data: {
        pid,
        cname,
      },
      headers: {
        "content-type": "application/x-www-form-urlencoded",
      },
    });
    if (resp.cid) return resp;
    throw new OofError(-1, resp.error);
  }

  async move(pid: string, fids: string[]) {
    const resp = await this.request({
      baseURL: "https://webapi.115.com",
      url: "/files/move",
      method: "POST",
      params: {},
      data: fids.reduce<{
        pid: string;
        move_proid: string;
        [id: string]: string;
      }>(
        (data, fid, index) => {
          data[`fid[${index}]`] = fid;
          return data;
        },
        {
          pid,
          move_proid: String(~(Math.random() * 100000)),
        }
      ),
      headers: {
        "content-type": "application/x-www-form-urlencoded",
      },
    });
    if (resp.state) return resp;
    throw new OofError(resp.errno, resp.error);
  }

  async delete(pid: string, fids: string[]) {
    const resp = await this.request({
      baseURL: "https://webapi.115.com",
      url: "/rb/delete",
      method: "POST",
      params: {},
      data: fids.reduce<{
        pid: string;
        ignore_warn: "1";
        [id: string]: string;
      }>(
        (data, fid, index) => {
          data[`fid[${index}]`] = fid;
          return data;
        },
        {
          pid,
          ignore_warn: "1",
        }
      ),
      headers: {
        "content-type": "application/x-www-form-urlencoded",
      },
    });
    if (resp.state) return resp;
    throw new OofError(resp.errno, resp.error);
  }

  async getOfflineSign() {
    const resp = await this.request({
      baseURL: "https://115.com/",
      url: "/?ac=space&ct=offline",
      method: "GET",
      params: {},
    });
    if (resp.state) return resp;
    throw new OofError(-1, "Get sign failed");
  }

  async addOfflineTask(
    url: string | string[],
    uid: string,
    wp_path_id: string,
    sign: string,
    time: number,
    savepath: string = ""
  ) {
    const resp = await this.request({
      baseURL: "https://115.com/",
      url: "/web/lixian/?ct=lixian",
      method: "POST",
      params: {
        ac: typeof url === "string" ? "add_task_url" : "add_task_urls",
      },
      data: {
        url: typeof url === "string" ? url : [...url, [] as any],
        savepath,
        wp_path_id,
        uid,
        sign,
        time,
      },
      headers: {
        "content-type": "application/x-www-form-urlencoded",
      },
    });
    if (resp.state) return resp;
    throw new OofError(resp.errno, resp.error_msg);
  }

  async getIndexInfo() {
    const resp = await this.request({
      baseURL: "https://webapi.115.com",
      url: "/files/index_info",
      method: "GET",
      params: {},
    });
    if (resp.state) return resp;
    throw new OofError(resp.code, resp.error);
  }

  async getOfflineTasks(page: number, uid: string, sign?: string, time?: number) {
    const resp = await this.request({
      baseURL: "https://115.com/",
      url: "/web/lixian/?ct=lixian&ac=task_lists",
      method: "POST",
      params: {},
      data: {
        page: page,
        uid,
      },
      headers: {
        "content-type": "application/x-www-form-urlencoded",
      },
    });
    if (resp.state) return resp;
    throw new OofError(-1, "Get tasks failed");
  }

  async getImageUrl(pickcode: string) {
    const resp = await this.request({
      baseURL: "https://webapi.115.com",
      url: "/files/image",
      method: "GET",
      params: {
        pickcode,
        _: Date.now(),
      },
    });
    if (resp.state) return resp.data;
    throw new OofError(-1, "Get url failed");
  }

  async getImageDownloadUrl(pickcode: string) {
    const resp = await this.request({
      baseURL: "https://webapi.115.com",
      url: "/files/download",
      method: "GET",
      params: {
        pickcode,
        _: Date.now(),
      },
    });
    if (resp.state) return resp;
    throw new OofError(resp.msg_code, resp.msg);
  }

  async getDownloadUrl(pickcode: string): Promise<string> {
    let timestamp = Math.floor(Date.now() / 1000);
    const { data, key } = Secret.encode(
      JSON.stringify({
        pickcode,
      }),
      timestamp
    );

    const resp = await this.request({
      baseURL: "https://proapi.115.com/",
      url: "/app/chrome/downurl",
      method: "POST",
      params: {
        t: timestamp,
      },
      data: `data=${encodeURIComponent(data)}`,
      headers: {
        "content-type": "application/x-www-form-urlencoded",
      },
    });

    // 如果解析出错，有可能是axios interceptor没有提前处理resp，导致这里拿到的是AxiosResponse
    const result = JSON.parse(Secret.decode(resp.data, key));
    /** 这是一个以node id为key的object，对应的value格式如下
     * {
        "file_name": "Rain.Man-sample.mkv",
    "file_size": "105822001",
    "pick_code": "ci91iopyaom87dzpy",
    "url": {
        "url": "https://cdnfhnfdfs.115.com/group582/M00/55/4E/tzyL-lKUnkMAAAAABk63MUru7Rw6522601/Rain.Man-sample.mkv?t=1687359355&u=101234013&s=104857600&d=vip-3755320326-ci91iopyaom87dzpy-1&c=2&f=1&k=b55220c89301ed9942c2c3dd9bc95b5b&us=1048576000&uc=10&v=1",
        "client": 1,
        "desc": null,
        "isp": null,
        "oss_id": "fhnfdfs/group582/M00/55/4E/tzyL-lKUnkMAAAAABk63MUru7Rw6522601",
        "ooid": ""
    }
}
     */
    const urlResult: any = Object.values(result).pop();
    if (!urlResult?.url?.url) {
      throw new Error("获取下载链接失败");
    }

    return urlResult?.url?.url;
  }

  async pushExtract(pickcode: string) {
    const resp = await this.request({
      baseURL: "https://webapi.115.com",
      url: "/files/push_extract",
      method: "GET",
      params: {
        pick_code: pickcode,
      },
    });
    if (resp.state) return resp;
    throw new OofError(resp.code, resp.message);
  }

  async pushExtractPwd(pickcode: string, secret: string) {
    const resp = await this.request({
      baseURL: "https://webapi.115.com",
      url: "/files/push_extract?for=pwd",
      method: "POST",
      params: {},
      data: {
        pick_code: pickcode,
        secret,
      },
      headers: {
        "content-type": "application/x-www-form-urlencoded",
      },
    });
    if (resp.state) return resp;
    throw new OofError(-1, resp.message);
  }

  async getZipDir(pickCode: string, paths: string[] = []) {
    const resp = await this.request({
      baseURL: "https://webapi.115.com",
      url: "/files/extract_info",
      method: "GET",
      params: {
        pick_code: pickCode,
        file_name: paths[paths.length - 1] || "",
        paths:
          "文件" +
          (paths.length > 1 ? [""].concat(paths).slice(0, -1).join("/") : ""),
        page_count: 999,
      },
    });
    if (resp.state) return resp.data;
    throw new OofError(resp.code, resp.message);
  }

  async addExtractFile(
    pickCode: string,
    /** 要从压缩文件解压的文件夹 */
    extractDir: string[],
    /** 要从压缩文件解压的文件 */
    extractFile: string[],
    toPid: string,
    /** extractDir的父路径 */
    paths: string
  ) {
    const resp = await this.request({
      baseURL: "https://webapi.115.com",
      url: "/files/add_extract_file",
      method: "POST",
      params: {},
      data: {
        pick_code: pickCode,
        extract_dir: extractDir,
        extract_file: extractFile,
        to_pid: toPid,
        paths,
      },
      headers: {
        "content-type": "application/x-www-form-urlencoded",
      },
    });
    if (resp.state) return resp.data.extract_id;
    throw new OofError(resp.code, resp.message);
  }

  async getExtractDetail(extractId: number) {
    const resp = await this.request({
      baseURL: "https://webapi.115.com",
      url: "/files/add_extract_file?for=extract_detail",
      method: "GET",
      params: {
        extract_id: extractId,
      },
    });
    if (resp.state) return resp.data;
    throw new OofError(resp.code, resp.message);
  }
}
