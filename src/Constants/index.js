//Liste des Menus disponibles
export const GET_MENUS_REQUEST = "GET_MENUS_REQUEST";
export const GET_MENUS_SUCCESS = "GET_MENUS_SUCCESS";
export const GET_MENUS_ERROR = "GET_MENUS_ERROR";


//supprimer un menu de la Liste
export const DELETE_MENU_REQUEST = "DELETE_MENU_REQUEST"
export const DELETE_MENU_SUCCESS = "DELETE_MENU_SUCCESS"
export const DELETE_MENU_ERROR = "DELETE_MENU_ERROR"


//changer l'index du menu selectionné
export const UPDATE_NAVINDEX = "UPDATE_NAVINDEX"


//reccupérer l'ensemble des commandes d'un menu donné
export const GET_LIST_REQUEST = "GET_LIST_REQUEST"
export const GET_LIST_SUCCESS = "GET_LIST_SUCCESS"
export const GET_LIST_ERROR = "GET_LIST_ERROR"

//Connection au CAS
export const GOTO_LOGIN = "GOTO_LOGIN"
export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_ERROR = "LOGIN_ERROR";

// Recuuperer les catégories des Articles
export const GET_CATEGORIES_REQUEST = "GET_CATEGORIES_REQUEST"
export const GET_CATEGORIES_SUCCESS = "GET_CATEGORIES_SUCCESS"
export const GET_CATEGORIES_ERROR = "GET_CATEGORIES_ERROR"

//changer l'id de la catégorie selectionnée
export const UPDATE_CATEGORIE = "UPDATE_CATEGORIE"

//récuperer l'article selectionnée
export const GET_CHOSEN_ARTICLE = "GET_CHOSEN_ARTICLE"

//récuperer l'ensemble des articles
export const GET_ARTICLES_REQUEST = "GET_ARTICLES_REQUEST"
export const GET_ARTICLES_SUCCESS = "GET_ARTICLES_SUCCESS"
export const GET_ARTICLES_ERROR = "GET_ARTICLES_ERROR"

//Delete article in panier
export const DELETE_ARTICLE = "DELETE_ARTICLE"
export const DELETE_ALL_ARTICLES = "DELETE_ALL_ARTICLES"