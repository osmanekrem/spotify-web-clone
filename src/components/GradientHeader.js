import { Icon } from 'Icons'
import React, { useEffect, useState } from 'react'
import { FastAverageColor } from 'fast-average-color';
import store from 'redux/store';
import { setModal } from 'redux/modals/modals';


export default function GradientHeader({faxColor, img, upperTitle, title, subImg, subber1, subber2, isProfile=false, isEditable=false}) {
    const [color, setColor] = useState(faxColor || "#535353")
    const fac = new FastAverageColor();
    const getColor = (img) => {
      if(!img){
        setColor(faxColor || "#535353")
        return null
      }
        fac.getColorAsync(img,{
          ignoredColor: [255, 255, 255, 255, 100] // white
      })
          .then(color => setColor(color.hex))
          .catch(e => console.log(e))
      }
    useEffect(() => {
      getColor(img)
    }, [img])
  return (
    <div className={`h-[30vh] max-h-[500px] w-full min-h-[340px] flex pb-6 -mt-16 px-8 `}>
            <div style={{backgroundColor: color}} className={`h-[30vh] max-h-[500px] w-full min-h-[340px] flex absolute top-0 left-0 pb-6 px-4`}></div>
            <div className={`h-[30vh] max-h-[500px] w-full min-h-[340px] flex absolute top-0 left-0 pb-6 px-4 bg-gradient-to-br from-transparent to-[rgba(0,0,0,0.5)]`}></div>
            <div className={`mr-6 h-[192px] ${isEditable ? "group relative" : ""} flex items-center justify-center min-w-[192px] w-[192px] bg-active text-7f z-10 align-baseline self-end playlist-cover-shadow rounded-full`}>
                {img ? <img src={img} className={`${isProfile ? "rounded-full" : ""}`} /> : <Icon name="defaultUser" size={48}/>}
                {
                  isEditable && <div onClick={() => store.dispatch(setModal("updateProfile"))} className={`hidden group-hover:flex bg-[#000000b3] text-white ${isProfile ? "rounded-full" : ""} flex-col gap-y-2 items-center justify-center absolute top-0 left-0 w-full h-full`}>
                        <span className='mt-4 flex items-center justify-center flex-col'>
                          <Icon name="edit" size={48} />
                          <label className="font-semibold cursor-pointer">Fotoğraf seç</label>
                        </span>
                    </div>
                }
            </div>
            <div className='z-10 justify-end flex flex-col h-full '>
                <h2 className='font-bold uppercase mt-1 text-xs'>{upperTitle}</h2>
                <h1 className=' break-words w-full text-left mt-[calc(8px+0.08em)] mb-[0.12em]  text-6xl font-bold whitespace-nowrap'>{title}</h1>
                <div className='mt-2 flex items-center'>
                  <div className={`text-[#fff] flex gap-1 ${isProfile ? "" : "font-semibold"}`}>
                    {subImg && <img className='rounded-full w-6 h-6' src={subImg} />}
                    <span className='hover:underline cursor-pointer'>{subber1}</span>
                  </div>
                  <span className='ml-1'>
                  • {subber2}
                  </span>
                </div>
            </div>
        </div>
  )
}
