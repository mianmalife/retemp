import { Fragment } from "react";
import clsx from "clsx"
import dayjs from "dayjs";

const weeks = ['一', '二', '三', '四', '五', '六', '日']
export function MonthItem({ months }) {
  function calcFestival(w) {
    const y = w.getYear()
    const m = w.getMonth()
    const d = w.getDay()
    const strDate = w.toString()
    const luna = Lunar.fromDate(new Date(strDate))
    const dayinchinese = luna.getDayInChinese()
    const festivals = Solar.fromYmd(y, m, d)
    const solars = Solar.fromDate(new Date(strDate))
    const lunars = solars.getLunar()
    const luFestival = lunars.getFestivals()
    const solarFestival = festivals.getFestivals()
    const jieqi = lunars.getJieQi()
    return { festival: solarFestival.toString() || luFestival.toString() || jieqi, dayinchinese }
  }
  function isWork(w) {
    const holi = HolidayUtil.getHoliday(w.getYear(), w.getMonth(), w.getDay())
    return holi?.isWork()
  }
  return <>
    {
      months.map((mon, index) => <ul className="bg-gray-50 relative grid grid-cols-7 grid-rows-7 text-center z-20" key={index}>
        {weeks.map(wl => <li key={wl} className="text-slate-900 h-10 leading-10 border-b-slate-200 border-b">{wl}</li>)}
        <h2 className="absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] text-7xl text-gray-300 text-opacity-80 font-bold z-[-1]">{index + 1}月</h2>
        {mon.map((week, idx) => <Fragment key={idx}>
          {week.map((w, isx) => <li key={isx}
            className={clsx({ 'relative w-[80%] h-10 m-2 rounded-lg': true, 'bg-blue-500': dayjs().format('YYYY-MM-DD') === w.toString() })}>
            <span className={clsx({ 'text-slate-900': w.getMonth() === index + 1, 'text-slate-400': w.getMonth() !== index + 1, 'font-bold': dayjs().format('YYYY-MM-DD') === w.toString(), 'text-white': dayjs().format('YYYY-MM-DD') === w.toString() })}>{w.getDay()}</span>
            <i className={clsx({ 'w-[100%] text-clip overflow-hidden whitespace-nowrap absolute bottom-0.5 left-[50%] translate-x-[-50%] text-xs not-italic': true }
              , { 'text-slate-400': w.getMonth() !== index + 1 }, { 'text-gray-500': w.getMonth() === index + 1 }, { 'text-rose-500': calcFestival(w).festival },
              { 'font-bold': dayjs().format('YYYY-MM-DD') === w.toString(), 'text-white': dayjs().format('YYYY-MM-DD') === w.toString() })}>
              {calcFestival(w).festival || calcFestival(w).dayinchinese}
            </i>
            <i className={clsx({ 'not-italic absolute top-[-4px] right-[-4px] text-[0.5em] rounded-lg': true }, { 'text-lime-500': isWork(w) === false })}>
              {isWork(w) === false ? '休' : isWork(w) === true ? '班' : ''}
            </i>
          </li>)}
        </Fragment>)}
      </ul>)
    }
  </>
}