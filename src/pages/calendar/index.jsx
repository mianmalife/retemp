import { MonthItem } from "./components/monthItem";
import useMount from "@/hooks/useMount";
import { useState } from "react";

export default function Calendar() {
  const [months, setMonths] = useState([])
  useMount(() => {
    const d = SolarYear.fromDate(new Date());
    const months = d.getMonths();
    let monthList = []
    for (let i = 0; i < months.length; i++) {
      const weeks = months[i].getWeeks(1)
      monthList[i] = []
      const len = weeks.length
      for (let j = 0; j < weeks.length; j++) {
        if (len === 5 && j === len - 1) {
          monthList[i].push(weeks[j].getDays())
          monthList[i].push(weeks[j].next(1).getDays())
        } else {
          monthList[i].push(weeks[j].getDays())
        }
      }
    }
    setMonths(monthList)
  })
  return <div className="grid 2xl:grid-cols-3 xl:grid-cols-2 lg:grid-cols-2 md:grid-cols-1 w-[90%] mx-auto mt-5 mb-5 gap-4">
    <MonthItem months={months} />
  </div>
}