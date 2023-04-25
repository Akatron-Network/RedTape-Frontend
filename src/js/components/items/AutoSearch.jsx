import React from 'react'

export default function AutoSearch(props) {
  return (
    <>
      <table className="w-full text-sm text-left text-pine_tree">
        <thead className="text-xs text-ghost_white bg-indigo_dye">
          <tr>
            {props.cols.map((c, i) => <th key={i} className="py-2 px-3 font-normal text-sm truncate">{c}</th>)}
          </tr>
        </thead>
        <tbody>
          {props.data.map((f, i) => {

            if (i%2 === 0) { var row_cls = "bg-white cursor-pointer border-b h-[30px] border-alica_blue hover:bg-steel_blue_light transition duration-300" }
            else { var row_cls = "bg-alica_blue_light cursor-pointer border-b h-[30px] border-alica_blue hover:bg-steel_blue_light transition duration-300" }

            return (
              <tr key={i} onClick={() => props.func(f.details.id)} className={row_cls}>
                <td className="py-[0.20rem] px-3 text-[13px] text-prussian_blue whitespace-nowrap">
                  {f.details.id}
                </td>
                <td className="py-[0.20rem] px-3 text-[13px] text-prussian_blue whitespace-nowrap">
                  {f.details.name}
                </td>
                {props.cols.length > 2 ?            //. For stock autocomplete
                  <>
                    <td className="py-[0.20rem] text-[13px] px-3 text-prussian_blue whitespace-nowrap">
                      {f.details.material}
                    </td>
                    <td className="py-[0.20rem] text-[13px] px-3 text-prussian_blue whitespace-nowrap">
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
