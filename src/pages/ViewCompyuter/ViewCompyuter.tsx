import { useEffect, useState } from 'react';
import { BASE_IMAGE_URL, BASE_URL } from '../../utils/urls';
import { Compyuter } from '../../types/compyuters';
import Skeleton from '../../components/Skeleton/Skeleton';
import axioss from '../../api/axios';
import { isAuthenticated } from '../../utils/auth';
import { Navigate, useParams } from 'react-router-dom';
import ModalMultySelectInputTexnology from '../../components/Input/ModalMultySelectInputTexnology';
import { ModalDataInput } from '../../components/Input/ModalDataInput';

const ViewCompyuter = () => {
  const { slug } = useParams()

  const [data, setData] = useState<Compyuter>()
  
  useEffect(() => {
    if (!slug) return;

    axioss
      .get(`${BASE_URL}/comp_detail/${slug}`)
      .then((response) => {
        setData(response.data);
      })
      .catch((err) => console.log(err));
  }, [slug]);


  if (!isAuthenticated()) {
    return <Navigate to="/auth/signin" />
  }
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-4">
        <div className="col-span-4">
          {/* <!-- Input Fields --> */}
          <div className=" py-5">
            {
              data ?
                <div>

                  <div className="grid sm:grid-cols-12">
                    <div className="sm:col-span-2">
                      <div className="">
                        <img src={`${BASE_IMAGE_URL}/${data?.qr_image}`} className="ml-12 sm:ml-0" alt="" />
                      </div>

                    </div>
                    <div className="col-span-10 ">
                      <h1 className='p-5 pt-5 pb-3 font-semibold'>Основные параметры</h1>
                      <div className="grid sm:grid-cols-12 gap-4 p-5 py-3 pb-5 border-b mb-2">
                        {data && <ModalDataInput label="Тип орг.техники" inputData={data?.type_compyuter?.name} />}
                        {data && <ModalDataInput label="Производитель МП" inputData={data?.motherboard?.name} />}

                        {data && <ModalDataInput label="Модель МП" inputData={data?.motherboard_model?.name} />}

                        {data && <ModalDataInput label="Процессор" inputData={data?.CPU?.name} />}

                        {data && <ModalDataInput label="Поколение процессора" inputData={data?.generation?.name} />}

                        {data && <ModalDataInput label="Частота процессора" inputData={data?.frequency?.name} />}

                        {data && <ModalDataInput label="Диск  HDD" inputData={data?.HDD?.name} />}

                        {data && <ModalDataInput label="Диск  SSD" inputData={data?.SSD?.name} />}

                        {data && <ModalDataInput label="Тип диска SSD" inputData={data?.disk_type?.name} />}

                        {data && <ModalDataInput label="Тип оперативки" inputData={data?.RAM_type?.name} />}

                        {data && <ModalDataInput label="Размер оперативной памяти" inputData={data?.RAMSize?.name} />}

                        {data && <ModalDataInput label="Видеокарта" inputData={data?.GPU?.name} />}

                      </div>

                      <h1 className='p-5 pt-2 pb-3 font-semibold'>Монитор</h1>
                      <div className="grid sm:grid-cols-12 gap-4 p-5 py-3 pb-5 border-b">
                        {data.type_monitor.length != 0 ? <div className='col-span-3'>
                          {data && <ModalMultySelectInputTexnology label="Монитор" selectedIdComp={data?.type_monitor} />}
                        </div> :
                          <div className='col-span-3'>
                            <h1>Нет монитора</h1>
                          </div>

                        }

                      </div>

                      <h1 className='p-5 pt-2 pb-3 font-semibold'>Периферийные устройства</h1>
                      <div className="grid sm:grid-cols-10 gap-4 p-5 py-3 pb-7 border-b">

                        <div className='col-span-2'>
                          {data && <ModalMultySelectInputTexnology label="Принтер" selectedIdComp={data?.printer} />}
                        </div>
                        <div className='col-span-2'>
                          {data && <ModalMultySelectInputTexnology label="Сканер" selectedIdComp={data?.scaner} />}
                        </div>
                        <div className='col-span-2'>
                          {data && <ModalMultySelectInputTexnology label="МФУ" selectedIdComp={data?.mfo} />}
                        </div>
                        <div className='col-span-2'>
                          {data && <ModalMultySelectInputTexnology label="Тип вебкамера" selectedIdComp={data?.type_webcamera} />}
                        </div>
                        <div className='col-span-2'>
                          {data && <ModalMultySelectInputTexnology label="Модель вебкамеры" selectedIdComp={data?.model_webcam} />}
                        </div>


                      </div>

                      <h1 className='p-5 pt-2 pb-3 font-semibold'>Подразделение</h1>
                      <div className="grid sm:grid-cols-12 gap-4 p-5 py-3 pb-7 border-b">


                        {data && <ModalDataInput label="Цех" inputData={data?.departament?.name} />}

                        {data && <ModalDataInput label="Отдел" inputData={data?.section?.name} />}

                        {data && <ModalDataInput label="Пользователь" inputData={data?.user} />}

                        {data && <ModalDataInput label="Руководитель подразделения" inputData={data?.departament?.boss_fullName} />}

                        {data && <ModalDataInput label="Зав. склад" inputData={data?.warehouse_manager?.name} />}

                      </div>
                      <div className="grid sm:grid-cols-12 gap-4 p-5 py-3 pb-5 ">

                        {data && <ModalDataInput label="Номер пломбы" inputData={data?.seal_number} />}
                        {data && <ModalDataInput label="IPv4 адрес" inputData={data?.ipadresss} />}

                        {data && <ModalDataInput label="Физический(MAC) адрес" inputData={data?.mac_adress} />}

                        <label className="flex items-center space-x-3 cursor-pointer text-gray-800 dark:text-gray-200 mt-8">
                          <span className="text-sm font-medium">Интернет</span>
                          <input
                            type="checkbox"
                            defaultChecked={
                              data ? data?.internet : true

                            }
                            disabled
                            className="w-4 h-4 border-gray-300 rounded focus:ring-2 focus:ring-brand-500 dark:bg-gray-700 dark:border-gray-600 dark:checked:bg-brand-500 dark:checked:border-brand-500 focus:ring-offset-0 focus:outline-none"
                          />
                        </label>
                      </div>
                    </div>

                  </div>
                </div> :

                <div className='grid grid-cols-12'>
                  <div className='col-span-3 '>
                    <Skeleton />
                  </div>
                  <div className='col-span-3 '>
                    <Skeleton />
                  </div>
                  <div className='col-span-3 '>
                    <Skeleton />
                  </div>
                  <div className='col-span-3 '>
                    <Skeleton />
                  </div>

                </div>

            }

          </div>
        </div>

      </div >

    </>
  );
};

export default ViewCompyuter;
