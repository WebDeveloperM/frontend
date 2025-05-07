import React, { ReactNode } from 'react';

interface CardDataStatsProps {
  title: string;
  total: string;
  setSelectKey: React.Dispatch<React.SetStateAction<string | null>>;
  children: ReactNode;
}

const CardDataStats: React.FC<CardDataStatsProps> = ({
  title,
  total,
  setSelectKey,
  children,
}) => {
  return (
    <div onClick={() => setSelectKey(title)} className="rounded-sm border hover:scale-105 duration-200 hover:cursor-pointer border-stroke bg-white py-6 px-7.5 shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className='grid grid-cols-12 justify-between items-center'  >
        <div className='col-span-10'>
          <div className="mt-4 flex items-end justify-between">
            <div>
              <h4 className="text-title-md font-bold text-black dark:text-white">
                {total}
              </h4>
              <span className="text-sm font-medium hover:underline cursor-pointer">{title}</span>
            </div>
          </div>
        </div>
        <div className='col-span-2'>
          <div className=''>
            <div className="flex h-11.5 w-11.5 items-center justify-center rounded-full bg-meta-2 dark:bg-meta-4">
              {children}
            </div>
          </div>
        </div>
        <div></div>
      </div>



    </div>
  );
};

export default CardDataStats;
