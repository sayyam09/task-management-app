Task Management Application - 

This project of task management application is built with technology stack as given below:
1) Frontend - Reactjs, Tailwindcss, React-icons
2) Backend - FastAPI, MySQL
this application allows users to create, read, update, and delete tasks.

====================================================================================================================
#Backend Setup (FastAPI)-
    1) Prerequisites:
        Python 3.8 or later
        MySQL
        pip (Python package installer)
        Vercel account (for deployment)

    [OPTIONAL]
    2)Set up the database connection and database URL: 

       [IMP Note- Create a database named "task_management" in MySQL and create a user with username "root".
                  After creating an database create the table named "tasks" with required fields/column names.]
       
       (Note - If you want to start directly u can start (using my account and using my URL) but suppose if you want to setup the MySQL db using your account then you need to setup this things and need to change the Database URL as well in some of backend files)

       SO, if you want to setup using your account then you can use below instrcutions -
            
        firstly, go to you MySQL and after setting up your account like username, password then follow below steps:
            
            The Schema/query for creating the database and table as follows: 
                a) Create the database using query - CREATE DATABASE task_management;

                b) Create table in this database - 
                        USE task_management;

                        CREATE TABLE tasks (
                            id INT AUTO_INCREMENT PRIMARY KEY,
                            title VARCHAR(255) NULL,
                            description VARCHAR(255) NULL,
                            status VARCHAR(45) DEFAULT NULL,
                            created_at DATETIME DEFAULT NULL,
                        );
                
            Now, You need to pass the database URL in some of the files :

            a) Initialize Alembic for database migrations:
                command - alembic init alembic 
                
                (This step might be unnecessary if the project repository already includes these configurations, but if errors arise, you can perform this step.)

            b) Update 'app/database.py' : 
                In backend folder, open the file "app/database.py" and change the database URL to your credentials: 
                
                DATABASE_URL=mysql+pymysql://username:password@localhost/dbname   

            c) (Update alembic.ini) In backend folder, open the file/Configure 'alembic.ini':
            
                sqlalchemy.url = mysql+pymysql://username:password@localhost/dbname

                --> DATABASE_URL=mysql+pymysql://username:password@localhost/dbname  <--
                here, you need to pass your 
                username, password, @locahost:3306 and your db name i.e. 'task_management'.

            d) (Update 'alembic/env.py') Configure alembic/env.py to use your models: 
                from app.database import Base
                target_metadata = Base.metadata

            e) Create and apply the initial migration:
                alembic revision --autogenerate -m "Initial migration"
                alembic upgrade head

        [ You don't need to follow step 2) if you are going to use my database URL.]


    3) Installation:
        a) Clone the repository:
            git clone https://github.com/sayyam09/task-management-app.git
            cd task_management_app/backend

        [OPTIONAL - My repo/project already contains the venv setup if the folder "venv" doesn't present then you can follow this step to set it up.]  

        b) Create a virtual environment and activate it:
            python -m venv venv
            On Windows: venv\Scripts\activate

        c) Install the dependencies:
           pip install -r requirements.txt - install all the necessary backages using this command.

    4) Running the Application:
        a) Apply the database migrations:
           command - alembic upgrade head

        b) Start the FastAPI server:
            command - uvicorn app.main:app --reload

            The backend API will be available at http://localhost:8000.   
            To check the working of API's use http://localhost:8000/docs.

====================================================================================================================

#Frontend Setup (React) - 

    1) Prerequisites:
        Node.js (v14 or later)
        npm (Node package manager)
        Vercel account (for deployment)

    2) Installation:
       a) Navigate to the frontend directory: cd task_management_app/frontend
       b) Install the dependencies: 
          npm install
          npm install -D tailwindcss (if module not found)
          npx tailwindcss init (if module not found)
          npm install react-icons (if module not found)

    3) Running the Application: npm start
       The frontend application will be available at http://localhost:3000.

==================================================================================================================

#ASSUMPTIONS - 

    The only one assumption i made while designing the app is:
    a) Initially whenever the new task is created it status will be "To do" by default user don't need to select it while creating an new task.

    b) Now, suppose if the user change the task status from "To do" -> "In Progress" then in "change status" button drop down will only show the "Done" option to change the status. 

    c) If you user change status to "Done" then user will not be able to change the status again because that task is already done.