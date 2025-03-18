import React, { useEffect, useState } from 'react';
import CardDataStats from '../../components/CardDataStats';
import ChartOne from '../../components/Charts/ChartOne';
import ChartThree from '../../components/Charts/ChartThree';
import ChartTwo from '../../components/Charts/ChartTwo';
import ChatCard from '../../components/Chat/ChatCard';
import MapOne from '../../components/Maps/MapOne';
import TableOne from '../../components/Tables/TableOne';
import { getDashboardCount, getProfile, getUserList } from '../../api/helper';

const ECommerce: React.FC = () => {

  const [info, setInfo] = useState<any>()

  const getDashboardData = async () => {
    const response = await getDashboardCount()
    setInfo(response.data.data)
  }

  useEffect(() => {
    getDashboardData()
  }, [])



  return (
    <>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
        <CardDataStats title="Total Users" total={info?.totalUsers || 0}
        >
          <svg
            className="fill-primary dark:fill-white"
            width="22"
            height="18"
            viewBox="0 0 22 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7.18418 8.03751C9.31543 8.03751 11.0686 6.35313 11.0686 4.25626C11.0686 2.15938 9.31543 0.475006 7.18418 0.475006C5.05293 0.475006 3.2998 2.15938 3.2998 4.25626C3.2998 6.35313 5.05293 8.03751 7.18418 8.03751ZM7.18418 2.05626C8.45605 2.05626 9.52168 3.05313 9.52168 4.29063C9.52168 5.52813 8.49043 6.52501 7.18418 6.52501C5.87793 6.52501 4.84668 5.52813 4.84668 4.29063C4.84668 3.05313 5.9123 2.05626 7.18418 2.05626Z"
              fill=""
            />
            <path
              d="M15.8124 9.6875C17.6687 9.6875 19.1468 8.24375 19.1468 6.42188C19.1468 4.6 17.6343 3.15625 15.8124 3.15625C13.9905 3.15625 12.478 4.6 12.478 6.42188C12.478 8.24375 13.9905 9.6875 15.8124 9.6875ZM15.8124 4.7375C16.8093 4.7375 17.5999 5.49375 17.5999 6.45625C17.5999 7.41875 16.8093 8.175 15.8124 8.175C14.8155 8.175 14.0249 7.41875 14.0249 6.45625C14.0249 5.49375 14.8155 4.7375 15.8124 4.7375Z"
              fill=""
            />
            <path
              d="M15.9843 10.0313H15.6749C14.6437 10.0313 13.6468 10.3406 12.7874 10.8563C11.8593 9.61876 10.3812 8.79376 8.73115 8.79376H5.67178C2.85303 8.82814 0.618652 11.0625 0.618652 13.8469V16.3219C0.618652 16.975 1.13428 17.4906 1.7874 17.4906H20.2468C20.8999 17.4906 21.4499 16.9406 21.4499 16.2875V15.4625C21.4155 12.4719 18.9749 10.0313 15.9843 10.0313ZM2.16553 15.9438V13.8469C2.16553 11.9219 3.74678 10.3406 5.67178 10.3406H8.73115C10.6562 10.3406 12.2374 11.9219 12.2374 13.8469V15.9438H2.16553V15.9438ZM19.8687 15.9438H13.7499V13.8469C13.7499 13.2969 13.6468 12.7469 13.4749 12.2313C14.0937 11.7844 14.8499 11.5781 15.6405 11.5781H15.9499C18.0812 11.5781 19.8343 13.3313 19.8343 15.4625V15.9438H19.8687Z"
              fill=""
            />
          </svg>
        </CardDataStats>

{/* 
        <CardDataStats title="Active Users" total={info?.activeUsers || 0}
        >
          <svg
            className="fill-primary dark:fill-white"
            width="22"
            height="22"
            viewBox="0 0 22 22"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M11 0C4.92487 0 0 4.92487 0 11C0 17.0751 4.92487 22 11 22C17.0751 22 22 17.0751 22 11C22 4.92487 17.0751 0 11 0ZM11 20.3333C6.39303 20.3333 2.66667 16.6069 2.66667 12C2.66667 7.39307 6.39303 3.66667 11 3.66667C15.6069 3.66667 19.3333 7.39307 19.3333 12C19.3333 16.6069 15.6069 20.3333 11 20.3333ZM11 5.33333C9.50903 5.33333 8.33333 6.50903 8.33333 8C8.33333 9.491 9.50903 10.6667 11 10.6667C12.491 10.6667 13.6667 9.491 13.6667 8C13.6667 6.50903 12.491 5.33333 11 5.33333ZM14.6667 14.6667C12.9427 14.6667 11.3333 13.0573 11.3333 11.3333C11.3333 9.6093 12.9427 8 14.6667 8C16.3907 8 18 9.6093 18 11.3333C18 13.0573 16.3907 14.6667 14.6667 14.6667Z"
            />
            <path
              d="M5.33333 15.3333C6.74233 15.3333 7.66667 14.409 7.66667 13C7.66667 11.591 6.74233 10.6667 5.33333 10.6667C3.92433 10.6667 3 11.591 3 13C3 14.409 3.92433 15.3333 5.33333 15.3333ZM5.33333 12.6667C5.93233 12.6667 6.33333 13.0677 6.33333 13.6667C6.33333 14.2657 5.93233 14.6667 5.33333 14.6667C4.73433 14.6667 4.33333 14.2657 4.33333 13.6667C4.33333 13.0677 4.73433 12.6667 5.33333 12.6667Z"
            />
          </svg>

        </CardDataStats> */}


        {/* Total Advisors */}

        <CardDataStats title="Total Advisors" total={info?.totalAdvisor || 0}
        >
          <svg
            className="fill-primary dark:fill-white"
            width="22"
            height="22"
            viewBox="0 0 22 22"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M11 0C4.92487 0 0 4.92487 0 11C0 17.0751 4.92487 22 11 22C17.0751 22 22 17.0751 22 11C22 4.92487 17.0751 0 11 0ZM11 20.3333C6.39303 20.3333 2.66667 16.6069 2.66667 12C2.66667 7.39307 6.39303 3.66667 11 3.66667C15.6069 3.66667 19.3333 7.39307 19.3333 12C19.3333 16.6069 15.6069 20.3333 11 20.3333ZM11 5.33333C9.50903 5.33333 8.33333 6.50903 8.33333 8C8.33333 9.491 9.50903 10.6667 11 10.6667C12.491 10.6667 13.6667 9.491 13.6667 8C13.6667 6.50903 12.491 5.33333 11 5.33333ZM11 13.3333C8.48105 13.3333 6.33333 14.481 6.33333 16C6.33333 17.519 8.48105 18.6667 11 18.6667C13.519 18.6667 15.6667 17.519 15.6667 16C15.6667 14.481 13.519 13.3333 11 13.3333Z"
            />
          </svg>

        </CardDataStats>

        {/* <CardDataStats title="Active Advisor" total={info?.activeAdvisor || 0}
        >
          <svg
            className="fill-primary dark:fill-white"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2" fill="none" />
            <path
              d="M12 7C13.6569 7 15 8.34315 15 10C15 11.6569 13.6569 13 12 13C10.3431 13 9 11.6569 9 10C9 8.34315 10.3431 7 12 7Z"
              fill="currentColor"
            />
            <path
              d="M17 18C17 16.8954 16.1046 16 15 16H9C7.89543 16 7 16.8954 7 18V20H17V18Z"
              fill="currentColor"
            />
            <path
              d="M18 14C18.5304 14 19 14.4696 19 15V16.5L21.5 16.5L21.5 15.5L19 15.5V14C19 13.4696 18.5304 13 18 13C17.4696 13 17 13.4696 17 14V15.5L15.5 15.5L15.5 14C15.5 13.4696 14.9696 13 14.5 13C14.0304 13 13.5 13.4696 13.5 14V16H18V14Z"
              fill="currentColor"
            />
          </svg>

        </CardDataStats> */}

        {/* <CardDataStats title="Active Subscriber" total={info?.activeSubscriber || 0}// not get in api==> activeSubscriber key
        >
          <svg
            className="fill-primary dark:fill-white"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2" fill="none" />
            <path
              d="M12 7C13.6569 7 15 8.34315 15 10C15 11.6569 13.6569 13 12 13C10.3431 13 9 11.6569 9 10C9 8.34315 10.3431 7 12 7Z"
              fill="currentColor"
            />
            <path
              d="M7 18C7 16.8954 7.89543 16 9 16H15C16.1046 16 17 16.8954 17 18V19C17 19.5523 16.5523 20 16 20H8C7.44772 20 7 19.5523 7 19V18Z"
              fill="currentColor"
            />
            <path
              d="M18 5L19.5 6.5L18 8"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>

        </CardDataStats> */}


        <CardDataStats title="Total Subscriber" total={info?.totalSubscriber || 0} // not get in api==> totalSubscriber key
        >
          <svg
            className="fill-primary dark:fill-white"
            width="22"
            height="22"
            viewBox="0 0 22 22"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M11 0C4.92487 0 0 4.92487 0 11C0 17.0751 4.92487 22 11 22C17.0751 22 22 17.0751 22 11C22 4.92487 17.0751 0 11 0ZM11 20.3333C6.39303 20.3333 2.66667 16.6069 2.66667 12C2.66667 7.39307 6.39303 3.66667 11 3.66667C15.6069 3.66667 19.3333 7.39307 19.3333 12C19.3333 16.6069 15.6069 20.3333 11 20.3333ZM11 5.33333C9.50903 5.33333 8.33333 6.50903 8.33333 8C8.33333 9.491 9.50903 10.6667 11 10.6667C12.491 10.6667 13.6667 9.491 13.6667 8C13.6667 6.50903 12.491 5.33333 11 5.33333ZM11 13.3333C8.48105 13.3333 6.33333 14.481 6.33333 16C6.33333 17.519 8.48105 18.6667 11 18.6667C13.519 18.6667 15.6667 17.519 15.6667 16C15.6667 14.481 13.519 13.3333 11 13.3333Z"
            />
          </svg>
        </CardDataStats>

      </div>




      {/* <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
        <ChartOne />
        <ChartTwo />
        <ChartThree />
        <MapOne />
        <div className="col-span-12 xl:col-span-8">
          <TableOne />
        </div>
        <ChatCard />
      </div> */}
    </>
  );
};

export default ECommerce;
