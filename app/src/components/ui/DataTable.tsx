import type { ReactNode } from 'react'

export type Column<T> = {
  key: string
  header: string
  className?: string
  render: (row: T) => ReactNode
}

export function DataTable<T>({
  columns,
  rows,
  rowKey,
  onRowClick,
}: {
  columns: Column<T>[]
  rows: T[]
  rowKey: (row: T) => string
  onRowClick?: (row: T) => void
}) {
  return (
    <div className="overflow-x-auto rounded-card border border-hairline bg-card">
      <table className="w-full border-collapse text-left">
        <thead>
          <tr className="bg-bone">
            {columns.map((c) => (
              <th key={c.key} className={`eyebrow px-4 py-3 font-normal text-charcoal ${c.className ?? ''}`}>
                {c.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr
              key={rowKey(row)}
              onClick={onRowClick ? () => onRowClick(row) : undefined}
              className={`border-t border-hairline ${onRowClick ? 'cursor-pointer hover:bg-bone/60' : ''}`}
            >
              {columns.map((c) => (
                <td key={c.key} className={`px-4 py-3 text-sm text-body ${c.className ?? ''}`}>
                  {c.render(row)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
