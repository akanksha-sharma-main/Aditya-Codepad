import React from 'react'
import FeatherIcon from "feather-icons-react";
import mongoose from 'mongoose'
import Movie from '../../models/Movies'
const Watch = ({ movie }) => {
  return (
    <div className="bg-white">
      <style jsx global>{`
          .css-11qbmxu{
            padding-top: 0px;
          }
          .css-1ebwipl-MuiToolbar-root{
            display: none;
          }
      `}</style>
      <div className='h-[180px] bg-black'></div>
      <div className="ml-[11px] mt-[10px]">
        <div>
          <a className="player-title text-base line-clamp-1">INS Vikrant | Aircraft Carrier History, price and working</a><a className='player-title ml-1 text-blue-600 cursor-pointer'>#vigyanrecharge</a>
        </div>
        <div><a className='text-[11px] text-gray-500 text-extralight'>1 lakh views 6 mo ago</a><span className="text-xs font-bold ml-4 cursor-pointer">...more</span></div>
      </div>
      <div className="pl-[11px] ease-in-out duration-500 flex cursor-pointer hover:bg-gray-100"><span><img src="https://d293-2409-4064-2d92-f14f-d9f1-646d-de6c-2b57.in.ngrok.io/static/images/users/user.jpg" className="h-[35px] my-1 mr-[11px] p-[2px] rounded-[50%]" /></span><div className="self-center"><span className="font-semibold text-[12.3px] w-[80px] truncate">Vigyan Recharge </span><span className="text-xs  text-gray-500 text-extralight ml-3 mr-10">13.1 lakh</span><span className="bg-[#0f0f0f] px-3 py-1.5 text-white rounded-3xl text-[12px]  cursor-pointer mb-2">Subscribe</span></div></div>
      <div className="pl-[6px] m-1.5 flex overflow-x-scroll pb-2">
        <div className="bg-[#f2f2f2] mr-2 px-3 pt-1.5 w-[110px] text-black rounded-3xl h-[27px] flex text-[12px] pb-0.5 cursor-pointer"><FeatherIcon className='mr-2' icon="thumbs-up" strokeWidth="1.5px" color="#000000" width="15" height="15" />7.4K<div className="border-l ml-2 w-0.5 border-gray-300" /><FeatherIcon strokeWidth="1.5px" className='ml-2' icon="thumbs-down" color="#000000" width="15" height="15" /></div>
        <div className="bg-[#f2f2f2] mr-2 px-3 pt-1.5 w-[99px] text-black rounded-3xl h-[27px] flex text-[12px] pb-0.5 text-center cursor-pointer"><FeatherIcon className='mr-2' icon="message-square" strokeWidth="1.5px" color="#000000" width="15" height="15" />Chats</div>
        <div className="bg-[#f2f2f2] mr-2 px-3 pt-1.5 w-[99px] text-black rounded-3xl h-[27px] flex text-[12px] pb-0.5 text-center cursor-pointer"><FeatherIcon className='mr-2' icon="share" strokeWidth="1.5px" color="#000000" width="15" height="15" />Share</div>
        <div className="bg-[#f2f2f2] mr-2 px-3 pt-1.5 w-[99px] text-black rounded-3xl h-[27px] flex text-[12px] pb-0.5 text-center cursor-pointer"><FeatherIcon className='mr-2' icon="video" strokeWidth="1.5px" color="#000000" width="15" height="15" />shorts</div>
      </div>
      <div className="bg-[#f2f2f2] py-2 pt-1 pb-2 h-[70px] mx-[12px] rounded-xl">
        <span><a className='text-[13px] pl-[4px] ml-2 font-bold'>Comments</a><a className='text-[11px] text-gray-500 ml-1 font-light'>174</a></span>
        <div className="pl-[11px] ease-in-out duration-500 mb-5 flex cursor-pointer hover:bg-gray-100"><img src="http://localhost:3000/static/images/users/user2.jpg" className="h-[28px] my-1 mr-[11px] p-[2px] rounded-[50%]"/><span className="text-[11.4px]">Itne Achhe se sirf ek engineer hi samjha sakta hai 😁</span><FeatherIcon strokeWidth="1px" className='mr-3 ml-1 mt-2.5' icon="chevron-down" color="#000000" width="15" height="15"/></div>
      </div>
    </div>
  )
}

export default Watch

export async function getServerSideProps(context) {
  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(process.env.MONGO_URI)
  }
  const watch = context.query.watch
  let movies = await Movie.findOne({ _id: watch })
  return {
    props: { movie: JSON.parse(JSON.stringify(movies)) },
  }
}
{/*100% 320 x 650 px iphone 12/13 Pro*/ }