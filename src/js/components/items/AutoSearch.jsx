import React from 'react'

export default function AutoSearch(props) {
  return (
    <>
      <table className="w-full text-sm text-left text-pine_tree">
        <thead className="text-xs text-prussian_blue bg-steel_blue_light">
          <tr>
            {props.cols.map((c, i) => <th key={i} className="py-2 px-3 font-bold text-sm truncate">{c}</th>)}
          </tr>
        </thead>
        <tbody>
          {props.data.map((f, i) => {
            return (
              <tr key={i} onClick={() => props.func(f.details.id)} className="bg-gray-100 cursor-pointer border-b h-9 border-alica_blue hover:bg-alica_blue_middle transition duration-300">
                <td className="py-[0.20rem] px-3 text-prussian_blue whitespace-nowrap">
                  #{f.details.id}
                </td>
                <td className="py-[0.20rem] px-3 text-prussian_blue whitespace-nowrap">
                  {f.details.name}
                </td>
                {props.cols.length > 2 ?            //. For stock autocomplete
                  <>
                    <td className="py-[0.20rem] px-3 text-prussian_blue whitespace-nowrap">
                      {f.details.material}
                    </td>
                    <td className="py-[0.20rem] px-3 text-prussian_blue whitespace-nowrap">
                      {f.details.product_group}
                    </td>
                  </>
                  :
                  undefined
                }
              </tr>
            )
          })}
        </tbody>
      </table> 
    </>
  )
}
