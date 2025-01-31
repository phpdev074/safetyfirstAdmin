import { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';

import Loader from './common/Loader';
import PageTitle from './components/PageTitle';
import SignIn from './pages/Authentication/SignIn';
import SignUp from './pages/Authentication/SignUp';
import Calendar from './pages/Calendar';
import Chart from './pages/Chart';
import ECommerce from './pages/Dashboard/ECommerce';
import FormElements from './pages/Form/FormElements';
import FormLayout from './pages/Form/FormLayout';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import Tables from './pages/Tables';
import Alerts from './pages/UiElements/Alerts';
import Buttons from './pages/UiElements/Buttons';
import DefaultLayout from './layout/DefaultLayout';
import Login from './pages/Components/Login';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import ContactUs from './pages/Components/ContectUs/ContactUs';
import Subscription from './pages/Components/Subscription/Subscription';
import AdvisorsRequest from './pages/Components/AdvisorsRequest/AdvisorsRequest';

function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <>
      <Routes>
        {/* Login and Signup routes should be outside the DefaultLayout */}
        <Route
          index
          path="/"
          element={
            <>
              <PageTitle title="Login " />
              <Login />
            </>
          }
        />
        <Route
          path="/auth/signin"
          element={
            <>
              <PageTitle title="Signin " />
              <SignIn />
            </>
          }
        />
        <Route
          path="/auth/signup"
          element={
            <>
              <PageTitle title="Signup " />
              <SignUp />
            </>
          }
        />


        <Route element={<DefaultLayout />}>
          <Route
            path='/dashboard'
            element={
              <>
                <PageTitle title=" Dashboard " />
                <ECommerce />
              </>
            }
          />

          <Route
            path="/subscription"
            element={
              <>
                <PageTitle title="Subscription " />
                <Subscription />
              </>
            }
          />
          <Route
            path="/profile"
            element={
              <>
                <PageTitle title="Profile " />
                <Profile />
              </>
            }
          />
          <Route
            path="/forms/form-elements"
            element={
              <>
                <PageTitle title="Form Elements " />
                <FormElements />
              </>
            }
          />
          <Route
            path="/forms/form-layout"
            element={
              <>
                <PageTitle title="Form Layout " />
                <FormLayout />
              </>
            }
          />
          <Route
            path="/users"
            element={
              <>
                <PageTitle title="Users" />
                <Tables />
              </>
            }
          />

          <Route
            path="/contactUs"
            element={
              <>
                <PageTitle title="Contact Us" />
                <ContactUs />
              </>
            }
          />

          <Route
            path="/settings"
            element={
              <>
                <PageTitle title="Settings " />
                <Settings />
              </>
            }
          />
          <Route
            path="/business"
            element={
              <>
                <PageTitle title="Basic Chart " />
                <Chart />
              </>
            }
          />
          {/* Advisors Request */}
          <Route
            path="/advisorsRequest"
            element={
              <>
                <PageTitle title="Advisors Request" />
                <AdvisorsRequest />
              </>
            }
          />

          <Route
            path="/ui/alerts"
            element={
              <>
                <PageTitle title="Alerts " />
                <Alerts />
              </>
            }
          />
          <Route
            path="/ui/buttons"
            element={
              <>
                <PageTitle title="Buttons " />
                <Buttons />
              </>
            }
          />
        </Route>
      </Routes>
      <ToastContainer
        position="top-center"
        className="custom-toast-container"
        bodyClassName="custom-toast-body"
      />
    </>
  );
}

export default App;
