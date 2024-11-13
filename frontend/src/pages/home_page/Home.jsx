
import { styles } from "../../styles";

const Home = () => {
  return (
      <div className=' flex-col'>
          <div className={`flex `}>
              <div
                  className='h-[200px] w-[200px] bg-myColor-primary text-white flex justify-center items-center'> Primary
              </div>
              <div
                  className='h-[200px] w-[200px] bg-slate-800 text-white flex justify-center items-center'> Primary
              </div>
          </div>
          <div className={`flex `}>
              <div
                  className='h-[200px] w-[200px] bg-myColor-secondary text-white flex justify-center items-center'> secondary
              </div>
              <div
                  className='h-[200px] w-[200px] bg-slate-700 text-white flex justify-center items-center'> secondry
              </div>
          </div>

          <div className={`flex `}>
              <div
                  className='h-[200px] w-[200px] bg-myColor-dark text-white flex justify-center items-center'> dark
              </div>
              <div
                  className='h-[200px] w-[200px] bg-slate-900 text-white flex justify-center items-center'> dark
              </div>
          </div>
          <div className={`flex `}>
              <div
                  className='h-[200px] w-[200px] bg-myColor-medium text-white flex justify-center items-center'> medium
              </div>
              <div
                  className='h-[200px] w-[200px] bg-slate-300 text-white flex justify-center items-center'> ligh
              </div>
          </div>
          <div className={`flex `}>
              <div
                  className='h-[200px] w-[200px] bg-myColor-light text-white flex justify-center items-center'> ligh
              </div>
              <div
                  className='h-[200px] w-[200px] bg-slate-300 text-white flex justify-center items-center'> ligh
              </div>
          </div>
          <div className={`flex `}>
              <div
                  className='h-[200px] w-[200px] bg-myColor-extraLight text-white flex justify-center items-center'> ligh
              </div>
              <div
                  className='h-[200px] w-[200px] bg-slate-200 text-white flex justify-center items-center'> extra ligh
              </div>
          </div>
      </div>
  );
}

export default Home;
