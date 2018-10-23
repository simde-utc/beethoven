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
  GET_TOSERVE_ERROR,
  GET_TOSERVE_SUCCESS,
  GET_TOSERVE_REQUEST,
  VALIDATE_MENU_ERROR,
  VALIDATE_MENU_REQUEST,
  VALIDATE_MENU_SUCCESS,
  ADD_ERROR,
  DELETE_ERROR,
  REDIRECT_LOGIN,
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
  DELETE_ALL_ARTICLES,
  BADGEUSE_IS_PRESENT,
  SET_USER_CONNECTED,
  GET_USER_PIN,
  GET_USER_UID,
  LOGIN_BADGE_REQUEST,
  LOGIN_BADGE_SUCCESS,
  LOGIN_BADGE_ERROR,
  DISCONNECT,
  GET_TVLINK_ERROR,
  GET_TVLINK_REQUEST,
  GET_TVLINK_SUCCESS,
  SET_TVLINK_ERROR,
  SET_TVLINK_REQUEST,
  SET_TVLINK_SUCCESS,
  GET_MESSAGES_LIST_ERROR,
  GET_MESSAGES_LIST_REQUEST,
  GET_MESSAGES_LIST_SUCCESS
} from "../constants"

import {
  fetchMenus,
  onTrashClick,
  fetchMenuList,
  fetchServed,
  loginBadge2,
  loginCas,
  getCategories,
  getArticles,
  getTvUrl,
  setTvUrl,
  fetchToServe
} from '../Utils/apiCalls.js'


// **************************************************************************
// Gestion Menus
// **************************************************************************

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

