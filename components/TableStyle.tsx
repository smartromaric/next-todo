import React from 'react'

interface Data {
  id: number ,
  title : string,
  content : string,
  completed: boolean, 
}
interface DataItems {
  items: Data []
}

export default function TableStyle({items}:DataItems) {
  return (
    <div>
        <table>
            <thead>
              <th>Title</th>
              <th>Content</th>
              <th>Completed</th>
            </thead>
            <tbody>
              {
                items.map((items) => (
                  <tr>
                    <td>{items.title}</td>
                    <td>{items.content}</td>
                    <td>{items.completed}</td>
                  </tr>
                ))
              }
            </tbody>
        </table>
    </div>
  )
}
