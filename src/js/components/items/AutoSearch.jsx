import React from 'react'

export default function AutoSearch(props) {
  return (
    <>
      <table className="w-full text-sm text-left text-pine_tree">
        <thead className="text-xs text-prussian_blue bg-steel_blue_light">
          <tr>
            <th className="py-2 px-5 font-bold text-sm">Cari Kod</th>
            <th className="py-2 px-5 font-bold text-sm">Cari İsim</th>
          </tr>
        </thead>
        <tbody>
          {props.data.map((f, i) => {
            return (
              <tr key={i} onClick={() => props.func(f.details.id)} className="bg-gray-100 cursor-pointer border-b h-9 border-alica_blue hover:bg-alica_blue_middle transition duration-300">
                <td className="py-[0.20rem] px-5 text-prussian_blue whitespace-nowrap">
                  #{f.details.id}
                </td>
                <td className="py-[0.20rem] px-5 text-prussian_blue whitespace-nowrap">
                  {f.details.name}
                </td>
              </tr>
            )
          })}
        </tbody>
      </table> 
    </>
  )
}
