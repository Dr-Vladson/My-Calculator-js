const calcScreen = document.querySelector('.calculator__screen')
const allBtnsBlock = document.querySelector('.calculator__all-buttons')
const circumstancesString = document.querySelector('.screen-text__down-span')
let internalCircumstancesAr = ['0']
const screenAdSpan = document.querySelector('.screen-text__down-ad-span')
const acBtn = document.getElementById('ac-btn')
const mathHistoryBlock = document.querySelector('.screen-popup-window__math-history')
const popupStartText = document.querySelector('.start-text')

const firstHistIcon = document.querySelector('.history-icon')
const popupWindow = document.querySelector('.screen-popup-window')

const ansPtag = document.querySelector('.screen-text__up-p')
const circumstancesStringFather = circumstancesString.parentElement
let resultForAns = '0'

const popupTop = document.querySelector('.screen-popup-window__top')
let amountOfHistoryBlocks = 0
let tempLastresult = ''

function ansFiller (){
    ansPtag.innerText = `Ans = ${resultForAns}`
}
function fromHistoryNumberAdder(fromWhere){
    circumstancesString.textContent = fromWhere.dataset.value
    internalCircumstancesAr = fromWhere.dataset.internalArValue.split(',')
    popupWindow.classList.remove('popup-db')
    ansFiller()
}
function completeAcNuller (){
    internalCircumstancesAr = ['0']
    circumstancesString.textContent = '0'
    screenAdSpan.innerText = ''
}
function symbolAppender (toAppend, toPush){
    circumstancesString.append(toAppend)
    internalCircumstancesAr.push(toPush)
}
function symbolDeleter (){
    internalCircumstancesAr.pop()
    const tempStr = circumstancesString.textContent.slice(0, length-1)
    circumstancesString.textContent = tempStr
}
function symbolMultiplier (toAppend, toPush){
    circumstancesString.append('×')
    internalCircumstancesAr.push('*')
    symbolAppender(toAppend, toPush)
}
function screenAnimationAdder(){
    ansPtag.style.animation = 'ans-up-text 0.25s'
    circumstancesStringFather.style.animation = 'down-text 0.25s'
}

function negativeNumberExponentationWithBracketsSurrounder (currentVersionOfCircumstancesArray){
    const lastExponentSignHappenedIndex = currentVersionOfCircumstancesArray.lastIndexOf('**')
    if (lastExponentSignHappenedIndex === -1){return}

    // console.log('вошедший в функцию массив', currentVersionOfCircumstancesArray)
    // console.log('lastExponentSignHappenedIndex', lastExponentSignHappenedIndex)

    let withoutSymbolsAfterLastExponentSignArray = currentVersionOfCircumstancesArray.slice(0, lastExponentSignHappenedIndex)
    
    // console.log('withoutSymbolsAfterLastExponentSignArray', withoutSymbolsAfterLastExponentSignArray)

    if (withoutSymbolsAfterLastExponentSignArray[withoutSymbolsAfterLastExponentSignArray.length - 1] !== ')'){
        const lastMinusSignHappenedIndex = withoutSymbolsAfterLastExponentSignArray.lastIndexOf('-')

        // console.log('lastMinusSignHappenedIndex', lastMinusSignHappenedIndex)

        if (lastMinusSignHappenedIndex === -1){return}

        const withoutSymbolsAfterLastExponentAndBeforeLastMinusSignsArray = withoutSymbolsAfterLastExponentSignArray.slice(lastMinusSignHappenedIndex+1) 

        // console.log('withoutSymbolsAfterLastExponentAndBeforeLastMinusSignsArray', withoutSymbolsAfterLastExponentAndBeforeLastMinusSignsArray)

        if (!(withoutSymbolsAfterLastExponentAndBeforeLastMinusSignsArray.includes('*') || withoutSymbolsAfterLastExponentAndBeforeLastMinusSignsArray.includes('**') || withoutSymbolsAfterLastExponentAndBeforeLastMinusSignsArray.includes('Checked **') || withoutSymbolsAfterLastExponentAndBeforeLastMinusSignsArray.includes('/') ||withoutSymbolsAfterLastExponentAndBeforeLastMinusSignsArray.includes('+')) && withoutSymbolsAfterLastExponentAndBeforeLastMinusSignsArray[0] !== '('){

            const withoutSymbolsBeforeLastExponentSignArray = currentVersionOfCircumstancesArray.slice(lastExponentSignHappenedIndex + 1)
            
            exponentationGapsAdderAndNextCheckingLauncher(lastMinusSignHappenedIndex, lookerForSecondGapIndex(withoutSymbolsBeforeLastExponentSignArray, 0) + 1, '1', currentVersionOfCircumstancesArray, lastExponentSignHappenedIndex)
        }
        else {
            justNextCheckingLauncher('1', currentVersionOfCircumstancesArray, lastExponentSignHappenedIndex)
        }
    }
    else {
        let openGapAmount = closeGapAmount = 0
        let firstOpenGapOfQuantityRaisedToPowerSignHappenedIndex
        for (i=withoutSymbolsAfterLastExponentSignArray.length - 1; i >= 0; i--){
            const symbol = withoutSymbolsAfterLastExponentSignArray[i]
            if (symbol === '(') openGapAmount++
            else if (symbol === ')') closeGapAmount++

            if (openGapAmount === closeGapAmount && openGapAmount !== 0){
                withoutSymbolsAfterLastExponentSignArray[i] = '( to find'
                firstOpenGapOfQuantityRaisedToPowerSignHappenedIndex = withoutSymbolsAfterLastExponentSignArray.findIndex(symbol => symbol === '( to find')
                withoutSymbolsAfterLastExponentSignArray[i] = '('
                // console.log('firstOpenGapOfQuantityRaisedToPowerSignHappenedIndex', firstOpenGapOfQuantityRaisedToPowerSignHappenedIndex)
                break
            }
        }

        if (withoutSymbolsAfterLastExponentSignArray[firstOpenGapOfQuantityRaisedToPowerSignHappenedIndex-1] === '-') {

            const withoutSymbolsBeforeLastExponentSignArray = currentVersionOfCircumstancesArray.slice(lastExponentSignHappenedIndex+1)

            exponentationGapsAdderAndNextCheckingLauncher(firstOpenGapOfQuantityRaisedToPowerSignHappenedIndex, lookerForSecondGapIndex(withoutSymbolsBeforeLastExponentSignArray, 0) + 1, '2', currentVersionOfCircumstancesArray, lastExponentSignHappenedIndex)
        }
        else {
            justNextCheckingLauncher('2', currentVersionOfCircumstancesArray, lastExponentSignHappenedIndex)
        }
    }
}

