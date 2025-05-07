
"use client";


type Props = {
    label: string,
    inputData: string
}

export function ModalDataInput({ label, inputData }: Props) {

    return (
        <div className='col-span-3'>
            <label className="mb-3 block text-black dark:text-white">
                {label}
            </label>
            <input
                type="text"
                defaultValue={inputData}
                disabled
                // placeholder="Номер пломбы"
                className="w-full rounded-md border-stroke bg-transparent py-1 px-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
            />
        </div>
    );
}
