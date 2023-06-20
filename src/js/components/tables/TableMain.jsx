import React, { useCallback, useMemo, useState } from 'react';
import { MaterialReactTable } from 'material-react-table'
import { MRT_Localization_TR } from 'material-react-table/locales/tr';
import { IconButton, Tooltip, createTheme, ThemeProvider, useTheme } from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from '@tanstack/react-query';
import axios from 'axios';
import { useOrdersEntry } from '../../context/OrdersEntryContext';

// import * as XLSX from 'xlsx'

const Example = () => {
  const { columns } = useOrdersEntry();

  const [columnFilters, setColumnFilters] = useState([]);
  const [globalFilter, setGlobalFilter] = useState('');
  const [sorting, setSorting] = useState([]);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 20,
  });

  const { data, isError, isFetching, isLoading, refetch } = useQuery({
    queryKey: [
      'table-data',
      columnFilters, //refetch when columnFilters changes
      pagination.pageIndex, //refetch when pagination.pageIndex changes
      pagination.pageSize, //refetch when pagination.pageSize changes
      globalFilter, //refetch when globalFilter changes
      sorting, //refetch when sorting changes
    ],
    queryFn: async () => {
      const fetchURL = new URL('order', "http://redtape-app.akatron.net:999/");

      let order = []
      for (let s of sorting) {      
        if (s.id === "nets_code" || s.id === "name") {
          order.push({
            current: {
              [s.id]: (s.desc ? 'desc' : 'asc')
            }
          })
        }
        else {
          order.push({ 
            [s.id]: (s.desc ? 'desc' : 'asc')
          })
        }
      }

      let search = [];
      if (globalFilter !== undefined) {
        if (globalFilter.length > 0) {
          for (let c of columns) {
            if (c.enableGlobalFilter === false) continue;
            if (c.id === "nets_code") continue;
            else if (c.id === "current_name") continue;
            
            search.push(
              {
                [c.id] : {
                  contains: (globalFilter === undefined || globalFilter === null) ? "" : globalFilter,
                  mode: 'insensitive'
                }
              }
            )
          }

          search.push({
            current_final_balances: {
              current: {
                name: {
                  contains:  (globalFilter === undefined || globalFilter === null) ? "" : globalFilter,
                  mode: 'insensitive'
                }
              }
            }
          })
        }
      }
      else {
        search = [];
      }

      if (columnFilters.length > 0) {
        for (let cf of columnFilters) {
          if (cf.id === "nets_code" || cf.id === "name") {
            search.push({
              current: {
                [cf.id]: {
                  contains: cf.value,
                  mode: 'insensitive'
                }
              }
            })
          }
          else {
            search.push({
              [cf.id] : {
                contains: cf.value,
                mode: 'insensitive'
              } 
            })
          }
        }
      }
      
      const response = await axios({
        method: 'get',
        url: fetchURL.href,
        params: {
          skip: pagination.pageIndex * pagination.pageSize,
          take:  pagination.pageSize,
          orderBy: order,
          where: {
            OR: search
          }
        },
        headers: {token: localStorage.token, "Content-Type": "application/json"}
      })
      
      return response.data;

    },
    keepPreviousData: true,
    refetchOnWindowFocus: false,
  });

  const theme = "light";
  const globalTheme = useTheme();
  const tableTheme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: theme, //let's use the same dark/light mode as the global theme
          primary: globalTheme.palette.info, //swap in the secondary color as the primary for the table
          
          info: {
            main: 'rgb(255,122,0)', //add in a custom color for the toolbar alert background stuff
          },
          background: {
            default:
              theme === 'light'
                ? '#FFF'
                : '#1F3245', //pure black table in dark mode for fun
          },
        },
        typography: {
          fontFamily: 'Rubik',
        },
        components: {
          MuiTooltip: {
            styleOverrides: {
              tooltip: {
                fontSize: '.9rem', //override to make tooltip font size larger
              },
            },
          },
        },
      }),
    [theme],
  );
  
  // const handleExportData = () => {
  //   let dt = data.Data
  //   let removed_cols = ["control", "current", "ford_content", "nets_content", "stocks", "control_state", "control", "id", "control_error", "control_id"]
  //   for (let r of removed_cols) {
  //     for (let d of dt) {
  //       delete d[r]
  //     }
  //   }

  //   let heading = [['Tip', 'Tarih', 'Tutar', 'Ford Fatura No', 'Netsis Fatura No']];

  //   const wb = XLSX.utils.book_new();
  //   const ws = XLSX.utils.json_to_sheet([]);
  //   XLSX.utils.sheet_add_aoa(ws, heading);

  //   XLSX.utils.sheet_add_json(ws, data.Data, { origin: 'A2', skipHeader: true });
  //   XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
  //   XLSX.writeFile(wb, 'Fatura.xlsx');
  // }

  return (
    <ThemeProvider theme={tableTheme}>
      <MaterialReactTable
        columns={columns}
        data={data?.Data ?? []} //data is undefined on first render
        // enableColumnFilters={false}
        // enableGlobalFilter={false}
        // enableColumnFilterModes //enable changing filter mode for all columns unless explicitly disabled in a column def
        enableStickyHeader
        enableColumnOrdering 
        enableRowNumbers
        enableColumnResizing
        globalFilterFn="contains"
        renderDetailPanel={false}
        initialState={{
          density: 'compact'
        }}
        renderTopToolbarCustomActions={(table) => {
          return (
            <div className='flex items-center'>
              <Tooltip arrow title="Yenile">
                <IconButton onClick={() => refetch()}>
                  <RefreshIcon />
                </IconButton>
              </Tooltip>

              {/* <Tooltip arrow title="Excel (.xlsx) İndir">
                <IconButton
                  onClick={() => handleExportData()}
                  variant="contained"
                  className="w-10"
                >
                  <i className="fa-solid fa-file-excel"></i>
                </IconButton>
              </Tooltip> */}
            </div>
          )
        }}
        localization={MRT_Localization_TR}
        muiTableContainerProps={{
          sx: () => ({      
            maxHeight: 71.5 + "vh",
          })
        }} 
        muiTableHeadProps={{
          sx: () => ({
            '& .MuiTableRow-root': {
              backgroundColor: theme === 'light'
              ? ''
              : '#273A4C',
            },
         
          })
        }}
        muiTableHeadCellProps={{
          sx: {
            color: (theme === 'light'
            ? '#314F85'
            : '#F6F6F6'),

            borderColor: theme === 'light'
            ? '#'
            : '#334350',
          }
        }}
        muiTableBodyProps={{
          sx: () => (
            {
              '& tr:nth-of-type(odd)': { //. 1-3-5... row numbers bg.  
                backgroundColor: theme === 'light'
                ? 'rgba(237, 237, 237, 1)'
                : '#1C3044',
              },
            }
          )
        }}
        muiTableBodyCellProps={{
          sx: {
            color: theme === 'light'
            ? '#314F85'
            : '#F6F6F6',

            borderColor: theme === 'light'
            ? ''
            : '#334350',
          }
        }}
        enableRowActions = {false}
        positionActionsColumn="last"
        muiToolbarAlertBannerProps={
          isError
            ? {
                color: 'error',
                children: 'Veri yüklenirken hata oluştu!',
              }
            : undefined
        }
        manualFiltering
        manualPagination
        manualSorting
        onColumnFiltersChange={setColumnFilters}
        onGlobalFilterChange={setGlobalFilter}
        onPaginationChange={setPagination}
        onSortingChange={setSorting}
        rowCount={data?.Meta?.total ?? 0}
        state={{
          columnFilters,
          globalFilter,
          isLoading,
          pagination,
          showAlertBanner: isError,
          showProgressBars: isFetching,
          sorting,
        }}
      />
    </ThemeProvider>
  );
};

const queryClient = new QueryClient();

const ExampleWithReactQueryProvider = () => (
  <QueryClientProvider client={queryClient}>
    <Example />
  </QueryClientProvider>
);

export default ExampleWithReactQueryProvider;