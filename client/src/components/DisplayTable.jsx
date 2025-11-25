import React from 'react'
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table'

const DisplayTable = ({ data, column }) => {
  const table = useReactTable({
    data,
    columns: column,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <div className="p-2 overflow-x-auto">
      <table className="w-full border-collapse">
        <thead className="bg-black text-white">
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              <th className="border px-3 py-2">Sr.No</th>
              {headerGroup.headers.map(header => (
                <th
                  key={header.id}
                  className="border px-3 py-2 whitespace-nowrap text-left"
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row, index) => (
            <tr
              key={row.id}
              className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white hover:bg-gray-100'}
            >
              <td className="border px-3 py-2 text-center">{index + 1}</td>
              {row.getVisibleCells().map(cell => (
                <td
                  key={cell.id}
                  className="border px-3 py-2 whitespace-nowrap text-left"
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="h-4" />
    </div>
  )
}

export default DisplayTable
