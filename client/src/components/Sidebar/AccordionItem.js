
import { useState } from "react";
import {useHistory} from "react-router-dom";


const AccordionItem = ({
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
                           setSearchTerm
                       }) => {
    const [isGenderExpanded, setIsGenderExpanded] = useState(false);
    const [isCategoryExpanded, setIsCategoryExpanded] = useState(false);
    const [expandedType, setExpandedType] = useState(null);
    const history = useHistory();

    const handleGenderClick = async () => {
        history.push('/catalog')
        if (isGenderExpanded && selectedGender === gender) {
            onGenderClick(null); // Reset selected gender
            setIsGenderExpanded(false);



        } else {

            await onGenderClick(gender);
            setIsGenderExpanded(true);
        }
    };

    const handleCategoryClick = async (category) => {
        if (isCategoryExpanded && selectedCategory === category) {
            onCategoryClick(null); // Reset selected category
            setIsCategoryExpanded(false);


        } else {
            await onCategoryClick(category);
            setIsCategoryExpanded(true);
        }
    };

    const handleTypeClick = async (type) => {
        if (expandedType === type) {
            onTypeClick(null); // Reset selected type
            setExpandedType(null);
        } else {
            await onTypeClick(type);
            setExpandedType(type);
            if (isSmallScreen) {
                setShowSidebar(true); // Close sidebar on small screens
            }
        }
    };

    return (
        <>
            <li className="sbLi" onClick={handleGenderClick}>
                <strong className="gender-names">{gender}</strong> <strong>{isGenderExpanded && selectedGender === gender ? '-' : '+'}</strong>
            </li>
            <div className={`accordionContent ${isGenderExpanded && selectedGender === gender ? 'expanded' : ''}`}>
                {categories.map((category) => (
                    <div key={category}>
                        <li className="sbLi-category" onClick={() => handleCategoryClick(category)}>
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
                ))}
            </div>
        </>
    );
};

export default AccordionItem;