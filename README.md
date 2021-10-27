# 125-Ciceksepeti-React-Bootcamp

This project uses the following technologies:

* React
* SCSS (through node-sass package)
* React-Redux
* Redux-Saga
* React-router-dom  
* Axios

Click here for a [live demo](https://125-ciceksepeti-ogunakar-final.vercel.app/).

## How it works:

* All the styling is applied through SCSS. 
* All API calls are made through Axios. 
* Create products and profile pages are private routes for users only.  
* Products, product categories, colors, brands, statuses are saved onto redux storage on load.
* Category navbar uses query params and useLocation to redirect to a particular category with filtered cards.   
* User authorization token is saved into local storage.
* Every time a user visits, check user login saga is called. If a token exists in local storage, it gets saved into redux store. Should any calls on behalf of the user be made, a bearer token is attached automatically.
* If a particular card is clicked, another API call is made with its id to fetch its details for the product-detail page.
* Profile page displays given and received offers, onclick events trigger modal-visible action type and modal gets activated using React portal.
* All async events get passed onto saga middleware and handled in "sagas" generator functions.
* All input checks are handled through UI with useState hooks.
* A big part of responsiveness is achieved through the use of rems and flex.
* Notification delay is managed with setTimeout and clearTimeout.
* Loading state is enabled just before async calls are made. Toggles the loader and displays it using React portal.
