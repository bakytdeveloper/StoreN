import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import React from "react";
//
// const CustomPagination = ({ totalPages, currentPage, onPageChange }) => {
//     const pageRange = 3; // Количество отображаемых страниц
//     const range = [];
//
//     // Создание списка страниц для отображения
//     const createPageRange = () => {
//         let start = Math.max(currentPage - Math.floor(pageRange / 2), 1);
//         let end = Math.min(start + pageRange - 1, totalPages);
//
//         // Корректировка, если текущая страница близка к началу или концу
//         if (currentPage <= 2) {
//             end = Math.min(pageRange, totalPages);
//         }
//         if (currentPage >= totalPages - 1) {
//             start = Math.max(totalPages - pageRange + 1, 1);
//         }
//
//         for (let i = start; i <= end; i++) {
//             range.push(i);
//         }
//     };
//
//     createPageRange();
//
//     return (
//         <Pagination
//             count={totalPages}
//             page={currentPage}
//             onChange={onPageChange}
//             renderItem={(item) => {
//                 const isActive = item.page === currentPage;
//
//                 return (
//                     <PaginationItem
//                         {...item}
//                         className={`pagination-item ${isActive ? 'active' : ''}`}
//                     />
//                 );
//             }}
//             siblingCount={1}
//             boundaryCount={1}
//             showFirstButton
//             showLastButton
//         />
//     );
// };
//
// export default CustomPagination;



const CustomPagination = ({ totalPages, currentPage, onPageChange }) => {
    const pageRange = 3; // Количество отображаемых страниц
    const range = [];

    // Создание списка страниц для отображения
    const createPageRange = () => {
        // Если текущая страница ближе к началу или к концу
        if (totalPages <= pageRange) {
            // Показываем все страницы
            for (let i = 1; i <= totalPages; i++) {
                range.push(i);
            }
        } else {
            // Показываем текущую, предыдущую и следующую страницу
            if (currentPage > 1) {
                range.push(currentPage - 1);
            }
            range.push(currentPage);
            if (currentPage < totalPages) {
                range.push(currentPage + 1);
            }
        }
    };

    createPageRange();

    return (
        <Pagination
            count={totalPages}
            page={currentPage}
            onChange={onPageChange}
            renderItem={(item) => {
                const isActive = item.page === currentPage;

                return (
                    <PaginationItem
                        {...item}
                        className={`pagination-item ${isActive ? 'active' : ''}`}
                    />
                );
            }}
            siblingCount={1} // Отключаем отображение соседних страниц
            boundaryCount={0} // Отключаем отображение первой и последней страницы
            showFirstButton={false} // Скрываем кнопку первой страницы
            showLastButton={false} // Скрываем кнопку последней страницы
        />
    );
};

export default CustomPagination;