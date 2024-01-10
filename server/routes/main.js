const express = require('express');
const router = express.Router();
const Post = require('../models/Post');

// Routes

/*
    * GET /
    * HOME
*/ 
router.get('', async (req, res) => {
    try {
        const locals = {
            title: 'BlogInByte',
            description: "Simple Blog created with NodeJs, Express & MongoDb."
        }

        let perPage = 10;
        let page = req.query.page || 1;

        const data = await Post.aggregate([ { $sort: {createdAT: -1} } ])
        .skip(perPage * page - perPage)
        .limit(perPage)
        .exec();


        const count = await Post.countDocuments({});
        const nextPage = parseInt(page) + 1;
        const hasNextPage = nextPage <= Math.ceil(count / perPage);


        res.render('index', {
            locals,
            data,
            current: page,
            nextPage: hasNextPage ? nextPage : null,
            currentRoute: '/'
        });


    } catch (error) {
        console.log(error);
    }
  
});







/*
router.get('', async (req, res) => {
    const locals = {
        title: 'NodeJs Blog',
        description: "Simple Blog created with NodeJs, Express & MongoDb."
    }

    try {
        const data = await Post.find();
        res.render('index', {locals, data});
    } catch (error) {
        console.log(error);
    }
  
});
 */



/*
    * GET /
    * Post : id
*/ 
router.get('/post/:id', async (req, res) => {
    try {
        let slug = req.params.id;

        const data = await Post.findById({ _id: slug });

        const locals = {
            title: data.title,
            description: "Simple Blog created with NodeJs, Express & MongoDb."
        }

        res.render('post', {locals, data, currentRoute: `/post/${slug}`});
    } catch (error) {
        console.log(error);
    }
  
});



/*
    * GET /
    * Post - searchTerm
*/ 
router.post('/search', async (req, res) => {

    try {
        const locals = {
            title: 'Search',
            description: "Simple Blog created with NodeJs, Express & MongoDb."
        }

        let searchTerm = req.body.searchTerm;
        const searchNoSpecialChar = searchTerm.replace(/[^a-zA-Z0-9 ]/g, "")

        const data = await Post.find({
            $or: [
                { title: { $regex: new RegExp(searchNoSpecialChar, 'i') }},
                { body: { $regex: new RegExp(searchNoSpecialChar, 'i') }}
              ]
        });

        res.render("search", {
            data,
            locals,
            currentRoute: '/'
        });



    } catch (error) {
        console.log(error);
    }
  
});




/**
 * GET /
 * About
*/
router.get('/about', (req, res) => {

    try {
        const locals = {
            title: 'About',
            description: "Simple Blog created with NodeJs, Express & MongoDb."
        }

        res.render('about', {locals, currentRoute: '/about'});
    } catch (error) {
        console.log(error);
    }
    
});


/**
 * GET /
 * Contact
*/
router.get('/contact', (req, res) => {
    try {
        const locals = {
            title: 'Contact',
            description: "Simple Blog created with NodeJs, Express & MongoDb."
        }

        res.render('contact', {locals, currentRoute: '/contact'});
    } catch (error) {
        console.log(error);
    }
    
});


module.exports = router;













