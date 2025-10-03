// import React, { useEffect, useState } from "react"
// import ReactStars from "react-rating-stars-component"
// // Import Swiper React components
// import { Swiper, SwiperSlide } from "swiper/react"

// // Import Swiper styles
// import "swiper/css"
// import "swiper/css/free-mode"
// import "swiper/css/pagination"
// import "../../App.css"
// // Icons
// import { FaStar } from "react-icons/fa"
// // Import required modules
// import { Autoplay, FreeMode, Pagination } from "swiper"

// // Get apiFunction and the endpoint
// import { apiConnector } from "../../services/apiConnector"
// import { ratingsEndpoints } from "../../services/apis"

// function ReviewSlider() {
//   const [reviews, setReviews] = useState([])
//   const truncateWords = 15

//   useEffect(() => {
//     ;(async () => {
//       const { data } = await apiConnector(
//         "GET",
//         ratingsEndpoints.REVIEWS_DETAILS_API
//       )
//       if (data?.success) {
//         setReviews(data?.data)
//       }
//     })()
//   }, [])

//   // console.log(reviews)

//   return (
//     <div className="text-white">
//       <div className="my-[50px] h-[184px] max-w-maxContentTab lg:max-w-maxContent">
//         <Swiper
//           slidesPerView={4}
//           spaceBetween={25}
//           loop={true}
//           freeMode={true}
//           autoplay={{
//             delay: 2500,
//             disableOnInteraction: false,
//           }}
//           modules={[FreeMode, Pagination, Autoplay]}
//           className="w-full "
//         >
//           {reviews.map((review, i) => {
//             return (
//               <SwiperSlide key={i}>
//                 <div className="flex flex-col gap-3 bg-richblack-800 p-3 text-[14px] text-richblack-25">
//                   <div className="flex items-center gap-4">
//                     <img
//                       src={
//                         review?.user?.image
//                           ? review?.user?.image
//                           : `https://api.dicebear.com/5.x/initials/svg?seed=${review?.user?.firstName} ${review?.user?.lastName}`
//                       }
//                       alt=""
//                       className="h-9 w-9 rounded-full object-cover"
//                     />
//                     <div className="flex flex-col">
//                       <h1 className="font-semibold text-richblack-5">{`${review?.user?.firstName} ${review?.user?.lastName}`}</h1>
//                       <h2 className="text-[12px] font-medium text-richblack-500">
//                         {review?.course?.courseName}
//                       </h2>
//                     </div>
//                   </div>
//                   <p className="font-medium text-richblack-25">
//                     {review?.review.split(" ").length > truncateWords
//                       ? `${review?.review
//                           .split(" ")
//                           .slice(0, truncateWords)
//                           .join(" ")} ...`
//                       : `${review?.review}`}
//                   </p>
//                   <div className="flex items-center gap-2 ">
//                     <h3 className="font-semibold text-yellow-100">
//                       {review.rating.toFixed(1)}
//                     </h3>
//                     <ReactStars
//                       count={5}
//                       value={review.rating}
//                       size={20}
//                       edit={false}
//                       activeColor="#ffd700"
//                       emptyIcon={<FaStar />}
//                       fullIcon={<FaStar />}
//                     />
//                   </div>
//                 </div>
//               </SwiperSlide>
//             )
//           })}
//           {/* <SwiperSlide>Slide 1</SwiperSlide> */}
//         </Swiper>
//       </div>
//     </div>
//   )
// }

// export default ReviewSlider


import React, { useEffect, useState } from "react"
import ReactStars from "react-rating-stars-component"
import { Swiper, SwiperSlide } from "swiper/react"

import "swiper/css"
import "swiper/css/free-mode"
import "swiper/css/pagination"
import "../../App.css"
import { FaStar } from "react-icons/fa"
import { Autoplay, FreeMode, Pagination } from "swiper"

import { apiConnector } from "../../services/apiConnector"
import { ratingsEndpoints } from "../../services/apis"

function ReviewSlider() {
  const [reviews, setReviews] = useState([])
  const [expanded, setExpanded] = useState({}) // track expanded state per card
  const previewChars = 50 // initial preview length

  useEffect(() => {
    ;(async () => {
      const { data } = await apiConnector(
        "GET",
        ratingsEndpoints.REVIEWS_DETAILS_API
      )
      if (data?.success) {
        setReviews(data?.data)
      }
    })()
  }, [])

  const toggleExpand = (index) => {
    setExpanded((prev) => ({ ...prev, [index]: !prev[index] }))
  }

  return (
    <div className="text-white">
      <div className="my-[50px] w-full px-6">
        <Swiper
          loop={true}
          freeMode={true}
          spaceBetween={25}
          autoplay={{ delay: 2500, disableOnInteraction: false }}
          breakpoints={{
            320: { slidesPerView: 1 },
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
            1280: { slidesPerView: 4 },
          }}
          modules={[FreeMode, Pagination, Autoplay]}
          className="w-full"
        >
          {reviews.map((review, i) => {
            const fullText = review?.review || ""
            const isExpanded = expanded[i]
            const displayText = isExpanded
              ? fullText
              : fullText.slice(0, previewChars) + (fullText.length > previewChars ? "..." : "")

            return (
              <SwiperSlide key={i} className="!w-auto">
                <div className="flex flex-col gap-3 bg-richblack-800 p-4 rounded-xl shadow-md min-w-[250px] max-w-[320px] overflow-hidden transition-all duration-300">
                  {/* User Info */}
                  <div className="flex items-center gap-3">
                    <img
                      src={
                        review?.user?.image
                          ? review?.user?.image
                          : `https://api.dicebear.com/5.x/initials/svg?seed=${review?.user?.firstName} ${review?.user?.lastName}`
                      }
                      alt=""
                      className="h-10 w-10 rounded-full object-cover"
                    />
                    <div>
                      <h1 className="font-semibold text-richblack-5">
                        {`${review?.user?.firstName} ${review?.user?.lastName}`}
                      </h1>
                      <h2 className="text-[12px] text-richblack-400">
                        {review?.course?.courseName}
                      </h2>
                    </div>
                  </div>

                  {/* Review Text */}
                  <p className="text-sm text-richblack-200 leading-relaxed break-words">
                    {displayText}
                  </p>

                  {/* Show More / Show Less button */}
                  <button
                    onClick={() => toggleExpand(i)}
                    className="text-xs text-yellow-200 hover:underline self-start"
                  >
                    {isExpanded ? "Show less" : "Show more"}
                  </button>

                  {/* Rating */}
                  <div className="flex items-center gap-2 mt-auto">
                    <h3 className="font-semibold text-yellow-100">
                      {review.rating.toFixed(1)}
                    </h3>
                    <ReactStars
                      count={5}
                      value={review.rating}
                      size={18}
                      edit={false}
                      activeColor="#ffd700"
                      emptyIcon={<FaStar />}
                      fullIcon={<FaStar />}
                    />
                  </div>
                </div>
              </SwiperSlide>
            )
          })}
        </Swiper>
      </div>
    </div>
  )
}

export default ReviewSlider


