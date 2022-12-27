import React, { useState, useMemo } from "react";
import NavBar from "../Components/NavBar/NavBar";
import Footer from "../Components/Footer/Footer";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import allblogs from "../Static/blogsData";

const Home = () => {
  const navigate = useNavigate();
  const [loaded, setLoaded] = useState(5);

  const { inSlider, notInSlider } = useMemo(() => {
    const inSlider = allblogs.filter((blog) => blog?.slider);
    const notInSlider = allblogs.filter((blog) => !blog?.slider);
    return { inSlider, notInSlider };
  }, []);

  return (
    <div>
      <NavBar />
      <div className="w-[95%] max-w-[1000px] mx-auto pt-10 pb-20 r-box">
        <Swiper
          speed={600}
          autoplay={{ delay: 6000 }}
          pagination={true}
          modules={[Pagination, Autoplay]}
        >
          {inSlider.map((item) => (
            <SwiperSlide
              onClick={() => {
                navigate(`/blogdetails/${item?.blogId}`);
              }}
              className="cursor-pointer"
              key={item?.blogId}
            >
              <img
                src={`${process.env.PUBLIC_URL}/blogimages/${item.content[0].imgUrl}.png`}
                alt=""
                className="w-full aspect-[11/7] md:aspect-[11/5] object-cover object-center rounded-lg"
              />
              <div className="mt-8 mb-12 flex items-start">
                <p className="text-lg md:text-xl lg:text-2xl font-semibold w-9/12 md:w-10/12 xl:w-11/12 pr-10 line-clamp-2">
                  {item?.title}
                </p>
                <div>
                  <p className="text-sm font-medium mb-2">
                    {Math.floor(item?.readTime / 60)} min read
                  </p>
                  <p className="text-xs text-gray-500">
                    {moment.unix(item?.creationDate).format("MMM DD YYYY")}
                  </p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="grid grid-cols-12 md:gap-x-8 gap-y-24 py-24">
          {notInSlider.slice(0, loaded).map((item, index) => (
            <div
              onClick={() => {
                navigate(`/blogdetails/${item?.blogId}`);
              }}
              key={item?.blogId}
              className={`col-span-12 md:col-span-6 cursor-pointer ${
                index < 2 ? "lg:col-span-6" : "lg:col-span-4"
              }`}
            >
              <div className="w-full flex flex-col justify-between h-full">
                <div>
                  <img
                    src={`${process.env.PUBLIC_URL}/blogimages/${item.content[0].imgUrl}.png`}
                    alt=""
                    className="w-full aspect-[10/8] rounded-lg mb-5 object-cover object-center"
                  />
                  <p className="text-lg font-semibold lg:font-semibold pr-10 line-clamp-2">
                    {item?.title}
                  </p>
                  <p
                    style={{ lineHeight: "200%" }}
                    className="my-5 text-gray-500 text-md md:text-lg line-clamp-3"
                  >
                    {item?.content?.find((i) => i.type === "text")?.title}
                  </p>
                </div>
                <div className="flex items-center justify-between text-sm font-medium mt-5">
                  <p className="text-gray-500">
                    {moment.unix(item?.creationDate).format("MMM DD YYYY")}
                  </p>
                  <p>{Math.floor(item?.readTime / 60)} min read</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        {notInSlider.length > loaded && (
          <button
            onClick={() => setLoaded((prev) => prev + 3)}
            className="bg-black text-white px-8 py-3 rounded-full block mx-auto hover:scale-105 duration-150"
          >
            Load more
          </button>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Home;
