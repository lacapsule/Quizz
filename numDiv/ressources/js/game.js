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
        question: 'Quel était le mot de passe de l\'ordinateur des missiles nucléaires aux États-Unis jusqu\'en 1977 ?',
        choice1: '00000000',
        choice2: 'HELLO',
        choice3: '1234',
        choice4: 'PASSWORD',
        answer: 1,
    },
    {
        question: 'De quoi était faite la première souris informatique ? ',
        choice1: 'de Verre',
        choice2: 'de Métaux',
        choice3: 'de Bois',
        choice4: 'd\'Acier',
        answer: 3,
    },
    {
        question: 'De combien est estimée la consommation en énergie de la société Google chaque année ?',
        choice1: '50 000 foyers',
        choice2: '100 000 foyers',
        choice3: '150 000 foyers',
        choice4: '200 000 foyers',
        answer: 4,
    },
    {
        question: 'Combien de virus sont créés chaque mois ?',
        choice1: '60',
        choice2: '600',
        choice3: '6 000',
        choice4: '60 000',
        answer: 3,
    },
    {
        question: 'Combien de nouveaux domaines de sites internet sont créés chaque mois en moyenne ?',
        choice1: '1 000',
        choice2: '10 000',
        choice3: '100 000',
        choice4: '1 000 000',
        answer: 4,
    },
    {
        question: 'Qui est la personne ayant créé le concept de programmation informatique ?',
        choice1: 'Elon Musk',
        choice2: 'Bill Gates',
        choice3: 'Alan Turing',
        choice4: 'Ada Lovelace',
        answer: 4,
    },
    {
        question: 'À combien équivaut le pourcentage de monnaie numérique dans le monde ?',
        choice1: '20%',
        choice2: '30%',
        choice3: '70%',
        choice4: '90%',
        answer: 4,
    },
    {
        question: 'Combien de langages de programmation existent-ils ?',
        choice1: 'Environ 8',
        choice2: 'Plus de 700',
        choice3: 'HTML, CSS, JAVASCRIPT... 3 !',
        choice4: 'Un seul, le système binaire',
        answer: 2,
    },
    {
        question: 'Quel fut le premier article mis en vente sur internet ?',
        choice1: 'de la Majiruana',
        choice2: 'un Album de musique',
        choice3: 'un Livre',
        choice4: 'des revues à caractère pornographique',
        answer: 1,
    },
    {
        question: 'De quel pourcentage du traffic mondial la plateforme Netflix est responsable sur internet ?',
        choice1: '5%',
        choice2: '10%',
        choice3: '15%',
        choice4: '20%',
        answer: 3,
    }
    

]

const SCORE_POINTS = 100
const MAX_QUESTIONS = 10

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