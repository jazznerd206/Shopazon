INSERT INTO `shopazon_db`.`Departments`
(`name`,
`createdAt`,
`updatedAt`)
VALUES
('Baby',
NOW(),
NOW()),
('Electronics',
NOW(),
NOW()),
('Sport',
NOW(),
NOW());
INSERT INTO `shopazon_db`.`Products`
(
`name`,
`description`,
`price`,
`image`,
`createdAt`,
`updatedAt`,
`DepartmentId`)
VALUES
(
'Mustela',
'Stress-Free Skin Care Simplify your baby\'s skin care routine while protecting against dry skin on baby\'s face, nose, cheeks, and lips. Use Mustela',
'5',
'imageurl',
NOW(),
NOW(),
1),
(
'Aveeno Shampoo',
'Rich lathering wash & shampoo formula rinses clean & leaves a light, fresh fragrance Gentle and tear-free formula cleanses without drying',
'7',
'imageurl',
NOW(),
NOW(),
1),
(
'Baby Gate',
'Set area boundaries for kids or pets with this Safety 1st Easy-Fit security gate. The one-handed lock-and-release handle provides easy access to adults, and the memory function maintains the gate\'s set width for quick removal and reinstallation. Easily adjust this Safety 1st Easy-Fit security gate between 28-40 inches wide to fit a doorway or staircase.',
'45',
'imageurl',
NOW(),
NOW(),
1),
('Samsung - 40" Class - LED - 5 Series TV',
'Experience immersive viewing when you add this Samsung 40-inch smart TV to your home. The wide color enhancer and Full HD resolution deliver vibrant picture quality, while the Digital Clean View optimizes content for better results. A unique lifestyle gallery creates scenic views for any room in your home when this TV is not in use. This Samsung 40-inch smart TV features support for the Samsung SmartThings app to complete your home automation setup.',
'345',
'imageurl',
NOW(),
NOW(),
2),
(
'Air 2 Smartwatch 41mm Black Case with Black Strap',
'The iTOUCH Air 2 is your friendly smartwatch designed for both your connected and fitness life, showcasing a new heart rate monitor, a square dial, and a silicone strap for added comfort. Ultra stylish and sleek with half the cost of other smartwatches on the market.',
'125',
'imageurl',
NOW(),
NOW(),
2),
(
'Introducing Echo Show 8 - HD 8" smart',
'Alexa can show you more - With an 8" HD screen and stereo sound, Alexa can help manage your day at a glance.
Be entertained - Ask Alexa to show you movie trailers, TV shows, movies, or the news. Or listen to radio stations, podcasts, and audiobooks.',
'75',
'imageurl',
NOW(),
NOW(),
2),
(
'Wilson Official Evolution Basketball 29.5',
'The preferred ball of many high school and college athletes, the Wilson® Official Evolution® Game Basketball is among the top performers in its class. Cushion Core Technology™ combines low-density sponge rubber and ultra-durable butyl rubber, producing a basketball with exceptional feel and unmatched durability. Constructed with a microfiber cover that is exclusively designed for the indoor court, the Wilson® Official Evolution® Game Basketball is a true champion.',
'80',
'imageurl',
NOW(),
NOW(),
3),
(
'FootJoy Men 2019 Pro/SL Golf Shoes',
'Experience Tour proven spikeless performance when you are wearing the FootJoy Men’s Pro/SL Golf Shoes. Built with lightweight, waterproof ChromoSkin™ uppers designed to deliver comfort and performance in any conditions and lightweight cushioned fit beds provide underfoot comfort and heel support with each step. Proprietary dual-density FTF™ outsoles deliver the traction demanded by the world’s best golfers.',
'100',
'imageurl',
NOW(),
NOW(),
2),
(
'Louisville Slugger Xeno X19 Fastpitch Bat 2019 ',
'The most popular bat in the Slugger® Fastpitch lineup, the 2019 Xeno Series Bat has a two-piece construction that maximizes energy transfer on contact. This -10 drop has an ultra-light end cap and balanced weight distribution designed for speed and pop.',
'150',
'imageurl',
NOW(),
NOW(),
2);