function lookerForSecondGapIndex (currentPartOfWithoutSymbolsBeforeLastExponentSignArray, cuttedPartOfWithoutSymbolsBeforeLastExponentSignArrayLength){

    // console.log('вошедший currentPartOfWithoutSymbolsBeforeLastExponentSignArray',currentPartOfWithoutSymbolsBeforeLastExponentSignArray)
    // console.log('вошедший cuttedPartOfWithoutSymbolsBeforeLastExponentSignArrayLength', cuttedPartOfWithoutSymbolsBeforeLastExponentSignArrayLength)

    if (currentPartOfWithoutSymbolsBeforeLastExponentSignArray[0] !== '(' && currentPartOfWithoutSymbolsBeforeLastExponentSignArray[1] !== '('){
        const endIndexOfCurrentPowerExpression = currentPartOfWithoutSymbolsBeforeLastExponentSignArray.findIndex((symbol, index) => {
            if (symbol === '-' && index === 0) return
            return symbol === '+' || symbol === '-' || symbol === '/' || symbol === '*' || symbol === ')'  || symbol === 'Checked **' 
        })

        // console.log('endIndexOfCurrentPowerExpression',endIndexOfCurrentPowerExpression)

        if (endIndexOfCurrentPowerExpression === -1) return currentPartOfWithoutSymbolsBeforeLastExponentSignArray.length + cuttedPartOfWithoutSymbolsBeforeLastExponentSignArrayLength
        if (currentPartOfWithoutSymbolsBeforeLastExponentSignArray[endIndexOfCurrentPowerExpression] === 'Checked **') return lookerForSecondGapIndex(currentPartOfWithoutSymbolsBeforeLastExponentSignArray.slice(endIndexOfCurrentPowerExpression + 1), endIndexOfCurrentPowerExpression + cuttedPartOfWithoutSymbolsBeforeLastExponentSignArrayLength + 1)
        return endIndexOfCurrentPowerExpression + cuttedPartOfWithoutSymbolsBeforeLastExponentSignArrayLength
    }
    else {
        let openGapAmount = closeGapAmount = 0
        let endIndexOfCurrentPowerExpression

        for (i = 0; i < currentPartOfWithoutSymbolsBeforeLastExponentSignArray.length; i++ ) {
            const symbol = currentPartOfWithoutSymbolsBeforeLastExponentSignArray[i]
            if (symbol === '(') openGapAmount++
            else if (symbol === ')') closeGapAmount++
            if (openGapAmount === closeGapAmount && openGapAmount !== 0) {endIndexOfCurrentPowerExpression = i; break}
        }

        // console.log('endIndexOfCurrentPowerExpression',endIndexOfCurrentPowerExpression)

        if (currentPartOfWithoutSymbolsBeforeLastExponentSignArray[endIndexOfCurrentPowerExpression + 1] === 'Checked **') return lookerForSecondGapIndex(currentPartOfWithoutSymbolsBeforeLastExponentSignArray.slice(endIndexOfCurrentPowerExpression + 2), endIndexOfCurrentPowerExpression + cuttedPartOfWithoutSymbolsBeforeLastExponentSignArrayLength + 2)
        return endIndexOfCurrentPowerExpression + cuttedPartOfWithoutSymbolsBeforeLastExponentSignArrayLength
    }
}


