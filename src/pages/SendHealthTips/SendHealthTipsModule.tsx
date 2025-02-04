import React, { useEffect, useState } from 'react'
import { getUserList } from '../../api/helper';
import { SubmitHandler, useForm } from 'react-hook-form';
import { IMAGE_BASE_URL } from '../../api/url';
interface User {
  _id: string;
  name: string;
  email: string;
  image: string;
  status: boolean;
}
type Inputs = {
  title: string
  description: string
}

function SendHealthTipsModule() {
  const { register, handleSubmit, formState: { errors } } = useForm<Inputs>()

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [users, setUsers] = useState<User[]>();

  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);

  const [selectAll, setSelectAll] = useState<boolean>(false);

  useEffect(() => {
    if (selectAll && users) {
      setSelectedUsers(users?.map((user: any) => user._id));
    } else {
      setSelectedUsers([]);
    }
  }, [selectAll, users]);

  const handleCheckboxChange = (userId: string, isChecked: boolean) => {
    if (isChecked) {
      setSelectedUsers((prevSelected) => [...prevSelected, userId]);
    } else {
      setSelectedUsers((prevSelected) =>
        prevSelected.filter((id) => id !== userId)
      );
    }

  };

  const handleSelectAllChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectAll(e.target.checked);
  };

  const getUserData = async (page = 1) => {
    // const response = await getUserList(`?limit=10&page=${page}&role=${roleType}&status=false&search=${search}`)
    const response = await getUserList(`?limit=100&page=${page}&status=true`)
    // console.log(response.data.data.users, '==>>response.data.data')
    setUsers(response.data.data.users)
  }

  useEffect(() => {
    getUserData(currentPage)
  }, [])

  const onSubmit: SubmitHandler<Inputs> = async (data) => {

    console.log(selectedUsers, '===selectedUsers')
    console.log(data, '===>>>data')

  }

  return (
    <>
      <div className="grid grid-cols-5 gap-8">
        <div className="col-span-5 xl:col-span-3">
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-7 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Send Tips
              </h3>
            </div>
            <div className="p-7">
              <form
                onSubmit={handleSubmit(onSubmit)}
              >
                <div className="mb-5.5">
                  <label
                    className="mb-3 block text-sm font-medium text-black dark:text-white"
                    htmlFor="emailAddress"
                  >
                    Title
                  </label>
                  <div className="relative">

                    <input
                      className="w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                      type="text"
                      // name="title"
                      id="title"
                      placeholder="Enter title"
                      {...register("title", { required: true })}
                    // defaultValue={info?.title}
                    />
                    {errors.title && <span className='text-red-500'>This field is required</span>}
                  </div>
                </div>

                <div className="mb-5.5">
                  <label
                    className="mb-3 block text-sm font-medium text-black dark:text-white"
                    htmlFor="description"
                  >
                    Description
                  </label>
                  <div className="relative">
                    <textarea
                      className="w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                      id="description"
                      rows={5}
                      placeholder="Write your Description here"
                      {...register("description", { required: true })}
                    // defaultValue={info?.description}
                    ></textarea>
                    {errors.description && <span className='text-red-500'>This field is required</span>}
                  </div>
                </div>


                <div className="flex justify-end gap-4.5">
                  <button
                    className="flex justify-center rounded border border-stroke py-2 px-6 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white"
                    type="submit"
                  >
                    Cancel
                  </button>
                  <button
                    className="flex justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:bg-opacity-90"
                    type="submit"
                  >
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="col-span-5 xl:col-span-2">
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-7 flex justify-between items-center dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">User List</h3>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={selectAll}
                  onChange={handleSelectAllChange}
                  className="form-checkbox h-5 w-5 text-primary dark:bg-meta-4 dark:border-strokedark"
                />
                <span className="ml-2 text-black dark:text-white">Select All</span>
              </label>
            </div>
            <div className="max-h-96 overflow-y-auto p-8">
              {users?.map((user) => (
                <div key={user._id} className="flex items-center justify-between mb-4">
                  {/* User Image */}
                  <div className="flex items-center gap-3">
                    <div className="h-14 w-14 rounded-full overflow-hidden">
                      <img
                        className="w-full h-full object-cover"
                        src={IMAGE_BASE_URL + user.image || 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.pngwing.com%2Fen%2Fsearch%3Fq%3Ddefault&psig=AOvVaw1wj2RPPgUabua7n7fHSdeS&ust=1738671899638000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCNi3zNm_p4sDFQAAAAAdAAAAABAE'}
                        alt={user.name}
                      />
                    </div>
                    <div>
                      <span className="text-black dark:text-white">{user.name}</span>
                    </div>
                  </div>

                  {/* Checkbox to select user */}
                  <div className="flex items-center gap-2">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={selectedUsers.includes(user._id)} // Check if user is selected
                        onChange={(e) => handleCheckboxChange(user._id, e.target.checked)} // Handle checkbox change
                        className="form-checkbox h-5 w-5 text-primary dark:bg-meta-4 dark:border-strokedark"
                      />
                    </label>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

    </>
  )
}

export default SendHealthTipsModule