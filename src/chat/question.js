var limdu = require('limdu');




//Train
intentClassifier.trainBatch([
//genre
{input: "Je veux regarder un film d'action", output: "action"},
{input: "Tu as un bon thriller ?", output: "thriller"},
{input: "J'ai envie d'un film de science-fiction", output: "sf"},
{input: "Propose-moi une bonne comédie", output: "comédie"},
{input: "Je cherche un film d'horreur", output: "horreur"},

//nationalité
{input: "Je cherche un film indien", output: "indien"},
{input: "Tu as un bon film coréen ?", output: "coréen"},
{input: "Je veux un film africain", output: "africain"},
{input: "Un film japonais, ça me tente", output: "japonais"},
{input: "J'adore les films français", output: "français"},
{input: "Je souhaite voir un film américain", output: "américain"},

//cible/public
{input: "Je veux un film pour enfants", output: "enfant"},
{input: "Un film pour ado, c'est ce qu'il me faut", output: "adolescent"},
{input: "Je cherche un film familial", output: "familial"},
{input: "Un film adulte avec du drame ?", output: "drame"},
{input: "As-tu des films tout public ?", output: "tout public"},

//budget/production
{input: "Un blockbuster, s'il te plaît", output: "blockbuster"},
{input: "Propose-moi un film indépendant", output: "indépendant"},
{input: "Tu as un bon film à petit budget ?", output: "petit budget"},
{input: "J'aime les grands films hollywoodiens", output: "holywood"},
{input: "Un film indie, pourquoi pas ?", output: "indie"},

//thématique
{input: "Je veux un film sur la guerre", output: "guerre"},
{input: "Un film qui parle de l'environnement ?", output: "environnement"},
{input: "Je cherche un film romantique", output: "romantique"},
{input: "Un film avec une thématique technologique", output: "technologie"},

//format
{input: "Un court métrage, ça me va", output: "court métrage"},
{input: "Je veux un film en noir et blanc", output: "noir et blanc"},
{input: "Un film muet, tu as ?", output: "muet"},
{input: "Un documentaire captivant, ça existe ?", output: "documentaire"},
{input: "Je cherche un film en 3D", output: "3D"},

//franchise/univers
{input: "Je veux un film Marvel", output: "Marvel"},
{input: "Un film Star Wars, c'est ce qu'il me faut", output: "Starwars"},
{input: "Tu as un film du Studio Ghibli ?", output: "franchise/univers"},
{input: "Un film DC, s'il te plaît", output: "franchise/univers"},
{input: "J'adore la saga Harry Potter, tu en as ?", output: "franchise/univers"},

//distinction et récompenses
{input: "Un film primé aux Oscars ?", output: "Oscar"},
{input: "Tu as un film qui a gagné la Palme d'Or ?", output: "Palme d'or"},
{input: "Je cherche un film culte", output: "culte"},
{input: "Un film primé dans un festival, ça m'intéresse", output: "primé"},
]);

console.log('Bonjour')