let calcScreen = document.querySelector('.calculator__screen')
let allBtnsBlock=document.querySelector('.calculator__all-buttons')
let circumstancesString = document.querySelector('.screen-text__down-span')
let internalCircumstancesAr = ['0']
let screenAdSpan = document.querySelector('.screen-text__down-ad-span')
let acBtn = document.getElementById('ac-btn')
let mathHistoryBlock = document.querySelector('.screen-popup-window__math-history')
let popupStartText = document.querySelector('.start-text')

let firstHistIcon=document.querySelector('.history-icon')
let popupWindow= document.querySelector('.screen-popup-window')

let ansPtag = document.querySelector('.screen-text__up-p')
let circumstancesStringFather= circumstancesString.parentElement
let resultForAns='0'

let popupTop = document.querySelector('.screen-popup-window__top')
let amountOfHistoryBlocks=0
let tempLastresult = ''

function ansFiller (){
    ansPtag.innerText=`Ans = ${resultForAns}`
}
function fromHistoryNumberAdder(fromWhere){
    circumstancesString.textContent=fromWhere.dataset.value
    internalCircumstancesAr=fromWhere.dataset.internalArValue.split(',')
    popupWindow.classList.remove('popup-db')
    ansFiller()
}
function completeAcNuller (){
    internalCircumstancesAr = ['0']
    circumstancesString.textContent='0'
    screenAdSpan.innerText=''
}
function symbolAppender (toAppend,toPush){
    circumstancesString.append(toAppend)
    internalCircumstancesAr.push(toPush)
}
function symbolDeleter (){
    internalCircumstancesAr.pop()
    let tempStr = circumstancesString.textContent.slice(0,length-1)
    circumstancesString.textContent = tempStr
}
function symbolMultiplier (toAppend,toPush){
    circumstancesString.append('×')
    internalCircumstancesAr.push('*')
    symbolAppender(toAppend,toPush)
}
function screenAnimationAdder(){
    ansPtag.style.animation='ans-up-text 0.25s'
    circumstancesStringFather.style.animation='down-text 0.25s'
}

window.addEventListener('beforeunload',function(e){
    e.preventDefault()
    e.returnValue=''
})


let temporaryClickedBtn
allBtnsBlock.addEventListener('mousedown',function(e){
    if (e.target.closest('.calculator__button')){
        temporaryClickedBtn = e.target.closest('.calculator__button')
        e.target.closest('.calculator__button').style.border='1px solid black'
        calcScreen.style.border='1px solid #F1F3F4'
    }
})
document.documentElement.addEventListener('mouseup',function(e){
    if (calcScreen.style.border==='1px solid rgb(241, 243, 244)'||calcScreen.style.border==='1px solid #F1F3F4') {
        calcScreen.style.border=''
        temporaryClickedBtn.style.border=''
    }
})

firstHistIcon.addEventListener('click', function(e){
    popupWindow.classList.add('popup-db')
    if (mathHistoryBlock.classList.contains('screen-popup-window__math-history_overflow-scroll')){
        let howMuchscroll = mathHistoryBlock.scrollHeight-mathHistoryBlock.clientHeight
        mathHistoryBlock.scroll(0,howMuchscroll)
    }
})
document.addEventListener('click',function(e){
    if (!e.target.closest('.history-icon__i_c-grey')&&(e.target.closest('.history-icon__i_c-blue')||!(e.target.closest('.screen-popup-window')))){
        popupWindow.classList.remove('popup-db')
    }
})


let mousedownTime
let mouseupTime
acBtn.addEventListener('mousedown',function(){
    mousedownTime = (new Date).getTime()
})
acBtn.addEventListener('mouseup',function(){
    mouseupTime = (new Date).getTime()
    if (mouseupTime-mousedownTime>=400 && circumstancesString.textContent!=='0'){
        completeAcNuller()

        console.log('удаление всей строки, снова 0',internalCircumstancesAr)
        ansFiller ()
    }
})

