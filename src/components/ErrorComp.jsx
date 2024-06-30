export default function ErrorComp({error}) {
  error = error || {}
  return <>
    <p className="text-red-500 text-center">{error.status || ''}</p>
    <p className="text-red-500 text-center">{error.statusText || '系统错误'}</p>
  </>
}