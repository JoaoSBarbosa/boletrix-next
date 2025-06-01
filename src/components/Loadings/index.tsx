import styles from './Loadings.module.css';

import { Animation} from "@/components/Animation";
import LodingAnimation from "../../../public/animations/loading.json"

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