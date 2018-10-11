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
