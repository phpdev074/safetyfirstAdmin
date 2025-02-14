
import React, { useEffect, useRef, useState } from 'react'
import Pagination from '../../../components/Pagination';
import { updateUsers } from '../../../api/helper';
import { ShowToast } from '../../../helpers/ToastService';
import UserDetails from '../../UserDetails';
import { getUserSubscriptionList, transferCommissionAdvisor } from '../../../api/subscription';

function UserSubscriptionList() {
    const [info, setInfo] = useState<any>({ users: [] });
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [searchValue, setSearchValue] = useState('');
    const debounceTimer = useRef<NodeJS.Timeout | null>(null);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalData, setModalData] = useState(null);

    const [viewType, setViewType] = useState<"user" | "advisor">("advisor");

    const getUserData = async (page = 1, roleType = viewType, search = "") => {
        // const response = await getUserList(`?limit=10&page=${page}&role=${roleType}&status=false&search=${search}`)
        const response = await getUserSubscriptionList(`?limit=10&page=${page}`)
        // console.log(response.data.data, '==>>response.data.data')
        setInfo(response.data.data)
    }

    useEffect(() => {
        getUserData(currentPage, viewType)
    }, [])

    const openModal = (data: any) => {
        setIsModalOpen(true);
        setModalData(data?.userId)
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setModalData(null)
    };



    const handlePageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber);
        getUserData(pageNumber);
    };
    const handelSearch = (value: any) => {
        getUserData(currentPage, viewType, value)
    }

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearchValue(value);

        if (debounceTimer.current) {
            clearTimeout(debounceTimer.current);
        }

        debounceTimer.current = setTimeout(() => {
            handelSearch(value);
        }, 700);
    };


    const sendCommisiion = async (data: any) => {
        // console.log(data._id,'===>',data.userId._id)
        try {
            const isConfirmed = window.confirm("Are you sure you want to send ?");
            console.log(isConfirmed,'==>isConfirmed')
            if (isConfirmed) {
                await transferCommissionAdvisor(`?id=${data._id}&userId=${data.userId._id}`)
                ShowToast("send Successfully", 'success')
                getUserData(currentPage, viewType);
            }

        } catch (error) {
            console.log(error)
        }

    }



    return (
        <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">

            <div className="flex justify-between items-center mb-4">
                <div className="flex gap-2" />
                {/* Search Input */}
                {/* <input
                    type="text"
                    placeholder="Search "
                    className="px-3 py-2 border rounded dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                    value={searchValue}
                    onChange={handleSearchChange}
                /> */}
            </div>
            <div className="max-w-full overflow-x-auto">
                <table className="w-full table-auto">
                    <thead>
                        <tr className="bg-gray-2 text-left dark:bg-meta-4">
                            <th className=" py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                                Name
                            </th>
                            <th className=" py-4 px-4 font-medium text-black dark:text-white">
                                Email
                            </th>
                            <th className=" py-4 px-4 font-medium text-black dark:text-white">
                                Price
                            </th>
                            <th className=" py-4 px-4 font-medium text-black dark:text-white">
                                Start Date
                            </th>
                            <th className=" py-4 px-4 font-medium text-black dark:text-white">
                                End Date
                            </th>
                            <th className="py-4 px-4 font-medium text-black dark:text-white">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {info && info?.users?.map((packageItem: any, key: any) => (
                            <tr key={key}>
                                <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                                    <h5 className="font-medium text-black dark:text-white">
                                        {packageItem?.userId?.name ?? 'N/A'}
                                    </h5>
                                    {/* <p className="text-sm">${packageItem?.name}</p> */}
                                </td>
                                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                    <p className="text-black dark:text-white">
                                        {packageItem?.userId?.email}
                                    </p>
                                </td>

                                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                    <p className="text-black dark:text-white">
                                        ${packageItem?.price}
                                    </p>
                                </td>
                                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                    <p className="text-black dark:text-white">
                                        {new Date(packageItem.createdAt).toLocaleDateString()}
                                    </p>
                                </td>
                                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                    <p className="text-black dark:text-white">
                                        {packageItem?.createdAt
                                            ? new Date(new Date(packageItem.createdAt).setFullYear(new Date(packageItem.createdAt).getFullYear() + 1)).toLocaleDateString()
                                            : ''}
                                    </p>
                                </td>

                                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                    <div className="flex items-center space-x-3.5">
                                        {!packageItem.isTransfered &&
                                            <button onClick={() => sendCommisiion(packageItem)} >Send</button>
                                        }

                                        <button className="hover:text-primary"
                                            onClick={() => openModal(packageItem)}
                                        >
                                            <svg
                                                className="fill-current"
                                                width="18"
                                                height="18"
                                                viewBox="0 0 18 18"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    d="M8.99981 14.8219C3.43106 14.8219 0.674805 9.50624 0.562305 9.28124C0.47793 9.11249 0.47793 8.88749 0.562305 8.71874C0.674805 8.49374 3.43106 3.20624 8.99981 3.20624C14.5686 3.20624 17.3248 8.49374 17.4373 8.71874C17.5217 8.88749 17.5217 9.11249 17.4373 9.28124C17.3248 9.50624 14.5686 14.8219 8.99981 14.8219ZM1.85605 8.99999C2.4748 10.0406 4.89356 13.5562 8.99981 13.5562C13.1061 13.5562 15.5248 10.0406 16.1436 8.99999C15.5248 7.95936 13.1061 4.44374 8.99981 4.44374C4.89356 4.44374 2.4748 7.95936 1.85605 8.99999Z"
                                                    fill=""
                                                />
                                                <path
                                                    d="M9 11.3906C7.67812 11.3906 6.60938 10.3219 6.60938 9C6.60938 7.67813 7.67812 6.60938 9 6.60938C10.3219 6.60938 11.3906 7.67813 11.3906 9C11.3906 10.3219 10.3219 11.3906 9 11.3906ZM9 7.875C8.38125 7.875 7.875 8.38125 7.875 9C7.875 9.61875 8.38125 10.125 9 10.125C9.61875 10.125 10.125 9.61875 10.125 9C10.125 8.38125 9.61875 7.875 9 7.875Z"
                                                    fill=""
                                                />
                                            </svg>
                                        </button>

                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                    <div className="flex justify-end mt-4">
                        <Pagination
                            currentPage={currentPage}
                            totalPages={info?.pagination?.totalPages}
                            onPageChange={handlePageChange}
                        />
                    </div>
                </table>
            </div>


            <UserDetails
                isModalOpen={isModalOpen}
                modalData={modalData}
                closeModal={closeModal}
            />


            <div>

            </div>


        </div>
    );
}

export default UserSubscriptionList