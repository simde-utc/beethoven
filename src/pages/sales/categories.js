import React from "react";
import PropTypes from "prop-types";
import { Category } from "../../models";
import { useDispatch, useSelector } from "react-redux";
import { categories as categoriesAPI } from "../../api/state";


const CategoriesManager = ({ categories }) => {
  const { currentCategory } = useSelector(state => ({ currentCategory: categoriesAPI.getCurrentFromState(state)}));
  const dispatch = useDispatch();

  const setCurrentCategory = React.useCallback((id) => dispatch(categoriesAPI.setCurrent(id)), [dispatch]);

  categories = categories.sort((cat1, cat2) => {
    if(cat1.getName() < cat2.getName()) { return -1; }
    if(cat1.getName() > cat2.getName()) { return 1; }
    return 0;
  })
  return (
    <div className="category-list">
        {
          categories.map(category => (
            <div
              className={`categories-item ${ currentCategory && currentCategory.getKey() === category.getKey() ? "focused" : ""}`}
              onClick={ () => setCurrentCategory(category.getKey()) }
              key={ category.getKey() }
              >
              { category.getName() }
            </div>
          ))
        }
    </div>
  )
}

CategoriesManager.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.instanceOf(Category))
}

CategoriesManager.defaultProps = {
  categories: [],
}

export default CategoriesManager;
