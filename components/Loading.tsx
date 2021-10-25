import Image from 'next/image';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import Loader from 'react-loader-spinner';

const Loading = () => {
   return (
      <div style={{ display: 'grid', placeItems: 'center', height: '100vh', textAlign: 'center' }}>
         <div>
            <Image
               src="http://assets.stickpng.com/images/580b57fcd9996e24bc43c543.png"
               alt=""
               width={200}
               height={200}
            ></Image>
            <Loader
               type="Circles"
               color="#3CBC28"
               height={50}
               width={50}
            />
         </div>
      </div>
   )
};

export default Loading;