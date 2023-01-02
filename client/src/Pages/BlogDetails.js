import React, { useEffect, useRef, useState } from "react";
import { BsArrowLeftCircle, BsArrowRightCircle } from "react-icons/bs";
import { useNavigate, useParams } from "react-router-dom";
import NavBar from "../Components/NavBar/NavBar";
import Footer from "../Components/Footer/Footer";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import "swiper/css";
import "swiper/css";
import moment from "moment";
import allBlogs from "../Static/blogsData";

const BlogDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState({});
  const [swiper, setSwiper] = useState();
  const [activeSlide, setActiveSlide] = useState(0);
  const nextRef = useRef();
  const prevRef = useRef();

  useEffect(() => {
    if (swiper) {
      swiper.params.navigation.nextEl = nextRef.current;
      swiper.params.navigation.prevEl = prevRef.current;
      swiper.navigation.init();
      swiper.navigation.update();
    }
  }, [swiper]);

  useEffect(() => {
    const matched = allBlogs.find((item) => item.blogId === id);
    setBlog(matched);
  }, [id]);

  return (
    <div>
      <NavBar />
      <div className="w-[95%] max-w-[1000px] mx-auto pt-10 pb-20 r-box">
        <div
          style={{ lineHeight: "200%" }}
          className="flex flex-col gap-14 text-lg text-gray-600"
        >
          <div className="font-medium text-sm">
            <p className="text-black">
              {Math.floor(blog?.readTime / 60)} min read
            </p>
            <p>{moment.unix(blog?.creationDate).format("MMM DD YYYY")}</p>
          </div>
          <h1
            style={{ lineHeight: "150%" }}
            className="text-xl lg:text-2xl xl:text-4xl font-bold text-black"
          >
            {blog?.title}
          </h1>
          {blog?.content?.map((item, index) => (
            <div key={index}>
              {item?.type === "image" && (
                <img
                  src={`${process.env.PUBLIC_URL}/blogimages/${item.imgUrl}.png`}
                  alt=""
                  className="w-full aspect-[11/7] md:aspect-[11/5] bg-cover bg-no-repeat bg-center rounded-lg object-cover object-center"
                />
              )}
              {item?.type === "heading" && (
                <p className="text-xl font-semibold text-black">
                  {item?.title}
                </p>
              )}
              {item.type === "points" && (
                <div className="text-lg md:text-xl">
                  {item.points.map((point) => (
                    <li key={point?.name}>
                      {point?.name && <span>{point?.name}</span>}
                      {point?.link && (
                        <span
                          className="cursor-pointer underline px-2"
                          onClick={() =>
                            window.open(`https://instagram.com/${point?.link}`)
                          }
                        >
                          @{point?.link}
                        </span>
                      )}
                      {point?.followers && (
                        <span>({point?.followers} followers)</span>
                      )}
                    </li>
                  ))}
                </div>
              )}
              {item?.type === "text" && (
                <p
                  style={{ lineHeight: "200%" }}
                  className="text-lg md:text-xl"
                >
                  {item?.title}
                </p>
              )}
              {item?.type === "video" && (
                <iframe
                  className="w-full aspect-[11/7] md:aspect-[11/5] rounded-lg"
                  src={item?.url}
                  title="Flytant"
                  allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture;fullscreen"
                ></iframe>
              )}
            </div>
          ))}
          <p className="font-semibold text-black text-lg">More topics</p>
          <div className="mb-24 relative">
            <Swiper
              modules={[Navigation]}
              navigation={{
                nextEl: nextRef?.current,
                prevEl: prevRef?.current,
              }}
              onSwiper={setSwiper}
              slidesPerView={1.2}
              onSlideChange={(e) => setActiveSlide(e.realIndex)}
              spaceBetween={20}
              breakpoints={{
                640: {
                  slidesPerView: 2.2,
                },
                1024: {
                  slidesPerView: 3,
                },
              }}
            >
              {allBlogs.map((item) => (
                <SwiperSlide
                  onClick={() => {
                    navigate(`/blogdetails/${item?.blogId}`, {
                      replace: true,
                    });
                  }}
                  key={item?.blogId}
                  className="cursor-pointer"
                >
                  <div className="w-full min-h-[530px] flex flex-col justify-between">
                    <div>
                      <img
                        src={`${process.env.PUBLIC_URL}/blogimages/${item?.content[0].imgUrl}.png`}
                        alt=""
                        className="w-full aspect-[10/8] object-cover object-center rounded-2xl mb-5"
                      />
                      <p className="text-lg text-black font-semibold pr-5 line-clamp-2">
                        {item?.title}
                      </p>
                      <p
                        style={{ lineHeight: "170%" }}
                        className="my-5 text-gray-500 text-md pr-5 line-clamp-5"
                      >
                        {item?.content?.find((i) => i.type === "text")?.title}
                      </p>
                    </div>
                    <div className="flex items-center justify-between text-sm font-medium pr-5">
                      <p className="text-gray-500">
                        {moment.unix(item?.creationDate).format("MMM DD YYYY")}
                      </p>
                      <p>{Math.floor(item?.readTime / 60)} min read</p>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>

            <div
              className={`hidden lg:block absolute top-[20%] left-0 cursor-pointer rounded-full shadow-2xl z-20 bg-white border-4  -translate-x-1/2 select-none border-white ${
                activeSlide > 0 ? "visible" : "invisible"
              }`}
              ref={prevRef}
            >
              <BsArrowLeftCircle className="text-5xl " />
            </div>
            <div
              className={`hidden lg:block absolute top-[20%] right-0 cursor-pointer rounded-full shadow-2xl z-20 bg-white border-4 translate-x-1/2 select-none border-white ${
                activeSlide + 3 < allBlogs.length ? "visible" : "invisible"
              }`}
              ref={nextRef}
            >
              <BsArrowRightCircle className="text-5xl" />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default BlogDetails;