function exponentationGapsAdderAndNextCheckingLauncher (indexForPuttingFirstGap, indexForPuttingSecondGap, workedBranchName, currentVersionOfCircumstancesArray, lastExponentSignHappenedIndex){
    let arrayForNextStepCheck = currentVersionOfCircumstancesArray.slice()
    arrayForNextStepCheck[lastExponentSignHappenedIndex] = 'Checked **'
    arrayForNextStepCheck.splice(lastExponentSignHappenedIndex + indexForPuttingSecondGap, 0, ')')
    arrayForNextStepCheck.splice(indexForPuttingFirstGap + 1, 0, '(')

    internalCircumstancesAr.splice(lastExponentSignHappenedIndex + indexForPuttingSecondGap, 0, ')')
    internalCircumstancesAr.splice(indexForPuttingFirstGap + 1, 0, '(')

    console.log(`internalCircumstancesAr путь ${workedBranchName}`, internalCircumstancesAr)

    // console.log('arrayForNextStepCheck', arrayForNextStepCheck)

    negativeNumberExponentationWithBracketsSurrounder(arrayForNextStepCheck)
}

function justNextCheckingLauncher (failedBranch, currentVersionOfCircumstancesArray, lastExponentSignHappenedIndex){
    console.log(`путь ${failedBranch} не прошел`)

    let arrayForNextStepCheck = currentVersionOfCircumstancesArray.slice()
    arrayForNextStepCheck[lastExponentSignHappenedIndex] = 'Checked **'

    // console.log('arrayForNextStepCheck', arrayForNextStepCheck)

    negativeNumberExponentationWithBracketsSurrounder(arrayForNextStepCheck)
}

window.addEventListener('beforeunload', function(e){
    e.preventDefault()
    e.returnValue = ''
})



let temporaryClickedBtn
allBtnsBlock.addEventListener('mousedown', function(e){
    if (e.target.closest('.calculator__button')){
        temporaryClickedBtn = e.target.closest('.calculator__button')
        e.target.closest('.calculator__button').style.border = '1px solid black'
        calcScreen.style.border = '1px solid #F1F3F4'
    }
})
document.documentElement.addEventListener('mouseup', function(){
    if (calcScreen.style.border === '1px solid rgb(241, 243, 244)' || calcScreen.style.border === '1px solid #F1F3F4') {
        calcScreen.style.border = ''
        temporaryClickedBtn.style.border = ''
    }
})

firstHistIcon.addEventListener('click', function(e){
    popupWindow.classList.add('popup-db')
    if (mathHistoryBlock.classList.contains('screen-popup-window__math-history_overflow-scroll')){
        const howMuchscroll = mathHistoryBlock.scrollHeight-mathHistoryBlock.clientHeight
        mathHistoryBlock.scroll(0, howMuchscroll)
    }
})
document.addEventListener('click', function(e){
    if (!e.target.closest('.history-icon__i_c-grey') && (e.target.closest('.history-icon__i_c-blue')||!(e.target.closest('.screen-popup-window')))){
        popupWindow.classList.remove('popup-db')
    }
})


let mousedownTime
let mouseupTime
acBtn.addEventListener('mousedown', function(){
    mousedownTime = (new Date).getTime()
})
acBtn.addEventListener('mouseup', function(){
    mouseupTime = (new Date).getTime()
    if (mouseupTime-mousedownTime >= 400 && circumstancesString.textContent !== '0'){
        completeAcNuller()

        console.log('удаление всей строки, снова 0', internalCircumstancesAr)
        ansFiller ()
    }
})

