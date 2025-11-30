import { Avatar } from "@mui/material";
import {
    Folder as FolderIcon,
    Image as ImageIcon,
    Movie as MovieIcon,
    AudioFile as AudioFileIcon,
    PictureAsPdf as PdfIcon,
    Description as FileIcon,
    InsertDriveFile as DefaultIcon,
    Code as CodeIcon,
    FolderZip as ZipIcon,
    Android as AndroidIcon,
} from "@mui/icons-material";
import type { OofNodeMeta } from "../api";

interface Props {
    nodeMeta: OofNodeMeta;
}

export function OofNodeIcon({ nodeMeta }: Props) {
    const name = nodeMeta.n;
    const isDir = !nodeMeta.sha; // Based on previous observation that sha is only for files
    const thumb = nodeMeta.u;

    if (thumb) {
        return (
            <Avatar
                src={thumb}
                variant="rounded"
                alt={name}
                sx={{ width: 40, height: 40 }}
            />
        );
    }

    if (isDir) {
        return <FolderIcon color="primary" sx={{ fontSize: 40 }} />;
    }

    const ext = name.split('.').pop()?.toLowerCase();

    let Icon = DefaultIcon;
    let color: "inherit" | "action" | "disabled" | "primary" | "secondary" | "error" | "info" | "success" | "warning" = "action";

    switch (ext) {
        case 'jpg':
        case 'jpeg':
        case 'png':
        case 'gif':
        case 'bmp':
        case 'webp':
            Icon = ImageIcon;
            color = "primary";
            break;
        case 'mp4':
        case 'mkv':
        case 'avi':
        case 'mov':
        case 'wmv':
            Icon = MovieIcon;
            color = "error";
            break;
        case 'mp3':
        case 'wav':
        case 'flac':
        case 'aac':
            Icon = AudioFileIcon;
            color = "secondary";
            break;
        case 'pdf':
            Icon = PdfIcon;
            color = "error";
            break;
        case 'zip':
        case 'rar':
        case '7z':
        case 'tar':
        case 'gz':
            Icon = ZipIcon;
            color = "warning";
            break;
        case 'js':
        case 'ts':
        case 'tsx':
        case 'jsx':
        case 'html':
        case 'css':
        case 'json':
            Icon = CodeIcon;
            color = "info";
            break;
        case 'apk':
            Icon = AndroidIcon;
            color = "success";
            break;
        case 'txt':
        case 'md':
        case 'doc':
        case 'docx':
            Icon = FileIcon;
            color = "action";
            break;
        default:
            Icon = DefaultIcon;
            break;
    }

    return <Icon color={color} sx={{ fontSize: 40 }} />;
}