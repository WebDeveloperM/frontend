import { useEffect, useState } from "react";
import axioss from "../../api/axios";
import { BASE_URL } from "../../utils/urls";

import { Compyuter } from "../../types/compyuters";
import MultySelectTexnologyProgram from "../../components/SelectedGroup/MultySelectTexnologyProgram";
import {useParams} from "react-router-dom";

export default function ViewPO() {
    const [program, setProgramId] = useState<number[] | null>(null);
    const [compyuterDetailData, setCompyuterDetailData] = useState<Compyuter>()
    const [isSubmitted, setIsSubmitted] = useState<boolean | null>(false)
    const { slug } = useParams()



      useEffect(() => {
            if (!slug) return;

        axioss
          .get(`${BASE_URL}/comp_detail/${slug}`)
          .then((response) => {
            setCompyuterDetailData(response.data);
          })
          .catch((err) => console.log(err));
        }  , [slug]);





    return (
        <div className="grid grid-cols-1 sm:grid-cols-12">

            <div className="col-span-12 mx-3">

                <div className="grid grid-cols-12 gap-5">
                    <div className="col-span-6 border-r">
                        <h2 className="font-semibold">Лицензированный</h2>

                        <div className="bg-white  dark:border-strokedark dark:bg-box mt-3">
                            <div className="mr-5">
                                <label className="text-gray-700 font-medium mt-2">
                                    Системная

                                </label>
                                {compyuterDetailData && <MultySelectTexnologyProgram label='Системная' selectData={compyuterDetailData.program_with_license_and_systemic} selectedTexnologyId={setProgramId} selectedIdComp={compyuterDetailData?.printer} isSubmitted={isSubmitted} disable={true} is_view={true}/>}

                            </div>
                        </div>

                        <div className=" bg-white  dark:border-strokedark dark:bg-box mt-3">
                            <div className="mr-5">
                                <label className="text-gray-700 font-medium mt-2">
                                    Дополнительные программы

                                </label>

                                {compyuterDetailData && <MultySelectTexnologyProgram label='Дополнительные' selectData={compyuterDetailData.program_with_license_and_additional} selectedTexnologyId={setProgramId} selectedIdComp={compyuterDetailData?.printer} isSubmitted={isSubmitted} disable={true} is_view={true}/>}

                            </div>
                        </div>


                    </div>
                    <div className="col-span-6">
                        <h2 className="font-semibold">Не лицензированный</h2>

                        <div className=" bg-white  dark:border-strokedark dark:bg-box mt-3">
                            <div className="mr-2">
                                <label className="text-gray-700 font-medium mt-2">
                                    Системная
                                </label>
                                {compyuterDetailData && <MultySelectTexnologyProgram label='Системная' selectData={compyuterDetailData.program_with_no_license_and_systemic} selectedTexnologyId={setProgramId} selectedIdComp={compyuterDetailData?.printer} isSubmitted={isSubmitted} disable={true} is_view={true}/>}
                            </div>
                        </div>

                        <div className=" bg-white  dark:border-strokedark dark:bg-box mt-3">
                            <div className="mr-2">
                                <label className="text-gray-700 font-medium mt-2">
                                    Дополнительные программы

                                </label>

                                {compyuterDetailData && <MultySelectTexnologyProgram label='Дополнительные' selectData={compyuterDetailData.program_with_no_license_and_additional} selectedTexnologyId={setProgramId} selectedIdComp={compyuterDetailData?.printer} isSubmitted={isSubmitted} disable={true} is_view={true}/>}

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
