import express from 'express';

const app = express();

// app.get('/', (req, res) => {
//     res.send('Server is Ready');
// })

app.get('/api/jokes', (req,res) => {
    const jokes = [
           { id: 1,
            title: "Why don't scientists trust atoms?",
            joke: "Why don't scientists trust atoms? Because they make up everything!" 
          },
         { 
            id: 2,
            title: "Scarecrow Award",
            joke: "Why did the scarecrow win an award? Because he was outstanding in his field!"
        },
           {
             id: 3,
             title: "Skeleton Fight",
             joke: "Why don't skeletons fight each other? They don't have the guts."
         },
         {
            id: 4,
            title: "Why hasn't Salman Khan married yet?",
            joke: "Because he is still searching for his 'Dulhan'!"
         },
         {
            id: 5,
            title: "Why did the bicycle fall over?",
            joke: "Because it was two-tired!"
         }
    ]

    res.send(jokes);
})

app.get('/hello/me', (req, res) => {
     const data = [
        {
              type: "Name:",
              ans: "Muhammad Salman"
     },
     {
            type: "Country:",
            ans: "Pakistan"
     },
        {
            type: "City:",
            ans: "Karachi"
        },
        {
            type: "Age:",
            ans: 19
        },
          {
            type: "Occupation:",
            ans: "Student/Developer"
          } 
    ]
     res.send(data);
})

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});