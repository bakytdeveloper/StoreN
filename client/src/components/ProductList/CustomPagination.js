import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import React, {useEffect, useState} from "react";

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




