
export interface OofNodeMeta {
    cid: string;
    pc: string;
    /** name */
    n: string;
    /** owner id */
    fuuid: number;
    /** only for dir */
    pid?: string;

    /** only for file */
    fid?: string;
    /** only for file, sha1 */
    sha?: string;
    /** only for file, size */
    s?: number;

    /** modified time */
    t?: string;
    /** modified time? */
    te?: string;
    /** created time */
    tp?: string;
    /** 上次打开时间 */
    tu?: string;

    /** thumb */
    u?: string;
}

export interface OofOfflineTask {
    info_hash: string
    add_time: number
    percentDone: number
    size: number
    peers: number
    rateDownload: number
    name: string
    last_update: number
    left_time: number
    file_id: string
    delete_file_id: string
    move: number
    /**
     * -1: error
     * 1: downloading
     * 2: finished
     */
    status: number
    url: string
    del_path: string
    /** parent path id */
    wp_path_id: string
    def2: number
    play_long?: number
    can_appeal: number
}
