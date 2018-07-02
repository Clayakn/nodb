let storyboards = [
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
        newStoryboard = {
            text: text,
            expansion: expansion,
            id: id
        }
        storyboards.push(newStoryboard);
        id++; 
        res.status(200).json(storyboards);
        },

    read:(req, res) => {
            res.status(200).json(storyboards);
    },

    update:(req ,res) => {
        const {text} = req.body; 
        const updateID =req.params.id;
        const index = storyboards.findIndex(story => story.id == updateID);
        let story = storyboards[index];
        storyboards[index] = {
            text: text || story.text,
            expansion: story.expansion,
            id: story.id,
        };
        res.status(200).json(storyboards); 
    },

    delete: (req, res) => {
        deleteID = req.params.id; 
        const index = storyboards.findIndex(story => story.id == deleteID);
        storyboards.splice(index,1);
        res.status(200).json(storyboards);
    },
    
    getByExpanison: (req, res) => {
        const  {expansion}  = req.query;
        console.log('getByExpansion',expansion)
        let filteredStoryboards = storyboards.filter(story => story.expansion == expansion)
        res.status(200).json(filteredStoryboards);
    }
}  