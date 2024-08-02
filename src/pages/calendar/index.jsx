import { MonthItem } from "./components/monthItem";
import useMount from "@/hooks/useMount";
import { useState } from "react";

export default function Calendar() {
  const [months, setMonths] = useState([])
  useMount(() => {
    var d = SolarYear.fromDate(new Date());
    var months = d.getMonths();
    let monthList = []
    for (let i = 0, j = months.length; i < j; i++) {
      const weeks = months[i].getWeeks()
      monthList[i] = []
      console.log(i, months.length, weeks.length)
      for(let j = 0; j < weeks.length; j++) {
        monthList[i].push(weeks[j].getDays())
      }
    }
    console.log(monthList, '8888999', months)
    setMonths(monthList)
  })
  return <div className="grid grid-cols-3 w-[90%] mx-auto mt-5 mb-5 gap-4">
    <MonthItem months={months}/>
  </div>
}