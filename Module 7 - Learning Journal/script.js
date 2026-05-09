import {blogsData} from "./data.js";
const mainContent = document.getElementById("main-content");
const menu = document.getElementById("menu");
const offScreenNav = document.getElementById("off-screen-nav");
const footer = document.getElementById("footer");
const header = document.getElementById("header");

const getBlogCardListHTML = function () {
    let contentHTML = `<div class="blog-card-list">`
    for(let i = 1; i < blogsData.length; i++) {
        contentHTML += `<a href="blogs/${blogsData[i].link}" class="blog-card">
                <img src="images/${blogsData[i].image}" alt="">
                <div class="date">${blogsData[i].postDate.toLocaleDateString(undefined, {
            day: "numeric",
            month: "long",
            year: "numeric"
        })}</div>
                <h1>${blogsData[i].title}</h1>
                <p>${blogsData[i].excerpt}</p>
            </a>`
    }
    return contentHTML + '</div>';

}

const renderMainContent = function() {
    if (blogsData.length === 0) throw new Error("No blog data found.")
    let contentHTML = "";
    const firstBlog = blogsData[0]

    contentHTML += `<a href="${firstBlog.link}" class="lastest-blog" 
                       style="background-image: url('./images/${firstBlog.image}');">
                        <div class="date">${firstBlog.postDate.toLocaleDateString(undefined, {
                            day: "numeric",
                            month: "long",
                            year: "numeric"
                        })}</div>
                        <h2>${firstBlog.title}</h2>
                        <p>${firstBlog.excerpt}</p>
                    </a>`
    console.log(contentHTML);
    mainContent.innerHTML = contentHTML + getBlogCardListHTML();
}

const renderColours = () => {
    const blogCardList = [...document.getElementsByClassName('blog-card')]
    if(blogCardList.length === 0) throw new Error("No blog data found.")
    const width = document.body.clientWidth;
    if (480 < width && width <= 834) {
        blogCardList.forEach((blogCard, i) => {
            blogCard.classList.remove('lime', 'orange');

            if (i % 4 === 1 || i % 4 === 2) {
                blogCard.classList.add('lime');
            }
            else {
                blogCard.classList.add('orange');
            }
        })
    }
    else{
        blogCardList.forEach((blogCard, i) => {
            blogCard.classList.remove('lime', 'orange');

            if (i % 2 === 1) {
                blogCard.classList.add('lime');
            }
            else {
                blogCard.classList.add('orange');
            }
        })
    }
}

window.addEventListener("resize", renderColours);

const toggleMenu = () => {
    menu.classList.toggle('active');
    offScreenNav.classList.toggle('active');
    mainContent.classList.toggle('disable');
    footer.classList.toggle('disable');
}
document.getElementById('menu').addEventListener('click', toggleMenu);
document.addEventListener('click', (event) =>
{
    if (!header.contains(event.target)){
        if (menu.classList.contains('active')) toggleMenu();
    }

})
renderMainContent();
renderColours();