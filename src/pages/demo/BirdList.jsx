export default function BirdList({ data }) {
  function revertUnicode(unicode) {
    try {
      const stand = unicode.map(item => `0x${item.slice(2)}`)
      return {
        icon: String.fromCodePoint(...stand), // String.fromCodePoint.apply(null, stand)
        origin: stand
      }
    } catch (error) {
      console.warn(error)
    }
  }
  return <>
    {data.map(item => (
      <li key={item.unicode} className="flex items-center">
        <span className="text-xl">{revertUnicode(item.unicode).icon}</span>
        <div className="ml-3">
          <p>{item.name}</p>
          <p className="text-gray-400">{item.group}</p>
        </div>
      </li >
    ))
    }
  </>
}