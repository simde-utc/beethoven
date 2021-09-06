import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  salesLocations as salesLocationsAPI,
  categories as categoriesAPI,
  articles as articlesAPI,
} from "../../api/state";
import { insertData, getData } from "../../api/internal";
import { Grid } from "semantic-ui-react";
import CategoriesManager from "./categories";
import ArticlesManager from "./articles";
import PaymentPanel from "./payment";
import { SalesLocationsModal } from "../../components/modals";
import "./css/sales.scss";

const SalesContainer = () => {

  let {
    salesLocations,
    currentSalesLocation ,
    allCategories,
    allArticles,
    currentCategoryID,
    selectedArticles,
  } = useSelector(state => ({
    salesLocations: salesLocationsAPI.getValuesFromState(state),
    currentSalesLocation: salesLocationsAPI.getCurrentFromState(state),
    allCategories: categoriesAPI.getValuesFromState(state),
    currentCategoryID: categoriesAPI.getCurrentIDFromState(state),
    allArticles: articlesAPI.getValuesFromState(state),
    selectedArticles: getData(state, 'selectedArticles') || {},
  }));

  const [articles, setArticles] = React.useState({});
  const [categories, setCategories] = React.useState([]);

  const dispatch = useDispatch();
  const setSelectedArticles = React.useCallback((newArticles) => dispatch(insertData('selectedArticles', newArticles)), [dispatch]);

  /* This effect willl update the categories and articles list to display*/
  React.useEffect(() => {
    if(currentSalesLocation) {
      const currentCategories = currentSalesLocation.getCategories();
      const listCategories = allCategories.filter(category => currentCategories.includes(category.getKey()))
      setCategories(listCategories);

      const listArticles = allArticles.filter(article => currentCategories.includes(article.getCategoryID()))
      const indexArticles = listArticles.reduce((index, article) => {
        const acID = article.getCategoryID();

        if(index[acID] && index[acID].length) {
          index[acID].push(article);
          return index;
        }
        index[acID] = [article];
        return index;
      }, {});

      setArticles(indexArticles);
    }
  }, [allCategories, currentSalesLocation ]);

  const handleSelection = React.useCallback((article) => setSelectedArticles({
    ...selectedArticles,
    [article.getKey()]: {
      article,
      qte: selectedArticles[article.getKey()] ? selectedArticles[article.getKey()].qte + 1 : 1
    }
  }), [selectedArticles, setSelectedArticles]);

  return (
    <div className="sales-container">
      <Grid columns="equal">
        <Grid.Column width={3}>
          <CategoriesManager categories={categories}/>
        </Grid.Column>
        <Grid.Column width={8}>
          <ArticlesManager
            articles={ currentCategoryID ? articles[currentCategoryID]:  []}
            onClick={ (article) => handleSelection(article) }
            />
        </Grid.Column>
        <Grid.Column width={5}>
          <PaymentPanel/>
        </Grid.Column>
      </Grid>

      <SalesLocationsModal open={Boolean(salesLocations.length && !currentSalesLocation)} locations={ salesLocations }/>
    </div>
  )
}

export default SalesContainer;
