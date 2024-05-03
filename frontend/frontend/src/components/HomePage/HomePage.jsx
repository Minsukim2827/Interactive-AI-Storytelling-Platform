import React from 'react';
import Carousel from './Carousel';
import { useTranslation } from 'react-i18next'

const HomePage = () => {
  const { t } = useTranslation()
  return (
    <div className="flex flex-col items-center mt-6 lg:mt-20 h-100vh">
      <h1 className="text-4xl sm:text-6xl lg:text-7xl text-center tracking-wide">
        {t("homeTitle")}
        <br></br>
        <span className="bg-gradient-to-r from-blue-500 to-purple-800 text-transparent bg-clip-text">
          {" "}
          {t("homeTitle1")}
        </span>
      </h1>
      <p className="mt-10 text-lg text-center text-neutral-500 max-w-4xl">
        {t("describe")}
      </p>
      <div>
        <Carousel />
      </div>
    </div>

  )
};

export default HomePage;
