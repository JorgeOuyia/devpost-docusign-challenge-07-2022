const express = require('express');

const app = express();


app.get('/api', (request, response) => {
    response.json({
        'users': [
            'userOne',
            'userTwo',
            'userThree'
        ]
    });
});

app.listen(5000, () => {
    console.log('Server started on port 5000');
})