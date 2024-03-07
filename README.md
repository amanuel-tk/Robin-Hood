
# Robin Hood Colne Website

Robinhood is a commission-free trading platform known for its user-friendly interface and fractional share investing. It offers trading in stocks, ETFs, options, and cryptocurrencies, alongside cash management features. Despite popularity, it has faced controversies related to regulatory compliance and handling of user accounts.


## Acknowledgements

 - [Robinhood](https://robinhood.com/)


## Author

- [@amanuel-tk](https://github.com/amanuel-tk)


## Environment Variables

To run this project, you will need to add the following environment variables to your .env file
### iexcloud.io API Token in your server folder .env file
`API_TOKEN=pk_*************************`
### Mongo Db  database url in your server folder .env file
`ATLAS_URI=mongodb+srv://username:password@cluster0.gscmgyv.mongodb.net/`
### iexcloud.io API Token in your client folder .env file
`REACT_APP_API_TOKEN=pk_***************************`





## Features

- Search For stocks
- Create user account
- Buy and Sell Stock 
- Check Profit and loss on total or per stock 
- Live stock previews
- Live stock graph previews and historical data performance
- Cross platform
- Responsive



## Deployment

To deploy this project run the following commands.

#### Step 1. Clone the repository:
```bash
  git clone <repository-url>
```
#### Step 2. Navigate to the server directory:
```bash
  cd server
```
#### Step 3. Install server dependencies:
```bash
  npm install
```
#### Step 4. Navigate to the client directory:
```bash
  cd ../client
```
#### Step 5. Install client dependencies:
```bash
  npm install
```
#### Step 6. Create a .env file in the client folder:
```bash
  REACT_APP_API_TOKEN=pk_***********************
```
#### Step 7. Navigate back to the server directory:
```bash
  git clone <repository-url>
```
#### Step 7. Navigate back to the server directory:
```bash
  cd ..
  cd server
```
#### Step 8. Create a .env file in the server folder:
```bash
  ATLAS_URI=mongodb+srv://username:password@***********************
  API_TOKEN=pk_********************
```
#### Step 9. Run the server and client using concurrently:
```bash
  npm run dev
```




## Screenshots

![App Screenshot](screen shoot/photo_1_2024-03-07_20-26-30.jpg)
![App Screenshot](https://github.com/amanuel-tk/Robin-Hood/blob/main/screen%20shoot/photo_1_2024-03-07_20-26-30.jpg?raw=true)
![App Screenshot](https://via.placeholder.com/468x300?text=App+Screenshot+Here)


## Note

"If you encounter a loading issue where the page gets stuck, it is due to limitations on API requests that iex offer for a free trial. So, Please wait a few moments and try again."

## Tech Stack

**Client:** React, TailwindCSS

**Server:** Node, Express

**Data Base:** Mongo DB

