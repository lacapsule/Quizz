const question = document.querySelector('#question');
const audio = document.querySelector('#wav');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');
const btn = document.querySelector('#next');
if(document.querySelector('#mode')){
    let input = document.querySelector('#mode');
    let mode = input.value;
    let next = document.querySelector('.next');
}

let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availableQuestions = []


let questions = [
    {
        question: 'Quel pays consomme le plus d\'électricité ?',
        choice1: 'Les États-Unis',
        choice2: 'La Chine',
        choice3: 'La France',
        choice4: 'La Russie',
        answer: 2,
    },
    {
        question: 'Combien d\'équipement numérique possède chaque Français ? ',
        choice1: '1',
        choice2: '5',
        choice3: '8',
        choice4: '15',
        answer: 3,
    },
    {
        question: 'Combien de Smartphones se vendent chaque secondes ?',
        choice1: '20',
        choice2: '40',
        choice3: '80',
        choice4: 'des milliards, je l\'ai vu sur internet',
        answer: 2,
    },
    {
        question: 'Combien de téléphones sont produits chaque année ? ',
        choice1: 'Plus d\'1 milliard',
        choice2: '300 millions',
        choice3: 'Mille milliards de mille sabords',
        choice4: '500 mille',
        answer: 1,
    },
    {
        question: 'En moyenne combien de temps une personne garde t-elle son smartphone ?',
        choice1: '2 ans',
        choice2: '8 ans',
        choice3: '5 ans',
        choice4: '3 ans',
        answer: 4,
    },
    {
        question: 'Combien de tweets sont écrits par jour ?',
        choice1: '500 milles',
        choice2: '5 millions',
        choice3: '50 millions',
        choice4: 'Personne va sur Twitter, lol.',
        answer: 3,
    },
    {
        question: 'A combien d\'appareils actifs équivaut notre consommation électrique en moyenne par jour ?',
        choice1: 'deux Radiateurs',
        choice2: 'un Grille-pain',
        choice3: 'une Lampe à huile',
        choice4: 'un Frigo',
        answer: 1,
    },
    {
        question: 'Combien de % d\'électricité consomme le numérique à lui-seul ?',
        choice1: '1%',
        choice2: '5%',
        choice3: '7%',
        choice4: '10%',
        answer: 4,
    },
    {
        question: 'Combien de tours du monde effectue un smartphone avant d\'arriver à destination ?',
        choice1: '2',
        choice2: '4',
        choice3: '6',
        choice4: '8',
        answer: 2,
    },
    {
        question: 'Un mail équivaut à une ampoule de 25W allumée pendant :',
        choice1: '30 minutes',
        choice2: '1 heure',
        choice3: '2 heures',
        choice4: '5 heures',
        answer: 2,
    },
    {
        question: 'Deux recherches Google emettent l\'energie necessaire pour :',
        choice1: 'Faire fonctionner un four',
        choice2: 'Cuir un steak',
        choice3: 'Faire bouillir de l\'eau',
        choice4: 'Faire une raclette',
        answer: 3,
    },
    {
        question: 'L\'utilisation de la barre des favoris permet de diviser votre consommation d\'énergie par :',
        choice1: '1',
        choice2: '2',
        choice3: '3',
        choice4: '4',
        answer: 4,
    }
    

]

const SCORE_POINTS = 100
const MAX_QUESTIONS = 12

startGame = () => {
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    getNewQuestion()
}

getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS){
        localStorage.setItem('mostRecentScore', score)
        return window.location.assign('end.html')
    }

    questionCounter++
    progressText.innerText = `Question ${questionCounter} sur ${MAX_QUESTIONS}`
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`

    const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionsIndex]
    question.innerText = currentQuestion.question

    choices.forEach(choice => {
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]
    })

    availableQuestions.splice(questionsIndex, 1)

    acceptingAnswers = true


}

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!acceptingAnswers) return

        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'

        if(classToApply === 'correct') {
            incrementScore(SCORE_POINTS)
        }

        selectedChoice.parentElement.classList.add(classToApply)

        if(document.querySelector('#mode')){
            document.querySelector('.next').style.display = "block"; 
        }else{
            
            setTimeout(() => {
                selectedChoice.parentElement.classList.remove(classToApply)
                getNewQuestion()
            }, 1000)
        }
        
    })

    
    
})

    
if(document.querySelector('#mode')){
    if(mode.value === 'anim'){
    btn.addEventListener('click', e => {
        const choice = document.querySelector('.correct') || document.querySelector('.incorrect')

        choice.classList.remove('correct')
        choice.classList.remove('incorrect')
        document.querySelector('.next').style.display = 'none'
        getNewQuestion()
        
    });
}
}
    incrementScore = num => {
    score+=num
    scoreText.innerText = score
}



startGame()