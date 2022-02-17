import Text from './Text';
import Image from './Image';
import Audio from './Audio';
import Video from './Video';
import UnknownFile from './UnknownFile';
import { fileURL } from '../features/Router';
import { useRecoilValue } from 'recoil';
import { folderPath as folderPathState } from '../features/Atoms';

const videosTypes: string[] = [".mp4", ".webm", ".ogg"];
const imageTypes: string[] = [".jpg", ".png", ".jpeg", ".gif", ".apng", ".bmp", ".PNG", ".JPG", ".JPEG"];
const audioTypes: string[] = [".mp3", ".wav", ".ogg"];
const textTypes: string[] = [".txt", ".js", ".php", ".ts", ".rs", ".go", ".tsx"];

export default () => {

    const path = useRecoilValue(folderPathState) || fileURL();

    const fileType = (arr: string[]) => {
        return arr.some(typ => path.endsWith(typ));
    }

    return (
        <>
            {
                fileType(textTypes) ?
                    <Text path={path} />
                : fileType(audioTypes) ?
                    <Audio path={path} />
                : fileType(videosTypes) ?
                    <Video path={path} />
                : fileType(imageTypes) ?
                    <Image path={path} />
                :
                <UnknownFile path={path} />
            }
        </>
    )
}