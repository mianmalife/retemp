import { useState } from 'react'
import Button from '@/components/Button'
import clsx from "clsx"

export default function TaskItem({ listItem, id, handleComplete, handleDelete, handleEdit, handleSureEdit }) {
  const [value, setValue] = useState(listItem.name)
  function handleInput(e) {
    setValue(e.target.value)
  }
  if (!listItem.showInput) {
    return <>
        <li className="flex items-center justify-between py-4 first:pt-0 last:pb-0" key={id}>
      <p className={clsx({ 'text-blue-400 text-ellipsis overflow-hidden whitespace-nowrap': true }, { 'line-through': listItem.isComplete })}>{listItem.name}</p>
      <div className="shrink-0">
        <Button type='danger' size='sm' className="ml-0" onClick={() => handleDelete(id)}>删除</Button>
        {!listItem.isComplete && <Button type='primary' size='sm' className="ml-1" onClick={() => handleEdit(id)}>编辑</Button>}
        <Button type='success' size='sm' onClick={() => handleComplete(id)} className="ml-1">{!listItem.isComplete ? '标记完成' : '标记未完成'}</Button>
      </div>
    </li>
    </>
  }
  return <>
    <li className="flex items-center justify-between py-4 first:pt-0 last:pb-0" key={id}>
    <input className='w-[50%] border rounded-md outline-none px-3 h-8 hover:border-blue-100 focus:border-blue-100 active:border-blue-300' autoFocus value={value} onChange={handleInput} />
      <div className="shrink-0">
        <Button type='danger' size='sm' className="ml-0" onClick={() => handleDelete(id)}>删除</Button>
        <Button type='primary' size='sm' className="ml-1" onClick={() => handleSureEdit(id, value)}>完成</Button>
      </div>
    </li>
  </>
}