import { useState, useCallback, memo } from "react";
import { useHistory } from "react-router-dom";

const AccordionItem = memo(({
                                gender,
                                onGenderClick,
                                selectedGender,
                                categories,
                                onCategoryClick,
                                selectedCategory,
                                types,
                                onTypeClick,
                                isSmallScreen,
                                setShowSidebar,
                            }) => {
    const [isGenderExpanded, setIsGenderExpanded] = useState(false);
    const [isCategoryExpanded, setIsCategoryExpanded] = useState(false);
    const [expandedType, setExpandedType] = useState(null);
    const history = useHistory();

    const handleGenderClick = useCallback(async () => {
        history.push('/catalog');

        // Оптимизация: предотвращаем лишние вызовы если состояние не изменилось
        if (isGenderExpanded && selectedGender === gender) {
            if (selectedGender !== null) {
                await onGenderClick(null);
                setIsGenderExpanded(false);
            }
            return;
        }

        await onGenderClick(gender);
        setIsGenderExpanded(true);

        // Сбрасываем вложенные состояния при смене gender
        setIsCategoryExpanded(false);
        setExpandedType(null);
    }, [gender, selectedGender, isGenderExpanded, onGenderClick, history]);

    const handleCategoryClick = useCallback(async (category) => {
        // Оптимизация: предотвращаем лишние вызовы если состояние не изменилось
        if (isCategoryExpanded && selectedCategory === category) {
            if (selectedCategory !== null) {
                await onCategoryClick(null);
                setIsCategoryExpanded(false);
            }
            return;
        }

        await onCategoryClick(category);
        setIsCategoryExpanded(true);

        // Сбрасываем вложенное состояние type при смене category
        setExpandedType(null);
    }, [selectedCategory, isCategoryExpanded, onCategoryClick]);

    const handleTypeClick = useCallback(async (type) => {
        // Оптимизация: предотвращаем лишние вызовы если состояние не изменилось
        if (expandedType === type) {
            if (expandedType !== null) {
                await onTypeClick(null);
                setExpandedType(null);
            }
            return;
        }

        await onTypeClick(type);
        setExpandedType(type);

        if (isSmallScreen) {
            setShowSidebar(false); // Закрываем сайдбар на мобильных
        }
    }, [expandedType, onTypeClick, isSmallScreen, setShowSidebar]);

    // Оптимизация: мемоизируем рендер категорий
    const renderCategories = useCallback(() => {
        return categories.map((category) => (
            <div key={category}>
                <li
                    className="sbLi-category"
                    onClick={() => handleCategoryClick(category)}
                >
                    {category} <strong>{isCategoryExpanded && selectedCategory === category ? '-' : '+'}</strong>
                </li>
                {isCategoryExpanded && selectedCategory === category && (
                    <div className="nestedContent">
                        {types.map((type) => (
                            <li
                                className={`sbLi sb-li-type ${expandedType === type ? 'selected-type' : ''}`}
                                style={{ marginLeft: "19px" }}
                                key={type}
                                onClick={() => handleTypeClick(type)}
                            >
                                {type}
                            </li>
                        ))}
                    </div>
                )}
            </div>
        ));
    }, [categories, types, isCategoryExpanded, selectedCategory, expandedType, handleCategoryClick, handleTypeClick]);

    return (
        <>
            <li className="sbLi" onClick={handleGenderClick}>
                <strong className="gender-names">{gender}</strong>
                <strong>{isGenderExpanded && selectedGender === gender ? '-' : '+'}</strong>
            </li>
            <div className={`accordionContent ${isGenderExpanded && selectedGender === gender ? 'expanded' : ''}`}>
                {renderCategories()}
            </div>
        </>
    );
});

export default AccordionItem;