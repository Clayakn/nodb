let comments = [
    {text: "Vanilla Wow is the best content, there was no need to change it.",
     expansion: 'Vanilla',
     id: 0
    },
    {text: "Wrath of the Lich King is the best expansion so far",
     expansion: 'Wrath of the Lich King',
     id: 1
    }
];
let id = 2;

module.exports = {
    create: (req,res) => {
        const {text, expansion} = req.body;
        newComment = {
            text: text,
            expansion: expansion,
            id: id
        }
        comments.push(newComment);
        id++; 
        res.status(200).json(comments);
        },
    read:(req, res) => {
            res.status(200).json(comments);
    },
    update:(req ,res) => {
        const {text} = req.body; 
        const updateID =req.params.id;
        const index = comments.findIndex(comment => comment.id == updateID);
        let comment = comments[index];
        comments[index] = {
            text: text || comment.text,
            expansion: comment.expansion,
            id: comment.id,
        };
        res.status(200).json(comments); 
    },
    delete: (req, res) => {
        deleteID = req.params.id; 
        const index = comments.findIndex(comment => comment.id == deleteID);
        comments.splice(index,1);
        res.status(200).json(comments);
    },
    
    getByExpanison: (req, res) => {
        const  {expansion}  = req.query;
        console.log('getByExpansion',expansion)
        let filteredComments = comments.filter(comment => comment.expansion == expansion)
        res.status(200).json(filteredComments);
    }
}  