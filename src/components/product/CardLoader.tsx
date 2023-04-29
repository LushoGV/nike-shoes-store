import React from 'react'

type Props = {}

const CardLoader = (props: Props) => {
  return (
    <article className="hover:scale-[1.03] cursor-pointer duration-300 bg-white">
        <section className="bg-[#f6f6f6] flex items-center justify-center">
          <div className='bg-slate-400 w-full h-full'></div>
        </section>
        <footer className="py-4 px-2 flex flex-col">
          <h3 className="text-base"></h3>

          <div className="flex flex-col text-slate-500 mb-3">
            <span className="leading-6"></span>
            <span className="leading-6">
            </span>
          </div>

        </footer>
    </article>
  )
}

export default CardLoader