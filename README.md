# battleship

Steps to setup:

1. Git clone repository: git clone https://github.com/subhosuper/battleship.git
2. Enter the project folder: cd battleship
3. Run docker-compose file in detach mode: docker-compose up -d
4. Use tools like Postman to use the APIs.
5. Under the project folder inside "public" folder, open "status.html" file in a browser, you might have to use a CORS Unblocker.
6. Enter a session id in the input box and click "Show Board" anytime to view the board.
7. Get session id after a successful POST request to `/api/v1/new-game`


Request structure of APIs:
1. http://localhost:3000/api/v1/new-game - **POST**
   
   - headers: none
   - body: none

2. http://localhost:3000/api/v1/place-ship - **POST**

   - headers: `{sessionid: value}` <br />
     Get the value of session id from output of API 1
   
   - body:

       > type: type of ship <br />
       > coordinates: Starting point of the ship - [X coordinate, Y coordinate] <br />
       > direction: In which direction shall the ship be placed on the board - horizontal or vertical <br />

   e.g.: `{
            "type": "submarine", 
            "coordinates": [9,10],
            "direction": "horizontal"
        }`
3. http://localhost:3000/api/v1/attack - **POST**
  
   - headers: `{sessionid: value}` <br />
     Get the value of session id from output of API 1

   - body:

       > attackCoordinates: Coordinates of the point to be attacked - [X coordinate, Y coordinate] <br />

   e.g.: `{
            "attackCoordinates": [1,1]
         }`

4. http://localhost:3000/api/v1/status - **GET**
  
   headers: `{sessionid: value}` <br />
   Get the value of session id from output of API 1

   
