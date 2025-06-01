import Lottie from 'react-lottie-player';

interface AnimationProps{
    animationSrc: any;
    width: string | number;
    height: string | number;
    title?: string;
}
export const Animation = ({animationSrc,height,width,title}:AnimationProps) =>{
    return(
        <Lottie title={ title } loop animationData={ animationSrc } play style={{width: width, height: height}}/>
    )
}