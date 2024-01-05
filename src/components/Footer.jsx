import React from "react";

const Footer = () => {
  return (
    <footer className="text-gray-600 body-font">
      <div className="container px-5 py-8 mx-auto flex items-center sm:flex-row flex-col">
        <h3 className="flex title-font font-medium items-center md:justify-start justify-center text-gray-900">
          <span className="ml-3 text-xl">Prof. K. T. V. Talele</span>
        </h3>
        <p className="text-sm text-gray-500 sm:ml-4 sm:pl-4 sm:border-l-2 sm:border-gray-200 sm:py-2 sm:mt-0 mt-4">
          © 2024. All Rights Reserved by Kiran T. Talele
        </p>
        <p className="text-sm text-gray-500 sm:ml-4 sm:pl-4  sm:border-l-2 sm:border-gray-200 sm:py-2 sm:mt-0 mt-4">
          Design & Developed by Sudhir Shinde
        </p>
      </div>
    </footer>
  );
};

export default Footer;
