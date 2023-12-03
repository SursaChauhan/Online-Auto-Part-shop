function myFunction() {
    alert("Added to Cart");
}

function leftScrollCat() {
    const leftCat = document.querySelector("#categories_boxes");
    leftCat.scrollBy(-200, 0);
}
function rightScrollCat() {
    const rightCat = document.querySelector("#categories_boxes");
    rightCat.scrollBy(200, 0);
}
function leftScroll() {
    const left = document.querySelector("#featured_boxes");
    left.scrollBy(-200, 0);
}
function rightScroll() {
    const right = document.querySelector("#featured_boxes");
    right.scrollBy(200, 0);
}
function leftScrollBlog() {
    const leftBlog = document.querySelector("#blog_box")
    leftBlog.scrollBy(-200, 0);
}
function rightScrollBlog() {
    const rightBlog = document.querySelector("#blog_box")
    rightBlog.scrollBy(200, 0);
}
function leftScrollOffer() {
    const leftOffer = document.querySelector("#offers_boxes")
    leftOffer.scrollBy(-200, 0);
}
function rightScrollOffer() {
    const rightOffer = document.querySelector("#offers_boxes")
    rightOffer.scrollBy(200, 0);
}