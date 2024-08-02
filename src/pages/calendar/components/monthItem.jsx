import React from "react";
import { Fragment } from "react";

export function MonthItem({ months }) {
  // const mData = months.getMonth()
  console.log(months, '8888')
  return <>
    {
      months.map((item, index) => <ul className="bg-gray-100 relative grid grid-cols-7 text-center z-20" key={index}>
        <li>日</li>
        <li>一</li>
        <li>二</li>
        <li>三</li>
        <li>四</li>
        <li>五</li>
        <li>六</li>
        <h2 className="absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] text-7xl text-gray-300 text-opacity-80 font-bold z-[-1]">{index + 1}月</h2>
        {item.map((it, idx) => <Fragment key={idx}>
          {it.map((is, isx) => <li key={isx}>{is.getDay()}</li>)}
        </Fragment>)}
      </ul>)
    }
  </>
}