allBtnsBlock.addEventListener('click',function(e){
    if (e.target.closest('.calculator__button')){


        if (ansPtag.style.visibility!=='visible'){
            ansPtag.style.visibility='visible'
        }
        if (ansPtag.style.animation){
            ansPtag.style.animation=''
            circumstancesStringFather.style.animation=''
        }


        let clickedValue =e.target.closest('.calculator__button').firstElementChild.innerText
        let clickedP =e.target.closest('.calculator__button').firstElementChild
        if (circumstancesString.textContent==='ERROR'&&clickedValue!=='='){
            completeAcNuller()
        }

        let dataScreenViewAtr = clickedP.dataset.screenView
        
        if (clickedValue==='1'||clickedValue==='2'||clickedValue==='3'||clickedValue==='4'||clickedValue==='5'||clickedValue==='6'||clickedValue==='7'||clickedValue==='8'||clickedValue==='9'||clickedValue==='0'){
            if (circumstancesString.textContent.endsWith('(0')||circumstancesString.textContent.endsWith('×0')||circumstancesString.textContent.endsWith('÷0')||circumstancesString.textContent.endsWith('+0')||circumstancesString.textContent.endsWith('-0')||circumstancesString.textContent.endsWith('^0')||circumstancesString.textContent==='0'){
                symbolDeleter()
                symbolAppender(clickedValue,clickedValue)

                console.log('замена',internalCircumstancesAr)
            }
            else if (circumstancesString.textContent.endsWith('Infinity')){
                console.log('нельзя')
            }
            else if (circumstancesString.textContent.endsWith(')')){
                symbolMultiplier(clickedValue,clickedValue)

                console.log('* и добавить',internalCircumstancesAr)
            }
            else{
                symbolAppender(clickedValue,clickedValue)

                console.log('добавить',internalCircumstancesAr)
            }
            ansFiller ()
        }
        else if (dataScreenViewAtr==='+'||dataScreenViewAtr==='×'||dataScreenViewAtr==='÷'||dataScreenViewAtr==='^'){
            if (circumstancesString.textContent.endsWith('(')||circumstancesString.textContent.endsWith(dataScreenViewAtr)||circumstancesString.textContent==='-'||circumstancesString.textContent.endsWith('÷-')||circumstancesString.textContent.endsWith('×-')||circumstancesString.textContent.endsWith('^-')||circumstancesString.textContent.endsWith('(.')||circumstancesString.textContent.endsWith('×.')||circumstancesString.textContent.endsWith('÷.')||circumstancesString.textContent.endsWith('+.')||circumstancesString.textContent.endsWith('-.')||circumstancesString.textContent.endsWith('^.')){
                console.log('нельзя',internalCircumstancesAr)
            }
            else if ((!circumstancesString.textContent.endsWith(dataScreenViewAtr)&&(circumstancesString.textContent.endsWith('÷')||circumstancesString.textContent.endsWith('×')||circumstancesString.textContent.endsWith('^')||circumstancesString.textContent.endsWith('+')))
            ||circumstancesString.textContent.endsWith('0-')||circumstancesString.textContent.endsWith('1-')||circumstancesString.textContent.endsWith('2-')||circumstancesString.textContent.endsWith('3-')||circumstancesString.textContent.endsWith('4-')||circumstancesString.textContent.endsWith('5-')||circumstancesString.textContent.endsWith('6-')||circumstancesString.textContent.endsWith('7-')||circumstancesString.textContent.endsWith('8-')||circumstancesString.textContent.endsWith('9-')){
                symbolDeleter()
                symbolAppender(dataScreenViewAtr,clickedP.dataset.value)

                console.log('замена',internalCircumstancesAr)
                ansFiller ()
            }
            else {
                symbolAppender(dataScreenViewAtr,clickedP.dataset.value)

                console.log('добавить',internalCircumstancesAr)
                ansFiller ()
            }
        }

        else if (clickedValue==='-'){
            if (circumstancesString.textContent==='0'||circumstancesString.textContent.endsWith('+')){
                symbolDeleter()
                symbolAppender(clickedValue,clickedValue)

                console.log('замена',internalCircumstancesAr)
                ansFiller ()
            }
            else if (circumstancesString.textContent.endsWith('-')||circumstancesString.textContent.endsWith('(.')||circumstancesString.textContent.endsWith('×.')||circumstancesString.textContent.endsWith('÷.')||circumstancesString.textContent.endsWith('+.')||circumstancesString.textContent.endsWith('-.')){

                console.log('нельзя')
            }
            else {
                symbolAppender(clickedValue,clickedValue)

                console.log('добавить',internalCircumstancesAr)
                ansFiller ()
            }

        }
        else if (clickedValue==='('){
            if (circumstancesString.textContent==='0'){
                symbolDeleter()
                symbolAppender(clickedValue,clickedValue)

                screenAdSpan.append(')')

                console.log('замена',internalCircumstancesAr)
                ansFiller ()
            }
            else if (circumstancesString.textContent.endsWith('0')||circumstancesString.textContent.endsWith('Infinity')||circumstancesString.textContent.endsWith('1')||circumstancesString.textContent.endsWith('2')||circumstancesString.textContent.endsWith('3')||circumstancesString.textContent.endsWith('4')||circumstancesString.textContent.endsWith('5')||circumstancesString.textContent.endsWith('6')||circumstancesString.textContent.endsWith('7')||circumstancesString.textContent.endsWith('8')||circumstancesString.textContent.endsWith('9')||circumstancesString.textContent.endsWith(')')||circumstancesString.textContent.endsWith('.')){
                console.log('нельзя',internalCircumstancesAr)
            }
            
            else {
                symbolAppender(clickedValue,clickedValue)

                screenAdSpan.classList.add('active-ad-span')
                screenAdSpan.append(')')

                console.log('добавить',internalCircumstancesAr) 
                ansFiller ()
            }
        }
        else if (clickedValue===')'&& screenAdSpan.innerText.includes(')')){
            if (circumstancesString.textContent.endsWith('(')||circumstancesString.textContent.endsWith('×')||circumstancesString.textContent.endsWith('÷')||circumstancesString.textContent.endsWith('-')||circumstancesString.textContent.endsWith('+')||circumstancesString.textContent.endsWith('^')||circumstancesString.textContent.endsWith('(.')){
                console.log('нельзя',internalCircumstancesAr)
            }
            else {
                symbolAppender(clickedValue,clickedValue)

                let tempStr = screenAdSpan.innerText.slice(0,length-1)
                screenAdSpan.innerText = tempStr

                console.log('добавить',internalCircumstancesAr)
                ansFiller ()
            }
        }
        else if (clickedValue==='.'){
            let lastTimeIndex = circumstancesString.textContent.lastIndexOf('.')
            if (circumstancesString.textContent.endsWith('.')||circumstancesString.textContent.endsWith('Infinity')||circumstancesString.textContent.includes('e')){
                console.log('нельзя',internalCircumstancesAr)
            }
            else if (circumstancesString.textContent.endsWith(')')){
                symbolMultiplier(clickedValue,clickedValue)

                console.log('* и добавить',internalCircumstancesAr)
                ansFiller ()
            }
            else if (!(lastTimeIndex===-1)){
                let tempAr = circumstancesString.textContent.slice(lastTimeIndex,circumstancesString.length)
                if (tempAr.includes('+')||tempAr.includes('-')||tempAr.includes('÷')||tempAr.includes('×')||tempAr.includes('^')){
                    symbolAppender(clickedValue,clickedValue)

                    console.log('таки добавить .',internalCircumstancesAr)
                    ansFiller ()
                }
            }
            else {
                symbolAppender(clickedValue,clickedValue)

                console.log('добавить',internalCircumstancesAr)
                ansFiller ()
            }
        }
        else if (clickedValue==='AC'){
            if (circumstancesString.textContent==='0'){
                console.log('нельзя',internalCircumstancesAr)
            }
            else if (internalCircumstancesAr.length===1){
                completeAcNuller()

                console.log('удаление символа, снова 0',internalCircumstancesAr)
                ansFiller ()
            }
            else if (internalCircumstancesAr[internalCircumstancesAr.length-1]==='('){
                symbolDeleter()

                let tempStr2 = screenAdSpan.innerText.slice(0,length-1)
                screenAdSpan.innerText = tempStr2

                console.log('удаление символа (, удаляя серый )',internalCircumstancesAr)
                ansFiller ()
            }
            else if (internalCircumstancesAr[internalCircumstancesAr.length-1]===')'){
                symbolDeleter()

                screenAdSpan.append(')')

                console.log('удаление символа ), добавляя серый )',internalCircumstancesAr)
                ansFiller ()
            }    
            else {
                symbolDeleter()

                console.log('удаление символа',internalCircumstancesAr)}
                ansFiller ()
        }
        else if (clickedValue==='='&&(circumstancesString.textContent==='ERROR'||circumstancesString.textContent==='0')){
            screenAnimationAdder()
        }
        else if (clickedValue==='='){
            circumstancesString.append(screenAdSpan.innerText)
            for (let symbol of screenAdSpan.innerText){
                internalCircumstancesAr.push(symbol)
            }
            screenAdSpan.innerText=''

            screenAnimationAdder()
            
            let result
            let strOfInternalCircumstancesAr = internalCircumstancesAr.join('')
            if (strOfInternalCircumstancesAr.includes('()')||strOfInternalCircumstancesAr.endsWith('+')||strOfInternalCircumstancesAr.endsWith('e')||strOfInternalCircumstancesAr.endsWith('-')||strOfInternalCircumstancesAr.endsWith('*')||strOfInternalCircumstancesAr.endsWith('/')||strOfInternalCircumstancesAr.includes('*)')||strOfInternalCircumstancesAr.includes('+)')||strOfInternalCircumstancesAr.includes('-)')||strOfInternalCircumstancesAr.includes('/)')){
                result='ERROR'
            }
            else {
                result = eval (strOfInternalCircumstancesAr)
                if (!(typeof result==='number')||isNaN(result)){
                    result='ERROR'
                }
                else if (isFinite(result)){
                    result=Math.round(result*10000000000)/10000000000
                }
            }

            if (popupStartText.style.display!=='none'){
                popupStartText.style.display='none'
            }
            let shouldAddInHistory=false
            if (tempLastresult!==circumstancesString.textContent){
                shouldAddInHistory=true
            }
            let savedCircumstancesStringText = circumstancesString.textContent
            let savedInternalCircumstancesAr = internalCircumstancesAr


            circumstancesString.textContent=result
            internalCircumstancesAr=[]
            if (isFinite(result)){
                for(symbol of circumstancesString.textContent){
                    internalCircumstancesAr.push(symbol)
                }
            }
            else {
                internalCircumstancesAr.push(result)
            }

            console.log(internalCircumstancesAr,`результат ${result}`)



            if (result!=='ERROR'){
                resultForAns=result
            }


            if (shouldAddInHistory){ 
                ansPtag.innerText=`${savedCircumstancesStringText} =`

                amountOfHistoryBlocks++
                if (amountOfHistoryBlocks===6){
                    mathHistoryBlock.classList.add('screen-popup-window__math-history_overflow-scroll')
                    popupTop.classList.add('screen-popup-window__top_border-bottom')
                }

                let oneHistoryBlock =  document.createElement('div')
                let circumstancesSpan =  document.createElement('span')
                let signEquallySpan =  document.createElement('span')
                let resultSpan =  document.createElement('span')
            
                circumstancesSpan.textContent=savedCircumstancesStringText.length<=17?savedCircumstancesStringText:savedCircumstancesStringText.slice(0,15).concat('...')
                signEquallySpan.textContent='='
                resultSpan.textContent=result
            
                oneHistoryBlock.classList.add('screen-popup-window__one-history-block')
                circumstancesSpan.setAttribute('data-value',savedCircumstancesStringText)
                circumstancesSpan.setAttribute('data-internal-ar-value',savedInternalCircumstancesAr)
                resultSpan.setAttribute('data-value',result)
                resultSpan.setAttribute('data-internal-ar-value',internalCircumstancesAr)
            
                mathHistoryBlock.append(oneHistoryBlock)
                oneHistoryBlock.append(circumstancesSpan,signEquallySpan,resultSpan)
                
                function fromHistoryResultAdder (){fromHistoryNumberAdder(resultSpan)}
                circumstancesSpan.addEventListener('click',()=>fromHistoryNumberAdder(circumstancesSpan))
                resultSpan.addEventListener('click',fromHistoryResultAdder)
                
                if (result==='ERROR'){
                    oneHistoryBlock.classList.add('historyError')
                    resultSpan.removeEventListener('click',fromHistoryResultAdder)
                }

                tempLastresult = circumstancesString.textContent 
            }   
        }
    }
})