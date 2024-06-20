import Button from '../../components/Button'
import clsx from "clsx"

export default function TaskItem(props) {
  const { listItem, index, handleComplete, handleDelete } = props
  return <>
    <li className="flex items-center justify-between py-4 first:pt-0 last:pb-0" key={index}>
      <p className={clsx({ 'text-blue-400 text-ellipsis overflow-hidden whitespace-nowrap': true }, { 'line-through': listItem.isComplete })}>{listItem.name}</p>
      <div className="shrink-0">
        <Button type='danger' size='sm' className="ml-0" onClick={() => handleDelete(index)}>删除</Button>
        <Button type='success' size='sm' onClick={() => handleComplete(index)} className="ml-1">{!listItem.isComplete ? '标记完成' : '标记未完成'}</Button>
      </div>
    </li>
  </>
}