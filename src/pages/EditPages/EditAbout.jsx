import React from 'react'
import EditNavbar from '../../components/EditNavbar'
import Footer from '../../components/Footer';

const EditAbout = () => {
  const Style = {
    filter: "grayscale(1) contrast(1.2) opacity(0.4)",
  };
  return (
    <div>
        <EditNavbar/>
        <section className="text-gray-600 body-font">
      <div className="container bg-gray-900 px-5 mt-16 justify-center py-8 mx-auto flex sm:flex-nowrap flex-wrap">
        <div className="lg:w-2/3 md:w-full bg-gray-300 rounded-lg mt-14 ml-0 sm:ml-0 sm:mr-0 sm:mb-6 overflow-hidden p-4 sm:p-40 flex items-end justify-start relative">
          <iframe
            width="100%"
            height="100%"
            className="absolute inset-0"
            title="map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3769.645933716347!2d72.83354047495585!3d19.123182650490058!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c9d90e067ba9%3A0x16268e5d6bca2e6a!2sBharatiya%20Vidya%20Bhavan&#39;s%20Sardar%20Patel%20Institute%20of%20Technology%20(SPIT)!5e0!3m2!1sen!2sin!4v1701775847989!5m2!1sen!2sin"
            style={Style}
          ></iframe>
          <div className="bg-white relative flex flex-wrap py-6 rounded shadow-md w-full">
            <div className="w-full px-6 sm:w-1/2">
              <h2 className="title-font font-semibold text-gray-900 tracking-widest text-xs">
                ADDRESS
              </h2>
              <p className="mt-1">
                Sardar Patel Institute of Technology, Room No. 205, Bharatiya
                Vidya Bhavan's Campus, Munshi Nagar, Andheri (W), Mumbai 4000058
              </p>
            </div>
            <div className="w-full px-6 mt-4 sm:w-1/2 sm:mt-0">
              <h2 className="title-font font-semibold text-gray-900 tracking-widest text-xs">
                EMAIL
              </h2>
              <a className="text-indigo-500 leading-relaxed">
                ktvtalele@spit.ac.in
              </a>
              <h2 className="title-font font-semibold text-gray-900 tracking-widest text-xs mt-4">
                PHONE
              </h2>
              <p className="leading-relaxed">022-26708520, 022-26706640</p>
              <h2 className="title-font font-semibold text-gray-900 tracking-widest text-xs mt-4">
                MOBILE
              </h2>
              <p className="leading-relaxed">+91-9987030881</p>
            </div>
          </div>
        </div>
      </div>
    </section>
    <Footer />
    </div>
    
  )
}

export default EditAbout
