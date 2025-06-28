import type { OofNodeMeta, OofOfflineTask } from "./types";

export interface OofAPIList {
  "/files": {
    baseURL: "https://webapi.115.com";
    method: "GET";
    params: {
      /** 1 */
      aid: number;
      limit: number;
      /** 1 */
      show_dir: number;
      /** 0 for root */
      cid: string;
      offset: number;
    };
    response: {
      state: boolean;
      errNo: number;
      error: string;
      data: OofNodeMeta[];
      path: {
        name: string;
        cid: string;
      }[];
    };
  };
  "/files/batch_rename": {
    baseURL: "https://webapi.115.com";
    method: "POST";
    body: {
      /** if it's dir, means cid */
      fid: string;
      file_name: string;
      /**
       * example: "files_new_name[62734726348621939]": string;
       */
      [files_new_name_fid: string]: string;
    };
    response: {
      errno: number;
      error: string;
      state: boolean;
      data: {
        [fid: string]: string;
      };
    };
  };
  "/files/add": {
    baseURL: "https://webapi.115.com";
    method: "POST";
    body: {
      pid: string;
      cname: string;
    };
    response: {
      errno: number;
      error: string;
      cid: string;
      file_id: string;
      file_name: string;
    };
  };

  "/files/move": {
    baseURL: "https://webapi.115.com";
    method: "POST";
    body: {
      pid: string;
      /**
       * generated manually, can be used to check progress
       */
      move_proid: string;
      /**
       * example: "fid[1]": string;
       */
      [fidIndex: string]: string;
    };
    response: {
      errno: number;
      error: string;
      state: boolean;
    };
  };

  "/rb/delete": {
    baseURL: "https://webapi.115.com";
    method: "POST";
    body: {
      pid: string;
      ignore_warn: "1";
      /** fid[0]: 79823749823, fid for file, cid for dir */
      [fidIndex: string]: string;
    };
    response: {
      errno: number;
      error: string;
      state: boolean;
    };
  };

  "/files/index_info": {
    baseURL: "https://webapi.115.com";
    method: "GET";
    params: {};
    response: {
      code: number;
      error: string;
      state: boolean;
      data: {
        imei_info: boolean;
        login_devices_info: any;
        photo_info: any;
        space_info: Record<
          "all_remain" | "all_total" | "all_use",
          {
            size: number;
            size_format: string;
          }
        >;
      };
    };
  };

  "/files/image": {
    baseURL: "https://webapi.115.com";
    method: "GET";
    params: {
      pickcode: string;
      /** current time, millseconds */
      _: number;
    };
    response: {
      state: boolean;
      data: {
        /** thumb */
        url: string;
        all_url: string[];
        /** origin height&width, but size zipped, cookie is not required */
        origin_url: string;
        /** cookie is required when request it */
        source_url: string;
        file_name: string;
        file_sha1: string;
        pick_code: string;
      };
    };
  };

  /** for image(small file) only */
  "/files/download": {
    baseURL: "https://webapi.115.com";
    method: "GET";
    params: {
      pickcode: string;
      /** current time, millseconds */
      _: number;
    };
    response: {
      state: boolean;
      msg: string;
      msg_code: number;
      is_115chrome: number;
      is_snap: number;
      is_vip: number;
      file_name: string;
      file_size: string;
      pickcode: string;
      file_id: string;
      user_id: number;
      /** cookie is required when request it */
      file_url: string;
    };
  };

  "/?ac=space&ct=offline": {
    baseURL: "https://115.com/";
    method: "GET";
    params: {};
    response: {
      state: boolean;
      data: number;
      size: string;
      url: string;
      bt_url: string;
      limit: number;
      sign: string;
      time: number;
    };
  };

  "/web/lixian/?ct=lixian": {
    baseURL: "https://115.com/";
    method: "POST";
    params: {
      ac: "add_task_url" | "add_task_urls";
    };
    body: {
      url: string | string[];
      /** empty */
      savepath: string;
      wp_path_id: string;
      uid: string;
      sign: string;
      time: number;
    };
    response: {
      state: boolean;
      errno: number;
      errtype: string;
      errcode: number;
      error_msg: string;
      info_hash: string;
      url: string;
      name?: string;
      // 如果存在多个链接，则响应存在result字段
      result?: {
        state: boolean;
        errno: number;
        errtype: string;
        errcode: number;
        error_msg: string;
        info_hash: string;
        url: string;
      }[];
    };
  };

  "/web/lixian/?ct=lixian&ac=task_lists": {
    baseURL: "https://115.com/";
    method: "POST";
    params: {};
    body: {
      /** 从1开始 */
      page: number;
      uid: string;
      sign?: string;
      time?: number;
    };
    response: {
      state: boolean;
      errtype: string;
      page: number;
      /** 总数量 */
      count: number;
      /** 总页数 */
      page_count: number;
      page_row: number;
      quota: number;
      tasks: OofOfflineTask[];
    };
  };

  /** come from https://github.com/acgotaku/115/blob/master/src/js/home.js#L160 */
  "/app/chrome/downurl": {
    baseURL: "https://proapi.115.com/";
    method: "POST";
    params: {
      /** timestamp, second */
      t: number;
    };
    /** the data which encoded by Secret. e.g. data=xxxxxx */
    body: string;
    response: {
      errno: number;
      msg: string;
      state: boolean;
      data: string;
    };
  };

  "/files/push_extract": {
    baseURL: "https://webapi.115.com";
    method: "GET";
    params: {
      pick_code: string;
    };
    response: {
      code: number;
      state: boolean;
      message: string;
      data: {
        extract_status: {
          /** 0：开始解压 1：解压中 4: 解压完成 6：需要密码*/
          unzip_status: number;
          progress: number;
          message: string;
        };
      };
    };
  };
  "/files/push_extract?for=pwd": {
    baseURL: "https://webapi.115.com";
    method: "POST";
    body: {
      pick_code: string;
      secret: string;
    };
    response: {
      state: boolean;
      unzip_status: number;
      message: string;
    };
  };

  "/files/extract_info": {
    baseURL: "https://webapi.115.com";
    method: "GET";
    params: {
      pick_code: string;
      file_name: string;
      paths: string;
      page_count: number;
    };
    response: {
      code: number;
      state: boolean;
      message: string;
      data: {
        list: {
          file_name: string;
          ico: string;
          size: number;
          /** 0: folder 1: file */
          file_category: number;
          time: number;
        }[];
        paths: { name: string }[];
      };
    };
  };

  "/files/add_extract_file": {
    baseURL: "https://webapi.115.com";
    method: "POST";
    body: {
      pick_code: string;
      extract_dir: string[];
      extract_file: string[];
      to_pid: string;
      paths: string;
    };
    response: {
      code: number;
      message: string;
      state: boolean;
      data: {
        extract_id: number;
      };
    };
  };
  "/files/add_extract_file?for=extract_detail": {
    baseURL: "https://webapi.115.com";
    method: "GET";
    params: {
      extract_id: number;
    };
    response: {
      code: number;
      state: boolean;
      message: string;
      data: {
        extract_id: number;
        percent: number;
        to_pid: string;
      };
    };
  };
}

export type OofRequest<T extends keyof OofAPIList> = {
  url: T;
  baseURL: OofAPIList[T]["baseURL"];
  method: OofAPIList[T]["method"];
  params: OofAPIList[T] extends { params: infer P } ? P : unknown;
  data?: OofAPIList[T] extends { body: infer B } ? B : never;
  headers?: Record<string, string>;
};

export type OofResponse<T extends keyof OofAPIList> = OofAPIList[T]["response"];