allBtnsBlock.addEventListener('click', function(e){
    if (e.target.closest('.calculator__button')){


        if (ansPtag.style.visibility !== 'visible'){
            ansPtag.style.visibility = 'visible'
        }
        if (ansPtag.style.animation){
            ansPtag.style.animation = ''
            circumstancesStringFather.style.animation = ''
        }

        const clickedP = e.target.closest('.calculator__button').firstElementChild
        const clickedValue = clickedP.innerText
        const dataScreenViewAtr = clickedP.dataset.screenView

        if (circumstancesString.textContent === 'ERROR' && clickedValue !== '='){
            completeAcNuller()
        }

        if (clickedValue === '1' || clickedValue === '2' || clickedValue === '3' || clickedValue === '4' || clickedValue === '5' || clickedValue === '6' || clickedValue === '7' ||clickedValue === '8' || clickedValue === '9' || clickedValue === '0'){
            if (circumstancesString.textContent.endsWith('(0') || circumstancesString.textContent.endsWith('×0') || circumstancesString.textContent.endsWith('÷0') ||circumstancesString.textContent.endsWith('+0') || circumstancesString.textContent.endsWith('-0') || circumstancesString.textContent.endsWith('^0') || circumstancesString.textContent === '0'){
                symbolDeleter()
                symbolAppender(clickedValue, clickedValue)

                console.log('замена', internalCircumstancesAr)
            }
            else if (circumstancesString.textContent.endsWith('Infinity')){
                console.log('нельзя')
            }
            else if (circumstancesString.textContent.endsWith(')')){
                symbolMultiplier(clickedValue, clickedValue)

                console.log('* и добавить', internalCircumstancesAr)
            }
            else{
                symbolAppender(clickedValue, clickedValue)

                console.log('добавить', internalCircumstancesAr)
            }
            ansFiller ()
        }
        else if (dataScreenViewAtr === '+' || dataScreenViewAtr === '×' || dataScreenViewAtr === '÷' || dataScreenViewAtr === '^'){
            if (circumstancesString.textContent.endsWith('(') || circumstancesString.textContent.endsWith(dataScreenViewAtr) || circumstancesString.textContent === '-' ||circumstancesString.textContent.endsWith('÷-') || circumstancesString.textContent.endsWith('×-') || circumstancesString.textContent.endsWith('^-') || circumstancesString.textContent.endsWith('(.') || circumstancesString.textContent.endsWith('×.') || circumstancesString.textContent.endsWith('÷.') || circumstancesString.textContent.endsWith('+.') || circumstancesString.textContent.endsWith('-.') || circumstancesString.textContent.endsWith('^.')){
                console.log('нельзя', internalCircumstancesAr)
            }
            else if ((!circumstancesString.textContent.endsWith(dataScreenViewAtr)&&(circumstancesString.textContent.endsWith('÷') || circumstancesString.textContent.endsWith('×') ||circumstancesString.textContent.endsWith('^') || circumstancesString.textContent.endsWith('+')))
            || circumstancesString.textContent.endsWith('0-') || circumstancesString.textContent.endsWith('1-') || circumstancesString.textContent.endsWith('2-') ||circumstancesString.textContent.endsWith('3-') || circumstancesString.textContent.endsWith('4-') || circumstancesString.textContent.endsWith('5-') || circumstancesString.textContent.endsWith('6-') || circumstancesString.textContent.endsWith('7-') || circumstancesString.textContent.endsWith('8-') || circumstancesString.textContent.endsWith('9-') || circumstancesString.textContent.endsWith(')-')){
                symbolDeleter()
                symbolAppender(dataScreenViewAtr, clickedP.dataset.value)

                console.log('замена', internalCircumstancesAr)
                ansFiller ()
            }
            else {
                symbolAppender(dataScreenViewAtr, clickedP.dataset.value)

                console.log('добавить', internalCircumstancesAr)
                ansFiller ()
            }
        }

        else if (clickedValue === '-'){
            if (circumstancesString.textContent === '0' || circumstancesString.textContent.endsWith('+')){
                symbolDeleter()
                symbolAppender(clickedValue, clickedValue)

                console.log('замена', internalCircumstancesAr)
                ansFiller ()
            }
            else if (circumstancesString.textContent.endsWith('-') || circumstancesString.textContent.endsWith('(.') || circumstancesString.textContent.endsWith('×.') ||circumstancesString.textContent.endsWith('÷.') || circumstancesString.textContent.endsWith('+.') || circumstancesString.textContent.endsWith('-.')){

                console.log('нельзя')
            }
            else {
                symbolAppender(clickedValue, clickedValue)

                console.log('добавить', internalCircumstancesAr)
                ansFiller ()
            }

        }
        else if (clickedValue === '('){
            if (circumstancesString.textContent === '0'){
                symbolDeleter()
                symbolAppender(clickedValue, clickedValue)

                screenAdSpan.append(')')

                console.log('замена', internalCircumstancesAr)
                ansFiller ()
            }
            else if (circumstancesString.textContent.endsWith('0') || circumstancesString.textContent.endsWith('Infinity') || circumstancesString.textContent.endsWith('1') ||circumstancesString.textContent.endsWith('2') || circumstancesString.textContent.endsWith('3') || circumstancesString.textContent.endsWith('4') || circumstancesString.textContent.endsWith('5') || circumstancesString.textContent.endsWith('6') || circumstancesString.textContent.endsWith('7') || circumstancesString.textContent.endsWith('8') || circumstancesString.textContent.endsWith('9') || circumstancesString.textContent.endsWith(')') || circumstancesString.textContent.endsWith('.')){
                console.log('нельзя', internalCircumstancesAr)
            }
            
            else {
                symbolAppender(clickedValue, clickedValue)

                screenAdSpan.classList.add('active-ad-span')
                screenAdSpan.append(')')

                console.log('добавить', internalCircumstancesAr) 
                ansFiller ()
            }
        }
        else if (clickedValue === ')' && screenAdSpan.innerText.includes(')')){
            if (circumstancesString.textContent.endsWith('(') || circumstancesString.textContent.endsWith('×') || circumstancesString.textContent.endsWith('÷') || circumstancesString.textContent.endsWith('-') || circumstancesString.textContent.endsWith('+') || circumstancesString.textContent.endsWith('^') || circumstancesString.textContent.endsWith('(.')){
                console.log('нельзя', internalCircumstancesAr)
            }
            else {
                symbolAppender(clickedValue, clickedValue)

                const tempStr = screenAdSpan.innerText.slice(0, length-1)
                screenAdSpan.innerText = tempStr

                console.log('добавить', internalCircumstancesAr)
                ansFiller ()
            }
        }
        else if (clickedValue === '.'){
            const lastTimeIndex = circumstancesString.textContent.lastIndexOf('.')
            if (circumstancesString.textContent.endsWith('.') || circumstancesString.textContent.endsWith('Infinity') || circumstancesString.textContent.includes('e')){
                console.log('нельзя', internalCircumstancesAr)
            }
            else if (circumstancesString.textContent.endsWith(')')){
                symbolMultiplier(clickedValue, clickedValue)

                console.log('* и добавить', internalCircumstancesAr)
                ansFiller ()
            }
            else if (!(lastTimeIndex === -1)){
                const tempAr = circumstancesString.textContent.slice(lastTimeIndex, circumstancesString.length)
                if (tempAr.includes('+') || tempAr.includes('-') || tempAr.includes('÷') || tempAr.includes('×') || tempAr.includes('^')){
                    symbolAppender(clickedValue, clickedValue)

                    console.log('таки добавить .', internalCircumstancesAr)
                    ansFiller ()
                }
            }
            else {
                symbolAppender(clickedValue, clickedValue)

                console.log('добавить', internalCircumstancesAr)
                ansFiller ()
            }
        }
        else if (clickedValue === 'AC'){
            if (circumstancesString.textContent === '0'){
                console.log('нельзя', internalCircumstancesAr)
            }
            else if (internalCircumstancesAr.length === 1){
                completeAcNuller()

                console.log('удаление символа, снова 0', internalCircumstancesAr)
                ansFiller ()
            }
            else if (internalCircumstancesAr[internalCircumstancesAr.length-1] === '('){
                symbolDeleter()

                const tempStr = screenAdSpan.innerText.slice(0, length-1)
                screenAdSpan.innerText = tempStr

                console.log('удаление символа (, удаляя серый )', internalCircumstancesAr)
                ansFiller ()
            }
            else if (internalCircumstancesAr[internalCircumstancesAr.length-1] === ')'){
                symbolDeleter()

                screenAdSpan.append(')')

                console.log('удаление символа ), добавляя серый )', internalCircumstancesAr)
                ansFiller ()
            }    
            else {
                symbolDeleter()

                console.log('удаление символа', internalCircumstancesAr)}
                ansFiller ()
        }
        else if (clickedValue === '=' && (circumstancesString.textContent === 'ERROR' || circumstancesString.textContent === '0')){
            screenAnimationAdder()
        }
        else if (clickedValue === '='){
            circumstancesString.append(screenAdSpan.innerText)
            for (let symbol of screenAdSpan.innerText){
                internalCircumstancesAr.push(symbol)
            }
            screenAdSpan.innerText = ''
            
            const savedCircumstancesStringText = circumstancesString.textContent
            const savedInternalCircumstancesAr = [...internalCircumstancesAr]

            negativeNumberExponentationWithBracketsSurrounder(internalCircumstancesAr)

            screenAnimationAdder()
            
            let result
            const strOfInternalCircumstancesAr = internalCircumstancesAr.join('')
            if (strOfInternalCircumstancesAr.includes('()') || strOfInternalCircumstancesAr.endsWith('+') || strOfInternalCircumstancesAr.endsWith('e') || strOfInternalCircumstancesAr.endsWith('-') || strOfInternalCircumstancesAr.endsWith('*') || strOfInternalCircumstancesAr.endsWith('/') || strOfInternalCircumstancesAr.includes('*)') || strOfInternalCircumstancesAr.includes('+)') || strOfInternalCircumstancesAr.includes('-)') || strOfInternalCircumstancesAr.includes('/)')){
                result = 'ERROR'
            }
            else {
                try {result = eval (strOfInternalCircumstancesAr)}
                catch (error1) {
                    console.log(error1)
                    negativeNumberExponentationWithBracketsSurrounder(internalCircumstancesAr)
                    try{result = eval (internalCircumstancesAr.join(''))}
                    catch (error2){console.log(error2)}
                }
                if (!(typeof result === 'number') || isNaN(result)){
                    result = 'ERROR'
                }
                else if (isFinite(result)){
                    result = Math.round(result*10000000000)/10000000000
                }
            }

            if (popupStartText.style.display !== 'none'){
                popupStartText.style.display = 'none'
            }
            let shouldAddInHistory = false
            if (tempLastresult !== circumstancesString.textContent){
                shouldAddInHistory = true
            }
            
            circumstancesString.textContent = result
            internalCircumstancesAr = []
            
            if (isFinite(result)){
                for(symbol of circumstancesString.textContent){
                    internalCircumstancesAr.push(symbol)
                }
            }
            else {
                internalCircumstancesAr.push(result)
            }
            
            console.log(internalCircumstancesAr, `результат ${result}`)



            if (result !== 'ERROR'){
                resultForAns = result
            }


            if (shouldAddInHistory){ 
                ansPtag.innerText = `${savedCircumstancesStringText} =`

                amountOfHistoryBlocks++
                if (amountOfHistoryBlocks === 6){
                    mathHistoryBlock.classList.add('screen-popup-window__math-history_overflow-scroll')
                    popupTop.classList.add('screen-popup-window__top_border-bottom')
                }

                const oneHistoryBlock =  document.createElement('div')
                const circumstancesSpan =  document.createElement('span')
                const signEquallySpan =  document.createElement('span')
                const resultSpan =  document.createElement('span')
            
                circumstancesSpan.textContent = savedCircumstancesStringText.length<=17?savedCircumstancesStringText:savedCircumstancesStringText.slice(0, 15).concat('...')
                signEquallySpan.textContent = '='
                resultSpan.textContent = result
            
                oneHistoryBlock.classList.add('screen-popup-window__one-history-block')
                circumstancesSpan.setAttribute('data-value', savedCircumstancesStringText)
                circumstancesSpan.setAttribute('data-internal-ar-value', savedInternalCircumstancesAr)
                resultSpan.setAttribute('data-value', result)
                resultSpan.setAttribute('data-internal-ar-value', internalCircumstancesAr)
            
                mathHistoryBlock.append(oneHistoryBlock)
                oneHistoryBlock.append(circumstancesSpan, signEquallySpan, resultSpan)
                
                function fromHistoryResultAdder (){fromHistoryNumberAdder(resultSpan)}
                circumstancesSpan.addEventListener('click', ()=>fromHistoryNumberAdder(circumstancesSpan))
                resultSpan.addEventListener('click', fromHistoryResultAdder)
                
                if (result === 'ERROR'){
                    oneHistoryBlock.classList.add('historyError')
                    resultSpan.removeEventListener('click', fromHistoryResultAdder)
                }

                tempLastresult = circumstancesString.textContent 
            }   
        }
    }
})