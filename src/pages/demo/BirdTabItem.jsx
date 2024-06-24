import clsx from "clsx"

export default function BirdTab({ item, active, handleTabItem }) {
  return <li
    key={item}
    onClick={() => handleTabItem(item)}
    className={clsx({ "transition-all ml-4 first:ml-0 mb-4 w-[120px] text-white bg-blue-500 hover:bg-blue-800 text-center cursor-pointer p-2 rounded": true, "bg-blue-800": active === item })}>
    {item}
  </li>
}