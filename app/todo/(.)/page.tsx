import React from 'react'
import Link from 'next/link'

export default function page() {
  return (
    <div>
        je suis la 
        <Link href={"/todo/v2"}>les todo</Link>
    </div>
  )
}
