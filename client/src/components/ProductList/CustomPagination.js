import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import React, {useEffect, useState} from "react";

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



// const CustomPagination = ({ totalPages, currentPage, onPageChange }) => {
//     const pageRange = 3; // Количество отображаемых страниц
//     const range = [];
//
//     // Создание списка страниц для отображения
//     const createPageRange = () => {
//         // Если текущая страница ближе к началу или к концу
//         if (totalPages <= pageRange) {
//             // Показываем все страницы
//             for (let i = 1; i <= totalPages; i++) {
//                 range.push(i);
//             }
//         } else {
//             // Показываем текущую, предыдущую и следующую страницу
//             if (currentPage > 1) {
//                 range.push(currentPage - 1);
//             }
//             range.push(currentPage);
//             if (currentPage < totalPages) {
//                 range.push(currentPage + 1);
//             }
//         }
//     };
//
//     createPageRange();
//
//     return (
//         <Pagination
//             className="pagination-container-block-one"
//
//             count={totalPages}
//             page={currentPage}
//             onChange={onPageChange}
//             renderItem={(item) => {
//                 const isActive = item.page === currentPage;
//
//                 return (
//                     <PaginationItem
//                         classes="pagination-container-block-two"
//                         {...item}
//                         className={`pagination-item ${isActive ? 'active' : ''}`}
//                     />
//                 );
//             }}
//             siblingCount={1} // Отключаем отображение соседних страниц
//             boundaryCount={0} // Отключаем отображение первой и последней страницы
//             showFirstButton={false} // Скрываем кнопку первой страницы
//             showLastButton={false} // Скрываем кнопку последней страницы
//         />
//     );
// };
//
// export default CustomPagination;





// const CustomPagination = ({ totalPages, currentPage, onPageChange }) => {
//     const pageRange = 5; // Количество отображаемых страниц
//     const range = [];
//     const [isSmallScreen, setIsSmallScreen] = useState(false);
//
//     useEffect(() => {
//         const handleResize = () => {
//             setIsSmallScreen(window.innerWidth <= 768);
//         };
//
//         // Устанавливаем начальное значение
//         handleResize();
//
//         // Слушаем изменения размера окна
//         window.addEventListener('resize', handleResize);
//
//         // Очищаем слушателя при размонтировании компонента
//         return () => {
//             window.removeEventListener('resize', handleResize);
//         };
//     }, []);
//
//     const createPageRange = () => {
//         let start = Math.max(currentPage - Math.floor(pageRange / 2), 1);
//         let end = Math.min(start + pageRange - 1, totalPages);
//
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
//                 const isFirstOrLast = item.type === 'first' || item.type === 'last';
//
//                 return (
//                     <PaginationItem
//                         {...item}
//                         className={`pagination-item ${isActive ? 'active' : ''} ${isFirstOrLast ? (item.type === 'first' ? 'pagination-item-first' : 'pagination-item-last') : ''}`}
//                     />
//                 );
//             }}
//             siblingCount={3}
//             boundaryCount={1}
//             showFirstButton={!isSmallScreen} // Показываем кнопки только если экран не маленький
//             showLastButton={!isSmallScreen} // Показываем кнопки только если экран не маленький
//         />
//     );
// };
//
// export default CustomPagination;


//
// const CustomPagination = ({ totalPages, currentPage, onPageChange }) => {
//     const pageRange = 5; // Количество отображаемых страниц
//     const range = [];
//     const [isSmallScreen, setIsSmallScreen] = useState(false);
//
//     useEffect(() => {
//         const handleResize = () => {
//             setIsSmallScreen(window.innerWidth <= 768);
//         };
//
//         // Устанавливаем начальное значение
//         handleResize();
//
//         // Слушаем изменения размера окна
//         window.addEventListener('resize', handleResize);
//
//         // Очищаем слушателя при размонтировании компонента
//         return () => {
//             window.removeEventListener('resize', handleResize);
//         };
//     }, []);
//
//     const createPageRange = () => {
//         let start = Math.max(currentPage - Math.floor(pageRange / 2), 1);
//         let end = Math.min(start + pageRange - 1, totalPages);
//
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
//                 const isFirstOrLast = item.type === 'first' || item.type === 'last';
//
//                 return (
//                     <PaginationItem
//                         {...item}
//                         className={`pagination-item ${isActive ? 'active' : ''} ${isFirstOrLast ? (item.type === 'first' ? 'pagination-item-first' : 'pagination-item-last') : ''}`}
//                     />
//                 );
//             }}
//             siblingCount={isSmallScreen ? 1 : 3} // Меняем siblingCount в зависимости от размера экрана
//             boundaryCount={1}
//             showFirstButton={!isSmallScreen} // Показываем кнопки только если экран не маленький
//             showLastButton={!isSmallScreen} // Показываем кнопки только если экран не маленький
//         />
//     );
// };
//
// export default CustomPagination;




// const CustomPagination = ({ totalPages, currentPage, onPageChange }) => {
//     const pageRange = 5; // Количество отображаемых страниц
//     const range = [];
//     const [isSmallScreen, setIsSmallScreen] = useState(false);
//
//     useEffect(() => {
//         const handleResize = () => {
//             setIsSmallScreen(window.innerWidth <= 768);
//         };
//
//         // Устанавливаем начальное значение
//         handleResize();
//
//         // Слушаем изменения размера окна
//         window.addEventListener('resize', handleResize);
//
//         // Очищаем слушателя при размонтировании компонента
//         return () => {
//             window.removeEventListener('resize', handleResize);
//         };
//     }, []);
//
//     const createPageRange = () => {
//         let start = Math.max(currentPage - Math.floor(pageRange / 2), 1);
//         let end = Math.min(start + pageRange - 1, totalPages);
//
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
//             siblingCount={isSmallScreen ? 1 : 3} // Уменьшаем siblingCount на маленьком экране
//             boundaryCount={1}
//             hidePrevButton={isSmallScreen} // Скрываем кнопку "Назад" на маленьком экране
//             hideNextButton={isSmallScreen} // Скрываем кнопку "Вперед" на маленьком экране
//         />
//     );
// };
//
// export default CustomPagination;




const CustomPagination = ({ totalPages, currentPage, onPageChange }) => {
    const pageRange = 5; // Количество отображаемых страниц
    const range = [];
    const [isSmallScreen, setIsSmallScreen] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsSmallScreen(window.innerWidth <= 768);
        };

        // Устанавливаем начальное значение
        handleResize();

        // Слушаем изменения размера окна
        window.addEventListener('resize', handleResize);

        // Очищаем слушателя при размонтировании компонента
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const createPageRange = () => {
        let start = Math.max(currentPage - Math.floor(pageRange / 2), 1);
        let end = Math.min(start + pageRange - 1, totalPages);

        if (currentPage <= 2) {
            end = Math.min(pageRange, totalPages);
        }
        if (currentPage >= totalPages - 1) {
            start = Math.max(totalPages - pageRange + 1, 1);
        }

        for (let i = start; i <= end; i++) {
            range.push(i);
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
            siblingCount={isSmallScreen ? 1 : 3} // Уменьшаем siblingCount на маленьком экране
            boundaryCount={1}
            hidePrevButton={isSmallScreen} // Скрываем кнопку "Назад" на маленьком экране
            hideNextButton={isSmallScreen} // Скрываем кнопку "Вперед" на маленьком экране
        />
    );
};

export default CustomPagination;




