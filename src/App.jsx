import { Icon } from '@iconify/react'
import clsx from 'clsx'
import Demo from "./pages/demo/demo"
import useScroll from './hook/useScroll'

function App() {
  const scrollToPx = useScroll()
  function handleScrollTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
  const IconClassName = clsx(scrollToPx > 100 ? 'right-4' : 'right-[-100px]', 'ease-out duration-200 flex items-center justify-center cursor-pointer w-12 h-12 bg-white border shadow-sm hover:bg-slate-200 rounded-full fixed right-4 bottom-6')
  return (
    <>
      <Demo />
      <div className={IconClassName} onClick={handleScrollTop}>
        <Icon icon="tdesign:backtop" width={26} height={26} />
      </div>
    </>
  )
}

export default App
