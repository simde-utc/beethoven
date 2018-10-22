// **************************************************************************
// Gestion des menus
// **************************************************************************
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


//Valider un menu servi
export const VALIDATE_MENU_REQUEST = "VALIDATE_MENU_REQUEST"
export const VALIDATE_MENU_SUCCESS = "VALIDATE_MENU_SUCCESS"
export const VALIDATE_MENU_ERROR = "VALIDATE_MENU_ERROR"


// **************************************************************************
// Gestion Articles et catégories
// **************************************************************************

// Reccuperer les catégories des Articles
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




// **************************************************************************
// Gestion utils
// **************************************************************************

//Gestion des erreur
export const ADD_ERROR = "ADD_ERROR"
export const DELETE_ERROR = "DELETE_ERROR"

//gestion du websocket de la badgeuse
export const BADGEUSE_IS_PRESENT = "WEBSOCKET_IS_PRESENT"
export const GET_USER_UID = "GET_USER_UID"
export const GET_USER_PIN = "GET_USER_PIN"
export const SET_USER_CONNECTED = "SET_USER_CONNECTED"

//connexion par badgeuse
export const LOGIN_BADGE_REQUEST = "LOGIN_BADGE_REQUEST"
export const LOGIN_BADGE_SUCCESS = "LOGIN_BADGE_SUCCESS"
export const LOGIN_BADGE_ERROR = "LOGIN_BADGE_ERROR"


//Connexion par CAS
export const REDIRECT_LOGIN = "REDIRECT_LOGIN"
export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_ERROR = "LOGIN_ERROR";

//deconnexion
export const DISCONNECT = "DISCONNECT"

// **************************************************************************
// Gestion WebTV
// **************************************************************************

//getUrl
export const GET_TVLINK_REQUEST = "GET_TVLINK_REQUEST"
export const GET_TVLINK_SUCCESS = "GET_TVLINK_SUCCESS"
export const GET_TVLINK_ERROR = "GET_TVLINK_ERROR"

//setUrl
export const SET_TVLINK_REQUEST = "SET_TVLINK_REQUEST"
export const SET_TVLINK_SUCCESS = "SET_TVLINK_SUCCESS"
export const SET_TVLINK_ERROR = "SET_TVLINK_ERROR"

//get Messages List for webTV
export const GET_MESSAGES_LIST_REQUEST = "GET_MESSAGES_LIST_REQUEST"
export const GET_MESSAGES_LIST_SUCCESS = "GET_MESSAGES_LIST_SUCCESS"
export const GET_MESSAGES_LIST_ERROR = "GET_MESSAGES_LIST_ERROR"
