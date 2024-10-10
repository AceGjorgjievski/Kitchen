### Full stack Kitchen Web App
<hr>

#### About
<hr>
Kitchen is full stack web application for ordering different types
of meals based on their categories. The interactivity is simple,
viewing all the meals, filtering by the category, adding to shopping cart,
making orders.

#### Technologies
<hr>

- The meals at the beginning are being fetched from [TheMealDB API](https://www.themealdb.com/api.php)
- Frontend framework: **Next.js**
- Backend framework: **Nest js**
- Authentication & JWTs: **Firebase Auth**
- Database: **Cloud Firestore Database**


#### Installation - Docker
<hr>

1. Clone this repository: ``git clone https://github.com/AceGjorgjievski/Kitchen.git``
2. Open the folder with your IDE.
3. Open docker desktop
4. Navigate to the backend folder and create ``.env`` file as specified in the 
  ``.env_backend_sample.txt`` file
5. Navigate to the frontend folder and create ``.env`` file as specified in the
   ``.env_frontend_sample.txt`` file
6. If you have completed the steps above, open terminal and navigate to the root folder``cd: Kitchen``
7. Write: ``docker-compose up --build``
8. In your browser, open [localhost:3000](http://localhost:3000) and test the app.

#### Pictures

1. Home page:
   ![](./frontend/public/images/img_1_home_page.png)
2. Main menu with categories:
   ![](./frontend/public/images/img_2_main_menu_filter.png)
3. Viewing the meal:
   ![](./frontend/public/images/img_3_meal_details.png)
4. Viewing the shopping cart:
   ![](./frontend/public/images/img_4_shopping_cart.png)
5. Order page for admin user:
   ![](./frontend/public/images/img_5_order_admin.png)
6. Order page for normal user:
   ![](./frontend/public/images/img_6_order_user.png)

