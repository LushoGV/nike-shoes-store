import Image from 'next/image'
import React from 'react'

import logo from "../assets/logo.svg";

type Props = {}

const Loader = (props: Props) => {
  return (
    <section className="fixed top-0 left-0 z-30 bg-slate-200 bg-opacity-30 backdrop-blur-sm w-full h-screen flex">
    <div className="m-auto flex flex-col animate-pulse">
      <Image
        src={logo}
        alt="nike"
        width={160}
        height={70}
        className="mx-auto mb-5"
      />

      <h1 className="font-semibold text-2xl text-center">Loading...</h1>
    </div>
  </section>
  )
}

export default Loader