import Button from '../../components/Button'

const clx = 'flex justify-center text-3xl font-bold text-[#333] hover:text-pink-500'
function Demo() {
  return (
    <>
      <a href='https://tailwindcss.com/docs' target='_blank' className={clx}>
        Hello tailwindcss!
      </a>
      <h1 className='fsizes-24'>hello world!</h1>
      <Button>Normal</Button>
      <Button type='danger' size='lg'>Danger</Button>
      <Button type='primary'>Primary</Button>
      <Button type='success' size='sm'>Success</Button>
    </>
  )
}

export default Demo
