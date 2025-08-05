# Room Booking System

## Install And Run
### Frist: Clone the project
```bash
git clone https://github.com/ahmniab/Room-Booking-System.git
```
### Second: Install dependencies
```bash
npm install && npm install -g json-server
```
### Third: Run Room Booking System
1. Run the mock data server
```bash
json-server --watch db.json --port 4000 
```
2. Run React app
```bash
npm start
```
## Test The project
all tests written in tests folder in `ts` 
you can run the tests using 
```bash
npx playwright test  
```