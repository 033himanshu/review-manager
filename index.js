const stars = document.querySelectorAll('.stars .fa')
const setRatingStars = (rate)=>{
    rate = parseInt(rate)
    for(let j=0;j<rate;++j)
        stars[j].classList.add(`rate-${j+1}`)
    for(let j=rate;j<stars.length;++j)
        stars[j].classList.remove(`rate-${j+1}`)
}
for(let i=1;i<=stars.length;++i){
    stars[i-1].addEventListener('click', ()=>{
        setRatingStars(i)
        stars[i-1].parentElement.setAttribute('value', i)
    })
}

class ReviewTemplate{
    constructor(rate){
        this.rate = rate
        this.reviews = ""
        this.length = 0
    }
    getHeader(){
        let header = ""
        for(let i=1;i<=this.rate;++i){
            header += `<span class="fa fa-star rate-${i}"></span>`
        }
        header += `<span class="review-count"> (${this.length})</span>`
        return header
    }
    getBody(){
        return this.reviews
    }
    addReview(message, name){
        this.length += 1

        let newLi = (`<li class="list-group-item" aria-current="true">
                        <p class="user-review">${message}</p>
                        <p class="user-name">~ ${name}</p>
                    </li>
                    `)
        this.reviews = newLi + this.reviews
    }
}
const reviews = [
    new ReviewTemplate(1),
    new ReviewTemplate(2),
    new ReviewTemplate(3),
    new ReviewTemplate(4),
    new ReviewTemplate(5),
]
const accordionItems = document.querySelectorAll('.accordion-item')
const setReviewInAccordian = (reviewId, accordianId)=>{
    const button = accordionItems[accordianId].querySelector('.accordion-button')
    button.innerHTML = reviews[reviewId].getHeader()
    const body = accordionItems[accordianId].querySelector('.accordion-body .list-group')
    if(reviews[reviewId].length===0){
        body.innerHTML = "<span class='no-review'>No Reviews</span>"
    }else
        body.innerHTML = reviews[reviewId].reviews
}
const traverseAccordianAndReview = (reviewStart, reviewInc) => {
    for(let i=reviewStart, j=0;i>=0 && i<5 && j<5;i+=reviewInc, j+=1){
        setReviewInAccordian(i, j)
    }
}
const setReviewsLowToHigh = ()=> {
    traverseAccordianAndReview(0, 1)
}
const setReviewsHighToLow = ()=> {
    traverseAccordianAndReview(4, -1)
}


const sortBy = document.querySelector('#sort-by')
const onChangeHandler = (value='high')=>{
    if(value=='high'){
        setReviewsHighToLow()
    }else{
        setReviewsLowToHigh()
    }
}
sortBy.addEventListener('change', (event)=>onChangeHandler(event.target.value))
onChangeHandler()



const textArea = document.querySelector('#review')
const nameInput = document.querySelector('#name')
const starValue = document.querySelector('.stars')
const submitBtn = document.querySelector('#review-submit-btn')
const textAreaError = document.querySelector('.error')
textArea.addEventListener('input',(event)=>{
    if(event.target.value)
        textAreaError.innerHTML =""
})
submitBtn.addEventListener('click', ()=>{
    let message = textArea.value
    textAreaError.innerHTML = ""
    if(message === ""){
        textAreaError.innerHTML = "Can't Submit Empty Review"
        return;
    }
    let name = nameInput.value 
    if(!name) name = "Anonymous" 
    let rate = parseInt(starValue.getAttribute('value'))
    reviews[rate-1].addReview(message, name)
    if(sortBy.value==='low'){
        setReviewInAccordian(rate-1, rate-1)
    }else{
        setReviewInAccordian(rate-1, 5-rate)
    }
    textArea.value=""
    nameInput.value = ""
    starValue.value = "3"
    setRatingStars(starValue.getAttribute('value'))
})

setRatingStars(3)


