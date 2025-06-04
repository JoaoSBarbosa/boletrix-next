import styles from './Loadings.module.css';

import { Animation} from "@/components/Animation";
import LodingAnimation from "../../../public/animations/loading.json"
import DownloadFilesAnimation from "../../../public/animations/DownloadAnimation.json";
import DeleteAnimation from '../../../public/animations/DeleteAnimation.json';

interface LoadingProps {
    title?: string;
    message?: string;
    animationWidth?: string | number;
    animationHeight?: string | number;
    containerWidth?: string | number;
    containerHeight?: string | number;
}
export const Loading = ({animationHeight,animationWidth, containerHeight, containerWidth, message,title}:LoadingProps) =>{

    return(
        <div
            className={`${styles.loadingBoxRoot}`}
            style={{
            width: containerWidth,
            height: containerHeight
        }}>
            <h1>{ title ? title : "Aguarde um momento..."}</h1>
            <Animation animationSrc={LodingAnimation} width={animationWidth ? animationWidth : "220px"} height={ animationHeight ? animationHeight : "220px"}/>
            {
                message &&
                <p>{message}</p>
            }
        </div>
    )




}


interface DownloadingOrDeletingBoxProps  {
    title?: string;
    message?: string;
    width?: string | number;
    height?: string | number;
    widthAnimation?: string;
    heightAnimation?: string;

    isDelete: boolean;
}

export function DownloadingOrDeletingBox({
                                             title,
                                             message,
                                             width,
                                             widthAnimation = "220px",
                                             heightAnimation = "220px",
                                             height,
                                             isDelete
                                         }: DownloadingOrDeletingBoxProps) {
    return (
        <div
            className={styles.loadingBoxRoot}
            style={{
                width: width,
                height: height
            }}
        >
            <h1>{title ? title : 'Aguarde um momento...'}</h1>

            <Animation
                animationSrc={isDelete ? DeleteAnimation : DownloadFilesAnimation}
                width={widthAnimation}
                height={heightAnimation}
            />

            {
                message &&
                <p>{message}</p>
            }
        </div>
    );
}
