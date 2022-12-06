/***************** CALCULATRICE ****************/

// VARIABLES
const zero = '0';            // valeur initiale affichée
let input = zero;            // saisie actuelle
let firstNumber = '';        // variable qui stockera ma 1ère saisie
let operator = '';           // operateur de calcul
let resultat = '';           // resultat du calcul

// ECRAN de la calculatrice
let screen = document.querySelector('.screen');
screen.textContent = input;


// CHIFFRE : Quand on appuie un bouton chiffre ou virgule
document.querySelectorAll('.number').forEach(button => {
    button.addEventListener('click', e => {

        // Stocke le chiffre ou la virgule saisie dans la variable 'value'
        let value = e.target.textContent;

        // s'il y a deja un resultat précédent -> réinitialise tout
        if (resultat !== '') {
            input = zero;
            firstNumber = '';
            operator = '';
            resultat = '';
            console.log('Il y a deja un resultat -> Réinitialise tout');
        }

        // Si c'est la 1ère saisie de chiffres
        // if ((input === '' || operator === '')) {

        // si la valeur est une virgule ET qu'elle est deja presente dans la saisie, alors ne fais rien. Sinon ajoute la valeur
        if (!(value === '.' && input.includes('.'))) {
            // ajoute la valeur à la 1ère saisie
            input += value;
        }
        // }
        // else {
        //     // sinon passe à la 2nd saisie
        //     // si c'est une virgule et qu'elle est deja presente dans la saisie, alors ne fais rien
        //     if (!(value === '.' && secondInput.includes('.'))) {
        //         secondInput += value;
        //         screen.textContent = secondInput;
        //     }
        // }


        // si le 1er chiffre est un 0, alors supprime le car il est inutile dans le calcul
        if (input[0] === '0') {
            console.log('1er chiffre du input = zero, il est supprimé');
            input = input.replace('0', '')
        }

        screen.textContent = input;
        console.log('input : ' + input);
    })
})


// OPERATOR : Quand on appuie un bouton operateur (+-x/)
document.querySelectorAll('.operator').forEach(button => {
    button.addEventListener('click', e => {

        // si j'ai pas de résultat, mais j'ai un firstNumber, un operateur et un input, alors calcul le résultat
        if (resultat === '' && firstNumber !== '') {
            calculResultat()
            console.log('Calcul le resultat');
            firstNumber = resultat;
            resultat = '';
            input = zero;
        }

        // Je stocke l'opérateur actuel dans la variable
        operator = e.target.textContent;


        // si j'ai un résultat, alors je stocke mon resultat dans firstNumber, et je réinitialise input et résultat;
        if (resultat !== '') {
            firstNumber = resultat;
            resultat = '';
            input = zero;
            console.log('Il y a deja un resultat, je stocke mon resultat dans firstNumber, et je réinitialise input et résultat');
            console.log('firstNumber : ' + firstNumber);
            console.log('resultat : ' + resultat);
            console.log('input : ' + input);
        }

        // Si c'est ma 1ère saisie, alors je stocke mon input dans firstNumber, et je réinitialise mon input à 0
        if (firstNumber === '') {
            firstNumber = input;
            input = zero;
            console.log('je stocke mon input dans firstNumber');
            console.log('firstNumber : ' + firstNumber);
            console.log('je réinitialise mon input à zero');
            console.log('input : ' + input);
        }

        console.log('opérateur : ' + operator);
    })
})

// FLECHE : Quand on appuie le bouton flèche (retour) -> efface le dernier chiffre saisie
document.querySelector('.back').addEventListener('click', e => {

    // Si la saisie comporte plus de 1 chiffre, alors efface le dernier
    if (input.length > 1) {
        input = input.slice(0, -1)
        screen.textContent = input;
    } else {
        // sinon remet le input à zero
        input = zero
        screen.textContent = input;
    }
    console.log('input : ' + input);
})

// EGALE : Quand on appuie le bouton égale
document.querySelector('.equal').addEventListener('click', e => {
    // Execute cette fonction
    calculResultat();
})


// CLEAR : Quand on appuie le bouton clear -> réinitialise tout
document.querySelector('.clear').addEventListener('click', e => {
    input = zero;
    firstNumber = '';
    operator = '';
    resultat = '';
    screen.textContent = input;
    console.log('Réinitialise tout');
})


// FONCTION RESULTAT : Calcule et affiche le résultat
function calculResultat() {

    // Si j'ai mon 1er nombre et mon operateur, alors calcule et affiche le rslt
    if ((firstNumber !== '' && operator !== '')) {

        // Calcule
        if (operator === '+') { resultat = parseFloat(firstNumber) + parseFloat(input) };
        if (operator === '-') { resultat = parseFloat(firstNumber) - parseFloat(input) };
        if (operator === 'x') { resultat = parseFloat(firstNumber) * parseFloat(input) };
        if (operator === '/') { resultat = parseFloat(firstNumber) / parseFloat(input) };

        // Affiche le resultat en arrondissant à 2 chiffres après la virgule
        screen.textContent = Math.round(resultat * 100) / 100
        console.log(resultat);
        console.log('Résultat = ' + firstNumber + ' ' + operator + ' ' + input + ' = ' + resultat);
    }

    // Si le resultat n'est pas un nombre (NaN), affiche Erreur, et réinitialise tout
    if (isNaN(resultat)) {
        screen.textContent = 'Erreur';
        input = zero;
        firstNumber = '';
        operator = '';
        resultat = '';
        console.log('Erreur, le résultat n\'est pas un nombre (NaN)');
        console.log('Réinitialise tout');
    }
}


/*********  NOTES  **********

textContent = pour écrire/injecter du texte dans la page HTML
innerHTML = pour écrire/injecter des balises HTML et du texte dans la page HTML
includes() = pour vérifier si un caractère est présent dans une variable (renvoie true ou false)
parseInt() = pour convertir un string en nombre entier
parseFloat() = pour convertir un string en nombre décimal (à virgule)
Math.round() = pour arrondir un nombre

CREER UN EVENEMENT SUR UN ELEMENT HTML :
monElementHTML.addEventListener('click', e => {
    //mon code ici
})

CREER UN MEME EVENEMENT SUR PLUSIEURS ELEMENTS HTML :
mesElementsHTML.forEach(element => {
    element.addEventListener('click', e => {
        //mon code ici
    })
})

*/