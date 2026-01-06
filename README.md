# Longest Common Substring (LCS) Algorithm - React + Node.js Application

A full-stack web application that implements the Longest Common Substring algorithm using React for the frontend and Node.js/Express for the backend.

## 🌟 Features

- **Find Longest Common Substring**: Efficiently finds the longest common substring between two input strings
- **Visual Results**: Highlights the found substring in both original strings with positions
- **All Common Substrings**: Bonus feature to find and display all common substrings
- **Algorithm Explanation**: Built-in documentation explaining the dynamic programming approach
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Modern UI**: Beautiful gradient design with smooth animations

## 🏗️ Project Structure

```
LCS_API/
├── backend/
│   ├── package.json
│   ├── server.js           # Express server with API endpoints
│   └── lcs.js             # LCS algorithm implementation
├── frontend/
│   ├── package.json
│   ├── public/
│   │   └── index.html
│   └── src/
│       ├── App.js          # Main React component
│       ├── App.css         # Application styles
│       ├── index.js        # React entry point
│       └── index.css       # Base styles
└── README.md
```

## 🚀 Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm (comes with Node.js)

### Installation

1. **Install Backend Dependencies**
   ```bash
   cd backend
   npm install
   ```

2. **Install Frontend Dependencies**
   ```bash
   cd frontend
   npm install
   ```

### Running the Application

1. **Start the Backend Server**
   ```bash
   cd backend
   npm start
   ```
   The server will run on `http://localhost:5000`

2. **Start the Frontend Application** (in a new terminal)
   ```bash
   cd frontend
   npm start
   ```
   The application will open in your browser at `http://localhost:3000`

## 🚀 Deployment to Render

### Option 1: Deploy Backend Only (with built frontend)

The application is configured to serve the React frontend from the Express backend. This is the recommended approach for Render deployment.

#### Steps:

1. **Create a GitHub repository** and push your code:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/yourusername/lcs-api.git
   git push -u origin main
   ```

2. **Build the frontend** (done automatically by Render, but you can test locally):
   ```bash
   cd frontend
   npm install
   npm run build
   ```

3. **Deploy to Render**:
   - Go to [Render Dashboard](https://dashboard.render.com)
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Configure the service:
     - **Name**: `lcs-api`
     - **Root Directory**: `backend`
     - **Build Command**: `cd ../frontend && npm install && npm run build && cd ../backend && mkdir -p build && cp -r ../frontend/build/* ./build/ && npm install`
     - **Start Command**: `node server.js`
     - **Environment**: `Node`
   - Click "Create Web Service"

4. **Your app will be available at**: `https://lcs-api-xxxx.onrender.com`

### Option 2: Deploy Backend and Frontend Separately

If you prefer separate deployments:

#### Backend (Render Web Service):
- **Root Directory**: `backend`
- **Build Command**: `npm install`
- **Start Command**: `node server.js`

#### Frontend (Render Static Site):
- **Build Command**: `cd frontend && npm install && npm run build`
- **Static Directory**: `frontend/build`
- **Publish Directory**: `frontend/build`

Note: Update `frontend/src/App.js` to point to your backend URL when deployed separately.

## 📡 API Endpoints

### POST /api/lcs
Find the longest common substring between two strings.

**Request Body:**
```json
{
  "str1": "string1",
  "str2": "string2"
}
```

**Response:**
```json
{
  "success": true,
  "result": {
    "lcs": "common substring",
    "length": 6,
    "position1": 0,
    "position2": 5
  }
}
```

### POST /api/all-substrings
Find all common substrings between two strings.

**Request Body:**
```json
{
  "str1": "string1",
  "str2": "string2",
  "minLength": 1
}
```

**Response:**
```json
{
  "success": true,
  "result": ["substring1", "substring2", "..."]
}
```

### GET /api/health
Health check endpoint.

**Response:**
```json
{
  "status": "ok",
  "message": "LCS API is running"
}
```

## 🔧 Algorithm Details

### Approach: Dynamic Programming

The algorithm uses a dynamic programming approach with O(m × n) time complexity:

1. Create a DP table where `dp[i][j]` represents the length of LCS of substrings ending at position `i-1` and `j-1`
2. Iterate through both strings character by character
3. If characters match, extend the previous common substring length
4. Track the maximum length and its position
5. Extract the actual substring from the original string

### Complexity Analysis

- **Time Complexity**: O(m × n) where m and n are the lengths of the two input strings
- **Space Complexity**: O(min(m, n)) optimized for the smaller dimension

## 💡 Usage Examples

### Example 1: Basic Usage
```
Input: "abcdefg" and "xyzabcd"
Output: LCS = "abcd" (length: 4)
```

### Example 2: No Common Substring
```
Input: "hello" and "world"
Output: LCS = "" (length: 0)
```

### Example 3: Multiple Common Substrings
```
Input: "ababc" and "abcab"
Output: LCS = "ab" (multiple substrings of same length)
```

## 🎨 UI Features

- **Input Fields**: Two text inputs for entering strings
- **Calculate Button**: Triggers the LCS calculation
- **Example Button**: Loads sample data for quick testing
- **Clear Button**: Resets all inputs and results
- **Results Display**: Shows LCS, length, positions, and highlighted strings
- **Algorithm Info**: Educational section explaining the approach

## 🛠️ Technologies Used

### Frontend
- React 18
- CSS3 with Flexbox/Grid
- Responsive Design
- Smooth Animations

### Backend
- Node.js
- Express.js
- CORS middleware
- RESTful API

## 📦 Dependencies

### Backend
- express: ^4.18.2
- cors: ^2.8.5
- nodemon: ^3.0.1 (dev)

### Frontend
- react: ^18.2.0
- react-dom: ^18.2.0
- react-scripts: ^5.0.1

## 🔒 Error Handling

The application handles various error cases:
- Invalid input types
- Server connection failures
- API errors
- Empty strings

## 📝 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Feel free to fork this repository and submit pull requests for improvements!

## 📧 Support

For questions or issues, please open an issue in the repository.

---

Built with ❤️ using React and Node.js