export function getMenusError(error)
{
  return{
    type : GET_MENUS_ERROR,
    error : error,
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
        dispatch(getMenusError("Erreur : Liste de Menu"))
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

export function deleteMenuError(error){
  return{
    type : DELETE_MENU_ERROR,
    error : error
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
      dispatch(deleteMenuError("Erreur : Supression Menu"))
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

export function getListError(error){
  return{
    type: GET_LIST_ERROR,
    error : error
  }
}

export function getList(idMenu){
  return (dispatch)=>{

    dispatch(getListRequest(idMenu));
    if(idMenu!==null){
      fetchMenuList(
        idMenu,
        (data)=>{
          dispatch(getListSuccess(data))
        },
        (err)=>{
          dispatch(getListError("Erreur : Liste Servis"))
        })
    }
  }
}



//reccupérer l'ensemble des commandes d'un menu donné
export function getToServeRequest(){
  return{
    type: GET_TOSERVE_REQUEST,
  }
}

export function getToServeSuccess(listToServe){
  return{
    type: GET_TOSERVE_SUCCESS,
    listToServe: listToServe
  }
}

export function getToServeError(error){
  return{
    type: GET_TOSERVE_ERROR,
    error : error
  }
}


export function getToServe(){
  return (dispatch)=>
  {
    dispatch(getToServeRequest());
    fetchToServe(
      (data)=>{
        dispatch(getToServeSuccess(data))
      },
      (err)=>{
        dispatch(getToServeError("Erreur : menus web TV"))
      }
    )
  }
}



//valider menu servi
export function validateMenuRequest(idMenu, listSales){
  return{
    type: VALIDATE_MENU_REQUEST,
    idMenu : idMenu
  }
}

export function validateMenuSuccess(idMenu, listSales){
  return{
    type: VALIDATE_MENU_SUCCESS,
    idMenu : idMenu,
    listSales : listSales
  }
}

export function validateMenuError(error){
  return{
    type: VALIDATE_MENU_ERROR,
    error : error
  }
}

export function validateMenu(idMenu, listSales){
  return (dispatch) =>{
    dispatch(validateMenuRequest(idMenu));
    fetchServed(
      idMenu,
      (data)=> {
        dispatch(validateMenuSuccess(idMenu, listSales))
      },
      (err)=>{
        dispatch(validateMenuError("Erreur : Validation Menu"))
      }
    )
  }
}


//Gestion des erreurs
export function addError(information){
  return{
    type : ADD_ERROR,
    information : information
  }
}

export function deleteError(){
  return{
    type : DELETE_ERROR,
  }
}


// **************************************************************************
// Gestion Vente
// **************************************************************************


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

// **************************************************************************
// Gestion Connexion
// **************************************************************************




//gestion du websocket de badgeuse
export function badgeuseIsPresent(badgeuse){
  return{
    type: BADGEUSE_IS_PRESENT,
    badgeuse : badgeuse
  }
}

//rendre l'utilisateur actuel connecté
//faire passer son login en parametre
// TODO: autre choses à mettre?
export function setUserConnected(){
  return{
    type: SET_USER_CONNECTED
  }
}
// reccupération de l'uid du user
export function getUserUid(userUid){
  return{
    type: GET_USER_UID,
    userUid : userUid
  }
}

//reccupération du pin du user
export function getUserPin(userPin){
  return{
    type: GET_USER_PIN,
    userPin : userPin
  }
}


//requete de connexion par badge
export function loginBadgeRequest(userUid, userPin){
  return{
    type: LOGIN_BADGE_REQUEST,
    userUid : userUid,
    userPin : userPin
  }
}

export function loginBadgeSuccess(sessionId)
{
  return{
    type: LOGIN_BADGE_SUCCESS,
    sessionId : sessionId
  }
}

export function loginBadgeError(error)
{
  return{
    type : LOGIN_BADGE_ERROR,
    error : error
  }
}

export function loginBadge(userUid, userPin)
{
  return (dispatch) =>{
    dispatch(loginBadgeRequest(userUid, userPin));
    loginBadge2(
      userUid,
      userPin,
      (data)=> {
        dispatch(loginBadgeSuccess(data))
      },
      (err)=>{

        console.log(err)
        dispatch(loginBadgeError('Erreur : Connexion échouée'))
      }
    )
  }
}

//COnnection au CAS
export function redirectLogin(){
  return{
    type : REDIRECT_LOGIN,
  }
}
export function loginRequest()
{
    return {
        type : LOGIN_REQUEST
    }
}

export function loginSuccess(data)
{
    return {
        type : LOGIN_SUCCESS,
        sessionId: data.sessionid,
        username : data.username
    }
}

export function loginError(error)
{
    return {
        type : LOGIN_ERROR,
        error : error

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
            dispatch(loginError('Erreur :Connexion CAS'))
          }
        )
    }
}

export function disconnect()
{
  return{
    type : DISCONNECT
  }
}


// **************************************************************************
// Gestion WebTV
// **************************************************************************


export function getTvLinkRequest()
{
  return{
    type : GET_TVLINK_REQUEST
  }
}

export function getTvLinkSuccess(data)
{
  return{
    type : GET_TVLINK_SUCCESS,
    data : data
  }
}

export function getTvLinkError(error)
{
  return{
    type : GET_TVLINK_ERROR,
    error : error
  }
}

export function getTvLink(idTv)
{
  return (dispatch)=>{
    dispatch(getTvLinkRequest());
    getTvUrl(idTv,
      (data)=>{
        dispatch(getTvLinkSuccess(data))
      },
      (err)=>{
        dispatch(getTvLinkError('Erreur : Reccupération du lien WebTV'))
      }
    )
  }
}






export function setTvLinkRequest()
{
  return{
    type : SET_TVLINK_REQUEST
  }
}

export function setTvLinkSuccess(tvLink)
{
  return{
    type : SET_TVLINK_SUCCESS,
    tvLink : tvLink
  }
}

export function setTvLinkError(error)
{
  return{
    type : SET_TVLINK_ERROR,
    error : error
  }
}

export function setTvLink(idTv)
{
  return (dispatch)=>{
    dispatch(setTvLinkRequest());
    setTvUrl(idTv,
      (data)=>{
        dispatch(getTvLinkSuccess(idTv))
      },
      (err)=>{
        dispatch(getTvLinkError('Erreur : Reccupération du lien WebTV'))
      }
    )
  }
}
