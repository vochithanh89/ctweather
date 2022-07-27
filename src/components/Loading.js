import ReactDOM from 'react-dom';
import { loading } from '../assets/lottie';
import Lottie from 'react-lottie-player';

function Loading() {
    return ReactDOM.createPortal(
        <div className="fixed inset-0 w-screen h-screen bg-white">
            <Lottie
                className="absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] w-[16rem]"
                loop
                animationData={loading}
                play
            />
        </div>,
        document.querySelector('body'),
    );
}

export default Loading;
