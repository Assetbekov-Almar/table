import React, {useMemo} from 'react'
import { useTable, usePagination, useSortBy, useGlobalFilter} from 'react-table'
import DATA from './MOCK_DATA.json'
import COLUMNS from './column'
import './table.css'

function Table() {
	const columns = useMemo(() => COLUMNS, []),
	      data = useMemo(() => DATA, []),
	      {
	        getTableProps,
	        getTableBodyProps,
	        headerGroups,
	        page,
	        prepareRow,
	        pageOptions,
	        pageCount,
	        gotoPage,
	        nextPage,
	        previousPage,
	        canNextPage,
	        canPreviousPage,
	        setPageSize,
	        setGlobalFilter,
	        state: {pageIndex, pageSize, globalFilter}
	      } = useTable(
	                    {columns, data, initialState: {pageSize: 50}},
	                    useGlobalFilter,
	                    useSortBy,
	                    usePagination
	                  )
	return (
		<div>
			<div className="search">
				Search:{' '}
				<input 
				    className="search-bar" 
				    type="text"
				    value={globalFilter || ''}
				    onChange={e => setGlobalFilter(e.target.value)}
				/>
			</div>

			<table {...getTableProps()}>
				<thead>
					{
						headerGroups.map(headerGroup => (
							<tr {...headerGroup.getHeaderGroupProps()}>
								{headerGroup.headers.map(column => (
									<th {...column.getHeaderProps(column.getSortByToggleProps())}>{column.render('Header')}
										<span>
											{
												column.isSorted
													? column.isSortedDesc
														? ' 🔽'
														: ' 🔼'
													: ''
											}
										</span>
									</th>
								))}
							</tr>
						))
					}
				</thead>
				<tbody {...getTableBodyProps()}>
					{
						page.map(row => {
							prepareRow(row)
							return (
								<tr {...row.getRowProps()}>
									{row.cells.map(cell => {
										return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
									})}
								</tr>
							)
						})
					}
				</tbody>
			</table>
			<div className="pagination">
				<button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
				{'<<'}
				</button>{' '}
				<button onClick={() => previousPage()} disabled={!canPreviousPage}>
				{'<'}
				</button>{' '}
				<button onClick={() => nextPage()} disabled={!canNextPage}>
				{'>'}
				</button>{' '}
				<button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
				{'>>'}
				</button>{' '}
				<span className="pages">
					Page{' '}
					<strong>
						{pageIndex + 1} of {pageOptions.length}
					</strong>{' '}
				</span>

				<select
					value={pageSize}
					onChange={e => setPageSize(Number(e.target.value))}
				>
					{[10, 20, 30, 40, 50].map(pageSize => (
						<option key={pageSize} value={pageSize}>
							Show {pageSize}
						</option>
					))}
        		</select>
			</div>
		</div>
	)
}

export default Table