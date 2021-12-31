// const http = require('http');

// const COURSES = [
//     {id:1, name: "Nodejs"},
//     {id:2,name : "Reactjs"}
// ]

// const server = http.createServer((req, res) => {
//     res.writeHead(200,{
//         'Content-type': 'application/json',
//         'X-Powered-By': 'Node.js'
//     })
    
//     res.end(JSON.stringify({
//         success: true,
//         data: COURSES
//     }));
// })

const express = require('express');
const app = express();

app.use(express.json());

const courses = [
    {id:1, name: "Nodejs"},
    {id:2,name : "Reactjs"},
    {id:3,name : "PHP"}

]

app.get('/', (req, res) =>{
    res.send('Bạn đang tham gia khóa học lập trình Nodejs tại ZendVn');
})

app.get('/api/courses', (req, res) =>{
    res.send(courses);
})

app.get('/api/courses/:id', (req, res) =>{
    const course = courses.find(courses => courses.id === parseInt(req.params.id));
    if(!course) res.status(404).send('ID không tồn tại')
    res.send(course)
})

app.post('/api/courses/add', (req, res) =>{
    const course = {
        id : req.body.id,
        name : req.body.name,
    }
    courses.push(course);
    res.send(JSON.stringify({
        success: true,
        notice: 'Bạn đã thêm thành công',
        data: courses
    }))
})

app.put('/api/courses/edit/:id', (req, res) =>{
    const course = courses.find(courses => courses.id === parseInt(req.params.id));
    course.name = req.body.name;
    res.send(JSON.stringify({
        success: true,
        notice: 'Bạn đã cập nhật thành công',
        data: courses
    }))
})

app.delete('/api/courses/delete/:id', (req, res) =>{
    const course = courses.find(courses => courses.id === parseInt(req.params.id));
    const index = courses.indexOf(course);
    courses.splice(index,1)
    res.send(JSON.stringify({
        success: true,
        notice: 'Bạn đã xóa thành công',
        data: courses
    }))
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));