import React from "react";
import { Fragment } from "react";
import clsx from "clsx"

export function MonthItem({ months }) {
  function calcLunar(date) {
    const luna = Lunar.fromDate(new Date(date))
    return luna.getDayInChinese()
  }
  function calcFestival(w) {
    const festivals = Solar.fromYmd(w.getYear(), w.getMonth(), w.getDay())
    const result = festivals.getFestivals()
    return result
  }
  function isWork(w) {
    const holi = HolidayUtil.getHoliday(w.getYear(), w.getMonth(), w.getDay())
    return holi?.isWork()
  }
  return <>
    {
      months.map((mon, index) => <ul className="bg-gray-50 relative grid grid-cols-7 auto-rows-max auto-cols-max text-center z-20 py-1" key={index}>
        <li className="text-slate-900">日</li>
        <li className="text-slate-900">一</li>
        <li className="text-slate-900">二</li>
        <li className="text-slate-900">三</li>
        <li className="text-slate-900">四</li>
        <li className="text-slate-900">五</li>
        <li className="text-slate-900">六</li>
        <h2 className="absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] text-7xl text-gray-300 text-opacity-80 font-bold z-[-1]">{index + 1}月</h2>
        {mon.map((week, idx) => <Fragment key={idx}>
          {week.map((w, isx) => <li key={isx}
            className='relative h-10 my-2 box-content'>
            <span className={clsx({ 'text-slate-900': w.getMonth() === index + 1, 'text-slate-400': w.getMonth() !== index + 1 })}>{w.getDay()}</span>
            <i className={clsx({ 'w-[100%] text-clip overflow-hidden whitespace-nowrap absolute bottom-0.5 left-[50%] translate-x-[-50%] text-xs not-italic': true }
              , { 'text-slate-400': w.getMonth() !== index + 1 }, { 'text-gray-500': w.getMonth() === index + 1 }, { 'text-rose-500': calcFestival(w).length > 0 })}>
              {calcFestival(w).length > 0 ? calcFestival(w) : calcLunar(w.toString())}
            </i>
            <i className={clsx({ 'absolute top-0.5 right-2 fsizes-10': true }, { 'text-lime-500': isWork(w) === false })}>
              {isWork(w) === false ? '休' : isWork(w) === true ? '班' : ''}
            </i>
          </li>)}
        </Fragment>)}
      </ul>)
    }
  </>
}