/*function insertPostData () {
    Post.insertMany([
        {
            title: "Embracing Tomorrow: The Robotic Revolution",
            body: "In the swiftly changing landscape of technology, robotics has become a ubiquitous force, simplifying our lives and reshaping industries. From autonomous vacuum cleaners to collaborative robots enhancing productivity, automation has seamlessly integrated into our routines. In healthcare, surgical robots and telepresence devices offer precision and access. Ethical considerations, crucial in this integration, include safeguarding data and defining robot autonomy. Inspired by nature, robotics produces not just functional but ecologically mindful machines. As we navigate this revolution, fostering education ensures a skilled workforce ready for a future where humans and robots coexist seamlessly, enhancing our lives responsibly."
        },
        {
            title: "India's Hardware Industry Screws on Innovation",
            body: "Forget dusty shelves and greasy overalls, India's hardware industry is revving up, swapping wrenches for robots and blueprints for AI. The booming construction sector is just the spark, igniting demand for smart homes, advanced materials, and skilled workers. E-commerce joins the party, offering hardware on tap, while ambitious training programs upskill the workforce for this tech-driven future. Challenges like supply chains and quality control are mere bumps on the road, not roadblocks – India's hardware revolution is building not just homes, but a smarter, more connected tomorrow."
        },
        {
            title: "Fast-Forwarding Innovation: How the Pandemic Accelerated Tech Evaluation",
            body: "COVID-19 wasn't just a viral storm, it was a tech tornado. Social distancing spun up a whirlwind of innovation, with Zoom calls replacing watercooler chats, robots disinfecting hospitals like futuristic janitors, and AI diagnosing coughs like seasoned doctors. Telehealth went from niche to norm, classrooms sprouted online like digital dandelions, and work went wireless, untethered from cubicles. This crash course in tech exposed both its dazzling potential and its shadowy corners – the convenience of automation versus the chilling grip of data privacy. But as the dust settles, we're left with a toolbox overflowing with lessons learned and tools honed. It's time to step out of the pandemic's shadow and build a future where tech isn't just a shield against crisis, but a bridge to a more connected, resilient, and equitable world. One innovation at a time, we'll rewrite the narrative, with COVID-19 not as the villain, but as the catalyst for a tech-powered tomorrow."
        },
        {
            title: "The Trinity of Design: Where UI/UX and Graphic Design Converge",
            body: "UI/UX and graphic design, often confused roommates, are actually a dynamic trio crafting the digital spaces we love. The UX architect lays the map, ensuring seamless user journeys. UI artists paint the interface, weaving intuitive buttons and color palettes. And the graphic design magician sprinkles stardust, injecting personality and brand magic through visuals. This harmonious collaboration isn't just artistic flair; it's the secret sauce for engaging apps, skyrocketing conversions, and building brand loyalty. So, the next time you marvel at a smooth website or a captivating app, remember the artistic tango behind the scenes – UI/UX and graphic design, the trinity of design."
        },
        {
            title: "Buckle Up, Humans: The AI Express is Leaving the Station (and It's Going Fast!)",
            body: "Hold onto your hats, humans, the AI express is leaving the station! This tech juggernaut, fueled by data, processing power, and algorithmic leaps, is churning out mind-blowing capabilities from personalized playlists to self-driving cars. But along with this dazzling potential come hefty questions: who controls these digital brains, what happens to our jobs, and will Skynet ever become real? Buckle up, not just for the ride, but for the responsibility. Let's steer this transformative force towards a future where AI isn't just our companion, but our collaborator, building a brighter world for all. Remember, the future is a blank canvas, and with AI by our side, the colors are limitless."
        },
        {
            title: "From Clay Tablets to 3D Treats: Printing's Delicious Evolution",
            body: "Forget Gutenberg and clay tablets, 3D printers are spitting out custom cookies alongside life-saving organs! Printing's evolved from cavemen scribbling on rocks to edible masterpieces, revolutionizing education, medicine, and yes, your morning latte art. It's not just words and images anymore, it's building the future, from personalized prosthetics to bioprinted tissues. So take a bite of that perfectly-iced cookie, it's a delicious reminder that printing's not just ink on paper, it's shaping the world, one layer at a time."
        },
        {
            title: "Kolkata: Where Colonial Echoes Meet Vibrant Soul",
            body: "From Raj-era grandeur like Howrah Bridge to the intoxicating chaos of Durga Puja, Kolkata is a symphony of ancient temples and bustling markets, intellectual giants and street food aromas. Dive into colonial echoes at St. Paul's Cathedral, then lose yourself in the vibrant chaos of Kumartuli potter's quarter. Rabindra Sangeet melodies mingle with the clatter of rickshaws, while spicy luchis and creamy mishti doi tantalize your taste buds. Go beyond the tourist trail, get lost in Bowbazar's spice-lined lanes, and feel the electric energy at Eden Gardens cricket stadium. Kolkata's not just a city, it's an experience waiting to weave its magic on you, one bite, one melody, one conversation at a time. So pack your bags and let this cultural tapestry unfold its vibrant soul."
        },
        {
            title: "Unveiling the Mysteries: A Glimpse into Parapsychology",
            body: "In the realm where science meets the supernatural, parapsychology takes center stage, delving into the uncharted territories of the mind. This discipline goes beyond the conventional boundaries of psychology, exploring phenomena like telepathy, clairvoyance, and precognition. While skeptics raise eyebrows, parapsychologists persist in their quest to understand the inexplicable. Studying the untapped potential of the human mind, parapsychology sparks conversations about the limits of our current scientific understanding. Whether you're a curious skeptic or an avid believer, the exploration of parapsychology invites us to question the boundaries of our consciousness and contemplate the mysterious dimensions of the human psyche."
        },
        {
            title: "Beyond Horizons: India's Tech Renaissance Unveiled by IoT and Automation",
            body: "In the dynamic tableau of India's technological resurgence, the intertwined forces of IoT and automation are casting a visionary tapestry. From bustling metropolises to the quiet hinterlands, the marriage of connected devices and automated systems is reshaping industries, scripting a narrative of innovation. Propelled by the 'Make in India' initiative, the nation strides forward, not just as a manufacturing powerhouse but as an architect of a connected tomorrow. Smart factories hum with efficiency, precision agriculture marks fields with promise, and remote healthcare bridges gaps in access. Yet, threading through this digital revolution requires more than technical finesse; it demands an ethical compass, ensuring a future where technology serves society equitably. In this unfolding saga of progress, India is not just embracing change; it is penning a distinctive chapter in the story of connected potential."
        },
        {
            title: "Brushes and Beyond: Bengal's Art Odyssey",
            body: "Bengal's art culture is a kaleidoscope of tradition and innovation, from the timeless strokes in ancient temples to the avant-garde creations of today. Rooted in the Bengal School of Art, the region's canvas thrives on a unique fusion of classical and indigenous styles. Durga Puja, a grand celebration, transforms the streets into vibrant galleries with stunning installations and intricate alpana drawings. Each stroke in Bengal's artistic journey tells a story, weaving a tapestry that reflects the soul of a culture deeply immersed in its creative heritage. The art of Bengal is not just a sight to behold; it's an odyssey through history, tradition, and the boundless spirit of artistic exploration."
        }
    ])
}*/

//insertPostData();