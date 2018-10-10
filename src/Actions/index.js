import {
  GET_MENUS_REQUEST,
  GET_MENUS_ERROR,
  GET_MENUS_SUCCESS,
  DELETE_MENU_ERROR,
  DELETE_MENU_REQUEST,
  DELETE_MENU_SUCCESS,
  UPDATE_NAVINDEX,
  GET_LIST_ERROR,
  GET_LIST_SUCCESS,
  GET_LIST_REQUEST,
  GOTO_LOGIN,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  GET_CATEGORIES_REQUEST,
  GET_CATEGORIES_SUCCESS,
  GET_CATEGORIES_ERROR,
  UPDATE_CATEGORIE,
  GET_CHOSEN_ARTICLE,
  GET_ARTICLES_REQUEST,
  GET_ARTICLES_SUCCESS,
  GET_ARTICLES_ERROR,
  DELETE_ARTICLE,
  DELETE_ALL_ARTICLES
} from "../Constants"

import {fetchMenus, onTrashClick, fetchMenuList, loginCas, getCategories, getArticles} from '../Utils/apiCalls.js'



//COnnection au CAS
export function redirectLogin(redirected){
  return{
    type : GOTO_LOGIN,
    redirected : redirected
  }
}
export function loginRequest()
{
    return {
        type : LOGIN_REQUEST
    }
}

export function loginSuccess(sessionid)
{
    return {
        type : LOGIN_SUCCESS,
        sessionid: sessionid
    }
}

export function loginError()
{
    return {
        type : LOGIN_ERROR
    }
}

export function login()
{
    return (dispatch) =>
    {
        dispatch(loginRequest());
        loginCas(
          (data)=>{
            dispatch(loginSuccess(data))
          },
          (err)=>{
            dispatch(loginError())
          }
        )
    }
}



//Reccupération de la liste de Menus
export function getMenusRequest()
{
  return{
    type : GET_MENUS_REQUEST
  }
}

export function getMenusSuccess(listMenus)
{
  return{
    type : GET_MENUS_SUCCESS,
    listMenus : listMenus
  }
}

export function getMenusError()
{
  return{
    type : GET_MENUS_ERROR
  }
}


export function getMenus(){
  return (dispatch)=>
  {
    dispatch(getMenusRequest());
    fetchMenus(
      (data)=>{
        dispatch(getMenusSuccess(data))
      },
      (err)=>{
        dispatch(getMenusError())
      }
    )
  }
}


// Supprimer un Menu de la Liste
export function deleteMenuRequest(idMenu){
  return{
    type : DELETE_MENU_REQUEST,
    idMenu : idMenu
  }
}

export function deleteMenuSuccess(){
  return{
    type : DELETE_MENU_SUCCESS
  }
}

export function deleteMenuError(){
  return{
    type : DELETE_MENU_ERROR
  }
}

export function deleteMenus(idMenu){
  return (dispatch)=>
  {
    dispatch(deleteMenuRequest(idMenu));
    onTrashClick(idMenu,
    (data)=>{
      dispatch(deleteMenuSuccess())
    },
    (err)=>{
      dispatch(deleteMenuError())
    })
  }
}


//Mise à jour du menu sélectionné
export function updateNavIndex(index){
  return{
    type : UPDATE_NAVINDEX,
    index : index
  }
}


//reccupérer l'ensemble des commandes d'un menu donné
export function getListRequest(idMenu){
  return{
    type: GET_LIST_REQUEST,
    idMenu: idMenu
  }
}

export function getListSuccess(listSales){
  return{
    type: GET_LIST_SUCCESS,
    listSales: listSales
  }
}

export function getListError(){
  return{
    type: GET_LIST_ERROR
  }
}

export function getList(idMenu){
  return (dispatch)=>{
    dispatch(getListRequest(idMenu));
    fetchMenuList(
      idMenu,
      (data)=>{
        dispatch(getListSuccess(data))
      },
      (err)=>{
        dispatch(getListError())
      })
  }
}

//Récupérer les catégories
export function getCategoriesRequest(sessionid){
  return{
    type: GET_CATEGORIES_REQUEST,
    sessionid: sessionid
  }
}

export function getCategoriesSuccess(listCateg){
  return{
    type: GET_CATEGORIES_SUCCESS,
    listCateg: listCateg
  }
}

export function getCategoriesError(){
  return{
    type: GET_CATEGORIES_ERROR,
  }
}

export function getListCateg(sessionid){
  return (dispatch)=>{
    dispatch(getCategoriesRequest(sessionid));
    getCategories(
      sessionid,
      (data)=>{
        dispatch(getCategoriesSuccess(data))
      },
      (err)=>{
        dispatch(getCategoriesError())
      })
  }
}

//Mise a jour de la catégorie selectionnée
export function updateCategorie(id_Categ){
  return{
    type : UPDATE_CATEGORIE,
    id_Categ : id_Categ
  }
}

//Récupérer l'article selectionné
export function getChosenArticle(newID,newNAME,newPRICE,selectedArticles){
  return{
    type : GET_CHOSEN_ARTICLE,
    newID : newID,
    newNAME : newNAME,
    newPRICE : newPRICE,
    selectedArticles : selectedArticles
  }
}

//Récupérer l'ensemble des Articles
export function getArticlesRequest(sessionid){
  return{
    type: GET_ARTICLES_REQUEST,
    sessionid: sessionid
  }
}

export function getArticlesSuccess(listArticles){
  return{
    type: GET_ARTICLES_SUCCESS,
    listArticles: listArticles
  }
}

export function getArticlesError(){
  return{
    type: GET_ARTICLES_ERROR
  }
}

export function getListArticles(sessionid){
  return (dispatch)=>{
    dispatch(getArticlesRequest(sessionid));
    getArticles(
      sessionid,
      (data)=>{
        dispatch(getArticlesSuccess(data))
      },
      (err)=>{
        dispatch(getArticlesError())
      })
  }
}

//Delete un article du panier
export function deleteArticle(newID,selectedArticles){
  return{
    type : DELETE_ARTICLE,
    newID : newID,
    selectedArticles : selectedArticles
  }
}
export function deleteAllArticles(selectedArticles){
  return{
    type : DELETE_ALL_ARTICLES,
    selectedArticles : selectedArticles
  }
}
