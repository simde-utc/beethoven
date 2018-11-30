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


//reccupérer lles 10 prochains menus pour la TV
export const GET_TOSERVE_REQUEST = "GET_TOSERVE_REQUEST"
export const GET_TOSERVE_SUCCESS = "GET_TOSERVE_SUCCESS"
export const GET_TOSERVE_ERROR = "GET_TOSERVE_ERROR"

//Valider un menu servi
export const VALIDATE_MENU_REQUEST = "VALIDATE_MENU_REQUEST"
export const VALIDATE_MENU_SUCCESS = "VALIDATE_MENU_SUCCESS"
export const VALIDATE_MENU_ERROR = "VALIDATE_MENU_ERROR"


//Remiser les menus des permananciers
export const SET_STAFF_REQUEST = "SET_STAFF_REQUEST"
export const SET_STAFF_SUCCESS = "SET_STAFF_SUCCESS"
export const SET_STAFF_ERROR = "SET_STAFF_ERROR"


// **************************************************************************
// Gestion Articles et catégories
// **************************************************************************
//Récupérer l'events choisi
export const GET_EVENT_ARTICLES = "GET_EVENT_ARTICLES"

//Récupérer les location des ventes pour une fondation
export const GET_SALES_LOCATION_REQUEST = "GET_SALES_LOCATION_REQUEST"
export const GET_SALES_LOCATION_SUCCESS = "GET_SALES_LOCATION_SUCCESS"
export const GET_SALES_LOCATION_ERROR = "GET_SALES_LOCATION_ERROR"


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
export const ADD_ALERT = "ADD_ALERT"
export const DELETE_ERROR = "DELETE_ERROR"

//Gestion des Alertes
export const DELETE_ALERT = "DELETE_ALERT"


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

//deconnexion - reinitialise toutes les variables de connexion
export const DISCONNECT = "DISCONNECT"
//Restart applicatio
export const RESTART = "RESTART"


//reccupération des droits utilisateurs de la fondation
export const GET_RIGHTS_REQUEST = "GET_RIGHTS_REQUEST"
export const GET_RIGHTS_SUCCESS = "GET_RIGHTS_SUCCESS"
export const GET_RIGHTS_ERROR = "GET_RIGHTS_ERROR"

// **************************************************************************
// Gestion User
// **************************************************************************
//achat du panier
export const SET_TRANSACTION_SUCCESS = "SET_TRANSACTION_SUCCESS"
export const SET_TRANSACTION_REQUEST = "SET_TRANSACTION_REQUEST"
export const SET_TRANSACTION_ERROR = "SET_TRANSACTION_ERROR"
export const SET_TRANSACTION_STATE = "SET_TRANSACTION_STATE"

//recupere info client
export const GET_CLIENT_UID = "GET_CLIENT_UID"
export const GET_CLIENT_INFO_REQUEST = "GET_CLIENT_INFO_REQUEST"
export const GET_CLIENT_INFO_SUCCESS = "GET_CLIENT_INFO_SUCCESS"
export const GET_CLIENT_INFO_ERROR = "GET_CLIENT_INFO_ERROR"
export const SET_CLIENT_STATE = "SET_CLIENT_STATE"

//annuler un achat
export const CANCEL_ARTICLE_REQUEST = "CANCEL_ARTICLE_REQUEST"
export const CANCEL_ARTICLE_SUCCESS = "CANCEL_ARTICLE_SUCCESS"
export const CANCEL_ARTICLE_ERROR = "CANCEL_ARTICLE_ERROR"
export const DELETE_ARTICLE_CANCELED = "DELETE_ARTICLE_CANCELED"



// **************************************************************************
// TV Management
// **************************************************************************

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

//Ajouter un Message à la liste
export const ADD_MESSAGE_REQUEST = "ADD_MESSAGE_REQUEST"
export const ADD_MESSAGE_SUCCESS = "ADD_MESSAGE_SUCCESS"
export const ADD_MESSAGE_ERROR = "ADD_MESSAGE_ERROR"

//supprimer Un message de la liste
export const DELETE_MESSAGE_REQUEST = "DELETE_MESSAGE_REQUEST"
export const DELETE_MESSAGE_SUCCESS = "DELETE_MESSAGE_SUCCESS"
export const DELETE_MESSAGE_ERROR = "DELETE_MESSAGE_ERROR"


//Gestion des urls par defaut
export const GET_DEFAULT_URL_REQUEST = "GET_DEFAULT_URL_REQUEST"
export const GET_DEFAULT_URL_SUCCESS = "GET_DEFAULT_URL_SUCCESS"
export const GET_DEFAULT_URL_ERROR = "GET_DEFAULT_URL_ERROR"


// **************************************************************************
// Admin Management
// **************************************************************************

export const UPDATE_ADMIN_NAV = "UPDATE_ADMIN_NAV"

//Changer le Panel Active
export const CHANGE_PANEL = "CHANGE_PANEL"

//reccupération des gagnants goodies
export const GET_GOODIES_REQUEST = "GET_GOODIES_REQUEST"
export const GET_GOODIES_SUCCESS = "GET_GOODIES_SUCCESS"
export const GET_GOODIES_ERROR = "GET_GOODIES_ERROR"


//reccupération des informations ginger
export const GINGER_REQUEST = "GINGER_REQUEST"
export const GINGER_SUCCESS = "GINGER_SUCCESS"
export const GINGER_ERROR = "GINGER_ERROR"
