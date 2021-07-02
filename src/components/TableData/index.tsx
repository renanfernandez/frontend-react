import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { table } from 'console';

type TableProps = {
    title?: string,
    body?: string,
    id?: string
}

type PaginationProps = {
    pagination?: number    
    limit?: number
    page?: number
    pages?: number
    total?: number
}

type TableContent = {
    meta?: PaginationProps
    data?: TableProps[]
}


const TableData: React.FC = () => {
    const initialData = {
        meta: {},
        data: []
    }

    const token = '32076aa84dcb8091eb0e9884c2f8235943c02a4ae061304baac1a68969035fee';
    
    const [tableData, setTableData] = useState<TableContent>(initialData);
    const [isLoaded, setIsLoaded] = useState(false);
    const [pageTable, setPageTable] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(1);

    const getData = () => {

        axios.get(`https://gorest.co.in/public-api/posts?_format=json&access-token=${token}&page=${pageTable}`)
        .then(function (response) {
            console.log(response);
            setTableData(response.data);
            setTotalPages(response.data.meta.pagination.pages);
            setIsLoaded(true);
        })
        .catch(function (error) {
            console.log(error);
        })
    }

    useEffect(() => {
        getData()
    }, [pageTable])

    
    return (
        <div className="table">
            <div className="table__body">
                <div className="table-header table__row">
                    <div className="table__column">
                        Título
                    </div>
                    <div className="table__column">
                        Conteudo
                    </div>
                </div>
                {
                    !isLoaded && !tableData ? (
                        <div className="table__row">
                            <div className="table__column">
                                carregando
                            </div>
                        </div> 
                    ) : (                        
                        tableData.data !== undefined ? (
                            tableData.data.map( tablerow => (
                                <div className="table__row" key={tablerow.id}>
                                    <div className="table__column">
                                        {tablerow.title}
                                    </div>
                                    <div className="table__column">
                                        {tablerow.body}
                                    </div>
                                </div>

                            ))
                        ) : (
                            <div className="table__row">
                                <div className="table__column">
                                    sem registros
                                </div>
                            </div>
                        )
                    )                 
                    
                }
            </div>
            <div className="table__navigation">
                <div className="table__navigation--count">
                    { totalPages ? `Exibindo ${totalPages} postagens` : `Nada exibindo` }
                </div>
                <div className="table__navigation--pagination">
                    <button onClick={() => setPageTable(1)} className="table__navigation--pagination__prev" disabled={pageTable === 1}> { '<' }</button>
                    <button onClick={() => setPageTable(prevState => prevState - 1)} className={pageTable === 1 ? "disabled" : "table__navigation--pagination__page"}> {pageTable - 1} </button>
                    <button onClick={() => {}} className="table__navigation--pagination__page table__navigation--pagination__page--current"> {pageTable} </button>
                    <button onClick={() => setPageTable(prevState => prevState + 1)} className={pageTable === totalPages ? "disabled" : "table__navigation--pagination__page"}> {pageTable + 1} </button>
                    <button onClick={() => setPageTable(totalPages)} className="table__navigation--pagination__next" disabled={pageTable === totalPages}> { '>' } </button>
                </div>
            </div>
        </div>
    )
}

export default TableData