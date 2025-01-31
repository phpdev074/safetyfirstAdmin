import Breadcrumb from '../../../components/Breadcrumbs/Breadcrumb';
import ContactUsTable from './ContactUsTable';

const ContactUs = () => {
    return (
        <>
          <Breadcrumb pageName="Contact Us" />
          <div className="flex flex-col gap-10">
            <ContactUsTable />
          </div>
        </>
      );
}

export default ContactUs