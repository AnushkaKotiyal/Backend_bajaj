const express = require("express");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 3005;


const allowedOrigins = [
    'https://backend-bajaj-dfgd.vercel.app/',
    'https://www.backend-bajaj-dfgd.vercel.app/'
];

const corsOptions = {
    origin: (origin, callback) => {
        if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
};




app.use(cors(corsOptions));
app.options('*', cors(corsOptions));


app.use(express.json());




app.post("/bfhl", (req, res) => {
    try {
        const { data } = req.body;
        
        if (!data || !Array.isArray(data)) {
            return res.status(400).json({ is_success: false, message: "Invalid input format" });
        }

        const user_id = "john_doe_17091999";
        const email = "john@xyz.com";
        const roll_number = "ABCD123";

        const numbers = data.filter(item => !isNaN(item)).map(String);
        const alphabets = data.filter(item => /^[a-zA-Z]$/.test(item));

        const highestAlphabet = alphabets.length 
            ? [alphabets.sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase())).pop()]
            : [];

        const response = {
            is_success: true,
            user_id,
            email,
            roll_number,
            numbers,
            alphabets,
            highest_alphabet: highestAlphabet,
            data
        };

        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ is_success: false, message: "Server error" });
    }
});

app.get("/bfhl", (req, res) => {
    res.status(200).json({ operation_code: 1 });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
