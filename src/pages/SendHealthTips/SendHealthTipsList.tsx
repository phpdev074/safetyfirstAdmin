import React, { useEffect, useRef, useState } from 'react'
import UserDetails from '../UserDetails';
import Pagination from '../../components/Pagination';
import { deleteScheduleUsers, getscheduleUsers, getUserList, sendHealthTipsApi, updateUsers } from '../../api/helper';
import { ShowToast } from '../../helpers/ToastService';

interface SendHealthTipsModuleProps {
    handleToggleView: () => void;  // Function type for the toggle view function
}

interface SendHealthTipsData {
    users: { _id: string }[];  // assuming users is an array of objects with _id as string
    title: string;
    description: string;
  }

const SendHealthTipsList: React.FC<SendHealthTipsModuleProps> = ({ handleToggleView }) => {
    const [info, setInfo] = useState<any>({schedules:[]});
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [searchValue, setSearchValue] = useState('');
    const debounceTimer = useRef<NodeJS.Timeout | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalData, setModalData] = useState(null);

    const openModal = (data: any) => {
        setIsModalOpen(true);
        setModalData(data)
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setModalData(null)
    };

    const getUserData = async (page = 1, search = "") => {
        const response = await getscheduleUsers(`?limit=10&page=${page}`)
        // console.log(response.data.data,'====>response')
        setInfo(response.data.data)
    }

    useEffect(() => {
        getUserData(currentPage)
    }, [])



    const handlePageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber);
        getUserData(pageNumber);
    };
    const handelSearch = (value: any) => {
        getUserData(currentPage, value)
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

    const changeStatus = async (id: string, booldata: Boolean) => {
        const action = booldata ? "Approve" : "Reject";
        const confirmMessage = `Are you sure you want to ${action}?`;

        const confirm = window.confirm(confirmMessage);
        if (confirm) {
            await updateUsers({ id: id, status: booldata });
            ShowToast(`${action}d successfully`);
            getUserData(currentPage);
        }
    }

    const handelDelete = async (id: string) => {
        const confirmMessage = `Are you sure you want to Delete?`;
        const confirm = window.confirm(confirmMessage);
        if (confirm) {
            await deleteScheduleUsers(id)
            ShowToast(`Delete successfully`);
            getUserData(currentPage);
        }
    }


    const sendTips =async(data:SendHealthTipsData)=>{
        // console.log(data,'===>')
        const users= data.users.map((e:any)=>e._id)
        // console.log(users,'==>')
        const sendData ={
            users,
            title:data.title,
            description:data.description
        }
        const response = await sendHealthTipsApi(sendData)
        ShowToast(response.data.message);
    }

    return (
        <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">

            <div className="flex justify-between items-center mb-4">
                <div className="flex gap-2" />
                {/* Search Input */}
                <button onClick={handleToggleView}
                    className="flex justify-center rounded py-2 px-6 font-medium text-white bg-[#A91D1D] hover:bg-opacity-90 dark:bg-[#A91D1D] dark:text-white dark:hover:bg-[#A91D1D] dark:hover:text-white"
                >Add</button>

            </div>
            <div className="max-w-full overflow-x-auto">
                <table className="w-full table-auto">
                    <thead>
                        <tr className="bg-gray-2 text-left dark:bg-meta-4">
                            <th className=" py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                                Title
                            </th>
                            <th className=" py-4 px-4 font-medium text-black dark:text-white">
                                Description
                            </th>
                            <th className=" py-4 px-4 font-medium text-black dark:text-white">
                            Publish Date
                            </th>
                            <th className="py-4 px-4 font-medium text-black dark:text-white">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {info && info?.schedules?.map((packageItem: any, key: any) => (
                            <tr key={key}>
                                <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                                    <h5 className="font-medium text-black dark:text-white">
                                        {packageItem?.title ?? 'N/A'}
                                    </h5>
                                </td>
                                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                    <p className="text-black dark:text-white">
                                        {packageItem?.description?.split(' ').slice(0, 50).join(' ')}{packageItem?.description?.split(' ').length > 50 ? '...' : ''}
                                    </p>
                                </td>

                                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                    <p className="text-black dark:text-white">
                                        {packageItem?.createdAt ? new Date(packageItem.scheduleDate).toLocaleDateString() : ''}
                                    </p>
                                </td>
                                {/* <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                    <button
                                        onClick={() => changeStatus(packageItem._id, true)}
                                        className={`inline-flex rounded-full py-1 px-3 text-sm font-medium cursor-pointer bg-opacity-10 bg-success text-success`} // Active button will be filled
                                    >
                                        Approve
                                    </button>

                                    <button
                                        onClick={() => changeStatus(packageItem._id, false)}
                                        className={`inline-flex rounded-full py-1 px-3 text-sm font-medium cursor-pointer bg-opacity-10 bg-danger text-danger`} // Active button will be filled
                                    >
                                        Reject
                                    </button>
                                </td> */}

                                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                    <div className="flex items-center space-x-3.5">
                                        {/* <button className="hover:text-primary" onClick={()=>sendTips(packageItem)} >Send</button> */}
                                      
                                        <button className="hover:text-primary"
                                            onClick={() => handelDelete(packageItem?._id)}
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
                                                    d="M13.7535 2.47502H11.5879V1.9969C11.5879 1.15315 10.9129 0.478149 10.0691 0.478149H7.90352C7.05977 0.478149 6.38477 1.15315 6.38477 1.9969V2.47502H4.21914C3.40352 2.47502 2.72852 3.15002 2.72852 3.96565V4.8094C2.72852 5.42815 3.09414 5.9344 3.62852 6.1594L4.07852 15.4688C4.13477 16.6219 5.09102 17.5219 6.24414 17.5219H11.7004C12.8535 17.5219 13.8098 16.6219 13.866 15.4688L14.3441 6.13127C14.8785 5.90627 15.2441 5.3719 15.2441 4.78127V3.93752C15.2441 3.15002 14.5691 2.47502 13.7535 2.47502ZM7.67852 1.9969C7.67852 1.85627 7.79102 1.74377 7.93164 1.74377H10.0973C10.2379 1.74377 10.3504 1.85627 10.3504 1.9969V2.47502H7.70664V1.9969H7.67852ZM4.02227 3.96565C4.02227 3.85315 4.10664 3.74065 4.24727 3.74065H13.7535C13.866 3.74065 13.9785 3.82502 13.9785 3.96565V4.8094C13.9785 4.9219 13.8941 5.0344 13.7535 5.0344H4.24727C4.13477 5.0344 4.02227 4.95002 4.02227 4.8094V3.96565ZM11.7285 16.2563H6.27227C5.79414 16.2563 5.40039 15.8906 5.37227 15.3844L4.95039 6.2719H13.0785L12.6566 15.3844C12.6004 15.8625 12.2066 16.2563 11.7285 16.2563Z"
                                                    fill=""
                                                />
                                                <path
                                                    d="M9.00039 9.11255C8.66289 9.11255 8.35352 9.3938 8.35352 9.75942V13.3313C8.35352 13.6688 8.63477 13.9782 9.00039 13.9782C9.33789 13.9782 9.64727 13.6969 9.64727 13.3313V9.75942C9.64727 9.3938 9.33789 9.11255 9.00039 9.11255Z"
                                                    fill=""
                                                />
                                                <path
                                                    d="M11.2502 9.67504C10.8846 9.64692 10.6033 9.90004 10.5752 10.2657L10.4064 12.7407C10.3783 13.0782 10.6314 13.3875 10.9971 13.4157C11.0252 13.4157 11.0252 13.4157 11.0533 13.4157C11.3908 13.4157 11.6721 13.1625 11.6721 12.825L11.8408 10.35C11.8408 9.98442 11.5877 9.70317 11.2502 9.67504Z"
                                                    fill=""
                                                />
                                                <path
                                                    d="M6.72245 9.67504C6.38495 9.70317 6.1037 10.0125 6.13182 10.35L6.3287 12.825C6.35683 13.1625 6.63808 13.4157 6.94745 13.4157C6.97558 13.4157 6.97558 13.4157 7.0037 13.4157C7.3412 13.3875 7.62245 13.0782 7.59433 12.7407L7.39745 10.2657C7.39745 9.90004 7.08808 9.64692 6.72245 9.67504Z"
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

export default SendHealthTipsList;