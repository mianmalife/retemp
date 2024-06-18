import Button from './component/Button'
import './App.css'

const clx = 'flex justify-center text-3xl font-bold text-[#333] hover:text-pink-500'
function App() {
  return (
    <>
      <a href='https://tailwindcss.com/docs' target='_blank' className={clx}>
        Hello tailwindcss!
      </a>
      <Button>Normal</Button>
      <Button type='danger' size='lg'>Danger</Button>
      <Button type='primary'>Primary</Button>
      <Button type='success' size='sm'>Success</Button>
    </>
  )
}

export default App
