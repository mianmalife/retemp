import { useState } from 'react'
import useRequest from "./hooks/useRequest"
import Button from "./components/Button";

function testFn() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() > 0.5) {
        resolve("hello")
      } else {
        reject('请求失败了！')
      }
    }, 1000);
  })
}

function createPet(data) {
  return fetch('http://127.0.0.1:4523/m1/3796579-3428745-default/pet', {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      "User-Agent": "Apifox/1.0.0 (https://apifox.com)"
    },
    body: JSON.stringify(data),
    method: 'POST'
  })
}

function App() {
  const [data, setData] = useState()
  const [error, setError] = useState()
  const { loading, runAsync } = useRequest(createPet, {
    manual: false,
    onSuccess: (response) => {
      console.log('success')
      setData(response.data.name)
    },
    onError: (err) => {
      console.log('error', err)
      setError(err.toString())
    },
    defaultParams: { name: 'Hello Kitty', status: 'sold' }
  })
  async function onClick() {
    try {
      const res = await runAsync({ name: 'Hello Kitty', status: 'sold' })
      const jsonData = await res.json()
      console.log(jsonData)
      setData(jsonData.data.name)
      setError('')
    } catch (error) {
      console.log(error, "error...")
      setError(error.toString())
    }
  }

  if (loading) {
    return <div>
      loading...
    </div>
  }
  if (error) {
    return <div>
      <p>{error}</p>
      <Button onClick={onClick} type="primary">手动触发</Button>
    </div>
  }
  return (
    <>
      <p>{data}</p>
      <Button onClick={onClick} type="primary">手动触发</Button>
    </>
  )
}

export default App
